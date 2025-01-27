import { Knex } from 'knex';
import { Models } from '../../src/shared/models';
import { AddIdV1, AddInternalNotesV1, AddTimestampsV1, AddUserIdReferenceV1 } from '../migrationHelper';

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Models.FAVORITE.table, t => {
      AddIdV1(t);
      AddUserIdReferenceV1(t);

      t.string('model_type').notNullable();
      t.string('model_id').notNullable();

      t.boolean('archived').notNullable().defaultTo(false);

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists(Models.FAVORITE.table)
}

