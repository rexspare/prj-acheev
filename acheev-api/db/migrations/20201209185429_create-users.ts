import { Knex } from 'knex';
import { Models } from '../../src/shared/models';
import { SkillLevel, WeightUnit } from '../../src/types/gqlTypings.generated';
import { AddIdV1, AddInternalNotesV1, AddTimestampsV1 } from '../migrationHelper';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(Models.USER.table, t => {
    AddIdV1(t, true);
    t.string('token').notNullable().unique();

    t.string('email').nullable().unique().index('idx_user_email');
    t.string('phone_number').notNullable().unique().index('idx_user_phone_number');
    t.string('password').notNullable();

    t.string('first_name').notNullable().index('idx_user_first_name');
    t.string('last_name').notNullable().index('idx_user_last_name');
    t.string('location').nullable().index('idx_location');
    t.text('image_url').nullable();
    t.timestamp('birthday').nullable();

    t.boolean('phone_number_confirmed').notNullable().defaultTo(false);
    t.boolean('email_confirmed').notNullable().defaultTo(false);
    t.string('email_verification_code');
    t.string('phone_number_verification_code');
    t.string('reset_password_token');

    t.text('android_push_token').nullable();
    t.text('ios_push_token').nullable();

    t.string('skill_level').notNullable().defaultTo(SkillLevel.Beginner);
    t.string('weight_unit').notNullable().defaultTo(WeightUnit.Pounds);

    t.boolean('admin').notNullable().defaultTo(false);
    t.boolean('restricted_admin').notNullable().defaultTo(false);
    t.boolean('verified').notNullable().defaultTo(false);
    t.boolean('private').notNullable().defaultTo(false);
    t.boolean('newsletter').notNullable().defaultTo(false);
    t.boolean('notifications').notNullable().defaultTo(true);

    AddInternalNotesV1(t);
    AddTimestampsV1(t);
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists(Models.USER.table)
}

