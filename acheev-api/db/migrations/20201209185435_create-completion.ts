import { Knex } from 'knex';
import { Models } from '../../src/shared/models';
import { AddIdV1, AddInternalNotesV1, AddTimestampsV1, AddUserIdReferenceV1 } from '../migrationHelper';

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Models.COMPLETION.table, t => {
      AddIdV1(t);
      AddUserIdReferenceV1(t);

      t.string('model_type').notNullable();
      t.integer('model_id').notNullable();
      t.string('parent_model_type').nullable();
      t.integer('parent_model_id').nullable();

      t.boolean('archived').notNullable().defaultTo(false);
      t.timestamp('completed_at').notNullable();
      t.timestamp('started_at').nullable();
      t.text('notes');

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists(Models.COMPLETION.table)
}

