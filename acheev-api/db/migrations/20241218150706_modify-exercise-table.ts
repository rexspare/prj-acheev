import { Knex } from "knex";
import { Models } from "../../src/shared/models";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(Models.EXERCISE.table, (table) => {
    table.string("video_url").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(Models.EXERCISE.table, (table) => {
    table.string("video_url").notNullable().alter();
  });
}
