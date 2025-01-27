import { Knex } from "knex";
import { Models } from "../../src/shared/models";
import {
  AddIdReferenceV1,
  AddIdV1,
  AddTimestampsV1,
  AddUserIdReferenceV1,
} from "../migrationHelper";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(Models.CHAT_MESSAGE.table, (t) => {
      AddIdV1(t);
      AddUserIdReferenceV1(t, "sender_id");
      AddIdReferenceV1(t, "program_id", Models.PROGRAM, true);
      AddIdReferenceV1(t, "reply_to_id", Models.CHAT_MESSAGE).nullable();

      t.string("text").defaultTo(null);
      t.string("media_url").defaultTo(null);
      t.string("media_type").defaultTo(null);

      t.boolean("is_edited").notNullable().defaultTo(false);
      t.boolean("is_deleted").notNullable().defaultTo(false);

      AddTimestampsV1(t);
    })
    .createTable(Models.CHAT_MESSAGE_READ.table, (t) => {
      AddIdV1(t);
      AddUserIdReferenceV1(t);
      AddIdReferenceV1(t, "chat_message_id", Models.CHAT_MESSAGE, true);

      AddTimestampsV1(t);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(Models.CHAT_MESSAGE_READ.table)
    .dropTableIfExists(Models.CHAT_MESSAGE.table);
}
