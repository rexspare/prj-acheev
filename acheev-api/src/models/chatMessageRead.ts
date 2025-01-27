import { Models } from "../shared/models";
import { BaseModel } from "./BaseModel";

export class ChatMessageReadsModel extends BaseModel {
  id!: number;
  chatMessageId!: number;
  userId!: string;
  createdAt!: Date;

  static tableName = Models.CHAT_MESSAGE_READ.table;

  static relatedQueries = {};

  static relationMappings = () => ({});
}
