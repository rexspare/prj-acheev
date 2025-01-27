import { PubSub } from "graphql-subscriptions";
import { ChatMessageModel } from "../models/chatMessageModel";
import {
  paginate,
  requireAdminOrSelf,
  secureTargetUserId,
} from "../shared/utilities";
import { GQLResolver } from "../types/types";
import { ChatEvents, OrderBy } from "../types/gqlTypings.generated";
import { ChatMessageReadsModel } from "../models/chatMessageRead";
import { PushNotificationService } from "../services/pushNotificationService";
import { raw } from "objection";

const pubsub = new PubSub();

export const ChatResolvers: GQLResolver = {
  resolvers: {
    Query: {
      getProgramMessages: async (
        _,
        { programId, pagination, historyMessageId },
        ctx
      ) => {
        requireAdminOrSelf(ctx);

        let pageNumber: number;
        const mainQuery = ChatMessageModel.query()
          .withGraphFetched("sender")
          .withGraphFetched("replyTo.sender")
          .withGraphFetched("readBy")
          .where({ programId });

        if (historyMessageId != undefined) {
          const orderByString =
            pagination?.orderBy
              ?.map((obj) => `${obj.column} ${obj.direction}`)
              .join(", ") || "created_at DESC";
          const groupSize = (pagination?.limit ?? 50.0) + 0.1;

          const rankedMessagesQuery = ChatMessageModel.query()
            .select(
              "id",
              "created_at",
              raw(
                `FLOOR(ROW_NUMBER() OVER (ORDER BY ${orderByString}) / ${groupSize}) AS group_number`
              )
            )
            .as("RankedMessages")
            .where({ programId });

          const targetGroupQuery = ChatMessageModel.query()
            .select("group_number")
            .from(rankedMessagesQuery)
            .where({ id: historyMessageId })
            .limit(1);

          mainQuery
            .alias("m")
            .join(rankedMessagesQuery, "m.id", "=", "RankedMessages.id")
            .andWhere("RankedMessages.group_number", "<=", targetGroupQuery)
            .andWhere(
              "RankedMessages.group_number",
              ">=",
              pagination?.page ?? 0
            );

          let result = await targetGroupQuery;
          pageNumber = parseInt((result[0] as any).groupNumber);
          if (!result.length) {
            throw new Error(`No message found with id: ${historyMessageId}`);
          }
        } else {
          pageNumber = pagination?.page as number;
        }

        const customPagination =
          historyMessageId == undefined
            ? pagination
            : {
                page: 0,
                limit: (pageNumber + 1) * (pagination?.limit ?? 50),
                orderBy: pagination?.orderBy || [
                  { column: "created_at", direction: "DESC" } as OrderBy,
                ],
              };
        const [data, total] = await Promise.all([
          paginate(mainQuery, customPagination),
          ChatMessageModel.query().where({ programId }).resultSize(),
        ]);
        const page = pageNumber ?? 0;
        const limit = pagination?.limit ?? 50;
        const totalPages = Math.ceil(total / (pagination?.limit ?? 50));
        const hasNextPage = page < totalPages - 1;
        const hasPreviousPage = page > 0;

        return {
          data,
          meta: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage,
            hasPreviousPage,
          },
        };
      },
    },
    Mutation: {
      sendMessage: async (
        _,
        { programId, text, mediaUrl, mediaType, replyToId },
        ctx
      ) => {
        const senderId = secureTargetUserId(ctx);
        const newMessage = await ChatMessageModel.query()
          .insertAndFetch({
            programId,
            senderId,
            replyToId,
            text,
            mediaUrl,
            mediaType,
          })
          .withGraphFetched("sender")
          .withGraphFetched("replyTo.sender")
          .withGraphFetched("readBy");

        // Publish the new message to all subscribers and send notifications
        const title = "New Message";
        const body = `${newMessage.sender.firstName} ${
          newMessage.sender.lastName
        } :${newMessage.text ?? "sent some media"}`;
        const data = {
          programId: `${newMessage.programId}`,
          senderId: `${newMessage.senderId}`,
          messageId: `${newMessage.id}`,
        };
        pubsub.publish(ChatEvents.NewMessage, { newMessage });
        PushNotificationService.pushNotifyChatMessage(title, body, data);

        return newMessage;
      },
      editMessage: async (_, { messageId, text, mediaUrl, mediaType }) => {
        const updatedMessage = await ChatMessageModel.query()
          .patchAndFetchById(messageId, {
            text,
            mediaUrl,
            mediaType,
            isEdited: true,
          })
          .withGraphFetched("sender")
          .withGraphFetched("replyTo.sender")
          .withGraphFetched("readBy")
          .throwIfNotFound(`Message with id ${messageId} not found`);

        // Publish the new message to all subscribers
        pubsub.publish(ChatEvents.UpdateMessage, {
          newMessage: updatedMessage,
        });

        return updatedMessage;
      },
      deleteMessage: async (_, { messageId }) => {
        const updatedMessage = await ChatMessageModel.query()
          .patchAndFetchById(messageId, { isDeleted: true })
          .withGraphFetched("sender")
          .withGraphFetched("replyTo.sender")
          .withGraphFetched("readBy")
          .throwIfNotFound(`Message with id ${messageId} not found`);

        // Publish the new message to all subscribers
        pubsub.publish(ChatEvents.DeleteMessage, {
          newMessage: updatedMessage,
        });

        return updatedMessage;
      },
      readMessage: async (_, { messageId, userId }) => {
        const updatedMessage = await ChatMessageModel.query()
          .findById(messageId)
          .withGraphFetched("sender")
          .withGraphFetched("replyTo.sender")
          .withGraphFetched("readBy")
          .throwIfNotFound(`Message with ${messageId} not found!`);

        await ChatMessageReadsModel.query().insert({
          chatMessageId: messageId,
          createdAt: new Date(),
          userId,
        });
        // Publish the new message to all subscribers
        pubsub.publish(ChatEvents.UpdateMessage, {
          newMessage: updatedMessage,
        });

        return updatedMessage;
      },
    },
    Subscription: {
      newMessage: {
        subscribe: (_, {}, ctx) => {
          requireAdminOrSelf(ctx);
          return pubsub.asyncIterableIterator([
            ChatEvents.NewMessage,
            ChatEvents.UpdateMessage,
            ChatEvents.DeleteMessage,
          ]);
        },
      },
    },
  },
};
