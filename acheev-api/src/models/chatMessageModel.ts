import { Models } from "../shared/models";
import { BaseModel } from "./BaseModel";
import { UserModel } from "./userModel";

export class ChatMessageModel extends BaseModel {
  id!: number;
  senderId!: string;
  programId!: number;
  replyToId?: number;

  sender!: UserModel;
  replyTo?: ChatMessageModel;
  readBy!: UserModel[];

  text?: string;
  mediaUrl?: string;
  mediaType?: string;

  isEdited!: boolean;
  isDeleted!: boolean;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.CHAT_MESSAGE.table;

  static relatedQueries = {};

  static relationMappings = () => {
    return {
      sender: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${Models.CHAT_MESSAGE.table}.sender_id`,
          to: `${Models.USER.table}.id`,
        },
      },
      replyTo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ChatMessageModel,
        join: {
          from: `${Models.CHAT_MESSAGE.table}.reply_to_id`,
          to: `${Models.CHAT_MESSAGE.table}.id`,
        },
      },
      readBy: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: `${Models.CHAT_MESSAGE.table}.id`,
          through: {
            from: `${Models.CHAT_MESSAGE_READ.table}.chat_message_id`,
            to: `${Models.CHAT_MESSAGE_READ.table}.user_id`,
          },
          to: `${Models.USER.table}.id`,
        },
      },
    };
  };
}
