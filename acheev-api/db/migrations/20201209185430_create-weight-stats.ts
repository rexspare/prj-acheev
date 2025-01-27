import { Knex } from 'knex';
import { Models } from '../../src/shared/models';
import { AddIdV1, AddInternalNotesV1, AddTimestampsV1, AddUserIdReferenceV1 } from '../migrationHelper';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(Models.WEIGHT_STAT.table, t => {
    AddIdV1(t);
    AddUserIdReferenceV1(t, 'user_id');

    t.float('weight').notNullable();
    t.timestamp('date').notNullable();
    t.string('image_url');
    t.text('notes');

    AddInternalNotesV1(t);
    AddTimestampsV1(t);
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists(Models.WEIGHT_STAT.table)
}

