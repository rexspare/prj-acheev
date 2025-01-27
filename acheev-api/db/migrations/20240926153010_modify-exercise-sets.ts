import { Knex } from "knex";
import { Models } from "../../src/shared/models";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(Models.EXERCISE_SET.table, (table) => {
    table.boolean("max_perc_available").notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(Models.EXERCISE_SET.table, (table) => {
    table.dropColumn("max_perc_available");
  });
}
