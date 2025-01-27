import { Knex } from 'knex';
import { Models } from '../../src/shared/models';
import { AddIdReferenceV1, AddIdV1, AddInternalNotesV1, AddTimestampsV1 } from '../migrationHelper';

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Models.PROGRAM_LIST.table, t => {
      AddIdV1(t);

      t.boolean('archived').notNullable().defaultTo(false);
      t.string('name').notNullable();

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
    .createTable(Models.PROGRAM_LIST_ENTRY.table, t => {
      AddIdV1(t);
      AddIdReferenceV1(t, 'program_list_id', Models.PROGRAM_LIST);
      AddIdReferenceV1(t, 'program_id', Models.PROGRAM);
      t.boolean('archived').notNullable().defaultTo(false);

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists(Models.PROGRAM_LIST_ENTRY.table)
    .dropTableIfExists(Models.PROGRAM_LIST.table)
}

