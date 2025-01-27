import { Knex } from 'knex';
import { Models } from '../../src/shared/models';
import { WeightUnit } from '../../src/types/gqlTypings.generated';
import { AddIdReferenceV1, AddIdV1, AddInternalNotesV1, AddTimestampsV1, AddUserIdReferenceV1 } from '../migrationHelper';

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Models.PROGRAM.table, t => {
      AddIdV1(t);
      t.boolean('live').notNullable().defaultTo(false);
      t.boolean('archived').notNullable().defaultTo(false);

      t.string('name').notNullable();
      t.string('image_url').notNullable().defaultTo('https://via.placeholder.com/150')

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
    .createTable(Models.PROGRAM_FACET.table, t => {
      AddIdV1(t);
      AddIdReferenceV1(t, 'program_id', Models.PROGRAM);

      t.boolean('live').notNullable().defaultTo(false);
      t.boolean('archived').notNullable().defaultTo(false);

      t.integer('order').notNullable().defaultTo(10);
      t.string('name').notNullable();
      t.string('image_url').notNullable().defaultTo('https://via.placeholder.com/150')
      t.text('video_url');
      t.text('description');
      t.text('equipment_needed');
      t.text('goals');

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
    .createTable(Models.WORKOUT.table, t => {
      AddIdV1(t);
      AddIdReferenceV1(t, 'template_id', Models.WORKOUT).nullable();
      AddIdReferenceV1(t, 'program_id', Models.PROGRAM);
      AddIdReferenceV1(t, 'program_facet_id', Models.PROGRAM_FACET);
      AddUserIdReferenceV1(t, 'user_id').nullable();
      t.string('skill_level').notNullable();

      t.boolean('live').notNullable().defaultTo(false);
      t.boolean('archived').notNullable().defaultTo(false);
      t.timestamp('started_at').nullable();
      t.timestamp('completed_at').nullable();

      t.string('name').notNullable();
      t.string('image_url').notNullable().defaultTo('https://via.placeholder.com/150');
      t.integer('week').notNullable();
      t.integer('order').notNullable().defaultTo(10);

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
    .createTable(Models.CIRCUIT.table, t => {
      AddIdV1(t);
      AddIdReferenceV1(t, 'template_id', Models.CIRCUIT).nullable();
      AddIdReferenceV1(t, 'program_id', Models.PROGRAM);
      AddIdReferenceV1(t, 'program_facet_id', Models.PROGRAM_FACET);
      AddIdReferenceV1(t, 'workout_id', Models.WORKOUT);
      AddUserIdReferenceV1(t, 'user_id').nullable();

      t.boolean('archived').notNullable().defaultTo(false);
      t.timestamp('started_at').nullable();
      t.timestamp('completed_at').nullable();

      t.string('name').notNullable();
      t.integer('order').notNullable().defaultTo(10);

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
    .createTable(Models.EXERCISE.table, t => {
      AddIdV1(t);
      AddIdReferenceV1(t, 'template_id', Models.EXERCISE).nullable();
      AddIdReferenceV1(t, 'program_id', Models.PROGRAM);
      AddIdReferenceV1(t, 'program_facet_id', Models.PROGRAM_FACET);
      AddIdReferenceV1(t, 'workout_id', Models.WORKOUT);
      AddIdReferenceV1(t, 'circuit_id', Models.CIRCUIT);
      AddUserIdReferenceV1(t, 'user_id').nullable();

      t.boolean('archived').notNullable().defaultTo(false);
      t.timestamp('started_at').nullable();
      t.timestamp('completed_at').nullable();

      t.string('name').notNullable();
      t.text('description').notNullable();
      t.string('video_url').notNullable();
      t.integer('rest_duration_seconds').notNullable();
      t.integer('order').notNullable().defaultTo(10);

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
    .createTable(Models.EXERCISE_SET.table, t => {
      AddIdV1(t);
      AddIdReferenceV1(t, 'template_id', Models.EXERCISE_SET).nullable();
      AddIdReferenceV1(t, 'program_id', Models.PROGRAM);
      AddIdReferenceV1(t, 'program_facet_id', Models.PROGRAM_FACET);
      AddIdReferenceV1(t, 'workout_id', Models.WORKOUT);
      AddIdReferenceV1(t, 'circuit_id', Models.CIRCUIT);
      AddIdReferenceV1(t, 'exercise_id', Models.EXERCISE);
      AddUserIdReferenceV1(t, 'user_id').nullable();

      t.integer('order').notNullable().defaultTo(10);
      t.integer('duration_seconds').notNullable();
      t.integer('rep_count').nullable();
      t.float('weight').notNullable();
      t.boolean('weight_relative').notNullable().defaultTo('true');
      t.string('weight_unit').notNullable().defaultTo(WeightUnit.Pounds);

      t.boolean('archived').notNullable().defaultTo(false);
      t.timestamp('started_at').nullable();
      t.timestamp('completed_at').nullable();

      AddInternalNotesV1(t);
      AddTimestampsV1(t);
    })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists(Models.EXERCISE_SET.table)
    .dropTableIfExists(Models.EXERCISE.table)
    .dropTableIfExists(Models.CIRCUIT.table)
    .dropTableIfExists(Models.WORKOUT.table)
    .dropTableIfExists(Models.PROGRAM_FACET.table)
    .dropTableIfExists(Models.PROGRAM.table)
}

