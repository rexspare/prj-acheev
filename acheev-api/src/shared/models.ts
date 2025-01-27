export type DatabaseTable = {
  class: string;
  table: string;
}

type ModelMap = {
  [name: string]: DatabaseTable;
}

/**
 * Programs (ie Running)
 *  - Workouts (ie Workout 0 - Day 1)
 *    - Circuits (ie Stability, Condition)
 *      - Exercise (ie Bodyweight Squats, Ab twists)
 *        - ExerciseSet (ie time 45 seconds - weight .5 lbs)
 * Program List (just a collection of programs. Multiple lists can have the same program)
 */
// 
//
// 

export const Models = {
  CIRCUIT: {
    class: 'CircuitModel',
    table: 'circuits'
  },
  COMPLETION: {
    class: 'CompletionModel',
    table: 'completions'
  },
  EXERCISE: {
    class: 'ExerciseModel',
    table: 'exercises'
  },
  EXERCISE_SET: {
    class: 'ExerciseSetModel',
    table: 'exercise_sets'
  },
  EXERCISE_SET_HISTORY: {
    class: 'ExerciseSetHistoryModel',
    table: 'exercise_set_history',
  },
  FAVORITE: {
    class: 'FavoriteModel',
    table: 'favorites'
  },
  FEEDBACK: {
    class: 'FeedbackModel',
    table: 'feedback'
  },
  PROGRAM: {
    class: 'ProgramModel',
    table: 'programs'
  },
  PROGRAM_FACET: {
    class: 'ProgramFacetModel',
    table: 'program_facets'
  },
  PROGRAM_LIST: {
    class: 'ProgramListModel',
    table: 'program_lists'
  },
  PROGRAM_LIST_ENTRY: {
    class: 'ProgramListEntryModel',
    table: 'program_list_entries'
  },
  RATING: {
    class: 'RatingModel',
    table: 'ratings'
  },
  USER: {
    class: 'UserModel',
    table: 'users'
  },
  WEIGHT_STAT: {
    class: 'WeightStatModel',
    table: 'weight_stats'
  },
  WORKOUT: {
    class: 'WorkoutModel',
    table: 'workouts'
  },
  CHAT_MESSAGE: {
    class: 'ChatMessage',
    table: 'chat_messages'
  },
  CHAT_MESSAGE_READ: {
    class: "ChatMessageRead",
    table: 'chat_message_reads',
  }
};

function makeMap(_models: ModelMap): void { undefined }
makeMap(Models);
