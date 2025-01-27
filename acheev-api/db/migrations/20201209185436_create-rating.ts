import { Knex } from 'knex';
import { Models } from '../../src/shared/models';
import { AddIdV1, AddInternalNotesV1, AddTimestampsV1, AddUserIdReferenceV1 } from '../migrationHelper';

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Models.RATING.table, t => {
      AddIdV1(t);
      AddUserIdReferenceV1(t);

      t.string('model_type').notNullable();
      t.integer('model_id').notNullable();

      t.integer('rating_challenge');
      t.integer('rating_challenge_scale').notNullable().defaultTo(100);

      t.integer('rating_performance');
      t.integer('rating_performance_scale').notNullable().defaultTo(100);

      t.integer('rating_effort');
      t.integer('rating_effort_scale').notNullable().defaultTo(100);

      t.integer('rating_overall');
      t.integer('rating_overall_scale').notNullable().defaultTo(100);

      t.boolean('experienced_improvement');

      t.text('notes');

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists(Models.RATING.table)
}

