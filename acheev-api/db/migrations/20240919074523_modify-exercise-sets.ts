import { Knex } from "knex";
import { Models } from "../../src/shared/models";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(Models.EXERCISE_SET.table, (table) => {
      table.integer("distance").nullable();
      table.float("percentage_max").nullable();
      table.boolean("reps_available").notNullable().defaultTo(true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(Models.EXERCISE_SET.table, (table) => {
      table.dropColumn("distance");
      table.dropColumn("percentage_max");
      table.dropColumn("reps_available");
    });
}

