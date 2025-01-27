import { Knex } from "knex";
import { Models } from "../../src/shared/models";
import { AddIdReferenceV1, AddIdV1, AddTimestampsV1, AddUserIdReferenceV1 } from "../migrationHelper";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(Models.EXERCISE_SET_HISTORY.table, (t) => {
        AddIdV1(t); // Adds the primary key 'id'
        
        // Add foreign key references
        AddIdReferenceV1(t, 'program_id', Models.PROGRAM);
        AddIdReferenceV1(t, 'program_facet_id', Models.PROGRAM_FACET);
        AddIdReferenceV1(t, 'workout_id', Models.WORKOUT);
        AddIdReferenceV1(t, 'circuit_id', Models.CIRCUIT);
        AddIdReferenceV1(t, 'exercise_id', Models.EXERCISE);
        AddIdReferenceV1(t, 'exercise_set_id', Models.EXERCISE_SET).unique();
        AddUserIdReferenceV1(t, 'user_id'); // Reference to the user

        // Timestamps for creation and updates
        AddTimestampsV1(t);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(Models.EXERCISE_SET_HISTORY.table);
}