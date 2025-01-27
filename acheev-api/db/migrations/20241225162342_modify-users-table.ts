import { Knex } from "knex";
import { Models } from "../../src/shared/models";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(Models.USER.table, (table) => {
    table.boolean("is_coach").notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(Models.EXERCISE.table, (table) => {
    table.dropColumn("is_coach");
  });
}
