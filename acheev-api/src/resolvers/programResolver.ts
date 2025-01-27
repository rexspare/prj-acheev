import { max, min, uniq } from "lodash";
import { CompletionModel } from "../models/completionModel";
import { ExerciseSetModel } from "../models/exerciseSetModel";
import { FavoriteModel } from "../models/favoriteModel";
import { ProgramFacetModel } from "../models/programFacetModel";
import { ProgramListEntryModel } from "../models/programListEntryModel";
import { ProgramListModel } from "../models/programListModel";
import { ProgramModel } from "../models/programModel";
import { WorkoutModel } from "../models/workoutModel";
import { paginate, queryRecordCount, requireAdmin, searchColumn, searchColumns, secureTargetUserId } from "../shared/utilities";
import { CompletionModelType, FavoriteModelType, ProgramFacet } from "../types/gqlTypings.generated";
import { GQLResolver } from "../types/types";
import { calculateWorkoutDurationMinutes } from "../shared/workUtils";

export const ProgramResolver: GQLResolver = {
  resolvers: {
    Query: {
      programs: async (_, { pagination }) => {
        return paginate(
          searchColumns(ProgramModel.query().where({ archived: false, live: true }).orderBy('created_at', 'desc'), ['name'], pagination?.query), pagination);
      },
      adminPrograms: async (_, { pagination }, ctx) => {
        requireAdmin(ctx);
        return paginate(
          searchColumns(ProgramModel.query().orderBy('created_at', 'desc'), ['name'], pagination?.query), pagination);
      },
      programSearch: async (_, { query }) => {
        return await paginate(searchColumn(ProgramModel.query().where({ live: true, archived: false }), 'name', query), undefined)
      },
      programLists: async () => {
        return await ProgramListModel.query().where({ archived: false })
      },
      program: async (_, { programId }) => {
        return ProgramModel.query().findById(programId).throwIfNotFound("Program does not exist");
      },
      programFacet: async (_, { programFacetId }) => {
        return ProgramFacetModel.query().findById(programFacetId).throwIfNotFound("Program does not exist");
      },
      programFacetStats: async (_, { programFacetId, skillLevel }) => {
        const workoutIds = (await WorkoutModel.query().where({ programFacetId, skillLevel, archived: false }).select('id')).map(item => item.id);
        const workoutDurations = await Promise.all(workoutIds.map(calculateWorkoutDurationMinutes));

        return {
          weekCount: uniq(await (await WorkoutModel.query().where({ programFacetId, skillLevel, archived: false }).select('week')).map(item => item.week)).length,
          workoutCount: await queryRecordCount(WorkoutModel.query().where({ programFacetId, skillLevel, archived: false })),
          workoutLength: uniq([
            Math.round((min(workoutDurations) ?? 0) * 10) / 10.0,
            Math.round((max(workoutDurations) ?? 0) * 10) / 10.0]).join('-')
        }
      },
      inProgressProgramFacets: async (_, { userId }, ctx) => {
        const targetUserId = secureTargetUserId(ctx, userId);

        const completedSets = uniq((await CompletionModel.query().where({ archived: false, userId: targetUserId, modelType: CompletionModelType.ExerciseSet }).select(['modelId', 'createdAt']).orderBy('createdAt', 'DESC')).map(item => item.modelId));
        const exerciseSets = uniq((await ExerciseSetModel.query().where({ archived: false }).findByIds(completedSets)).map(item => item.programFacetId));

        return ProgramFacetModel.query().findByIds(exerciseSets).where({ archived: false });
      }
    },
    Mutation: {
      modifyProgram: async (_, { programId, programInput }, ctx) => {
        requireAdmin(ctx);
        return ProgramModel.query().updateAndFetchById(programId, programInput).throwIfNotFound("Program DNE");
      },
      createProgram: async (_, { programInput }, ctx) => {
        requireAdmin(ctx);
        return ProgramModel.query().insertAndFetch(programInput);
      },
      modifyProgramFacet: async (_, { programFacetId, programFacetInput }, ctx) => {
        requireAdmin(ctx);
        return ProgramFacetModel.query().updateAndFetchById(programFacetId, programFacetInput).throwIfNotFound("Program DNE");
      },
      createProgramFacet: async (_, { programFacetInput }, ctx) => {
        requireAdmin(ctx);
        return ProgramFacetModel.query().insertAndFetch(programFacetInput);
      }
    },
    Program: {
      programFacets: async ({ id }) => await ProgramFacetModel.query().where({ programId: id, archived: false }),
    },
    ProgramList: {
      programs: async ({ id }) => {
        const programList = await ProgramListModel.query().findById(id).throwIfNotFound("No program list by that ID");

        if (programList.name.toLowerCase().includes("sports programs")) {
          return ProgramModel.query().where({ archived: false });
        }

        const programIds = (await ProgramListEntryModel.query().where({ programListId: id, archived: false }).select('programId', 'name')).map(item => item.programId);
        return ProgramModel.query().findByIds(programIds).where({ archived: false });
      },
    },
    ProgramFacet: {
      isFavorited: async (model) => {
        if ("isFavorited" in model) {
          return (model as unknown as ProgramFacet).isFavorited;
        }

        return (await FavoriteModel.query().findOne({ modelType: FavoriteModelType.ProgramFacet, modelId: model.id, archived: false })) != null;
      },
      program: async ({ programId }) => await ProgramModel.query().findById(programId).throwIfNotFound('Program does not exist for program facet')

    },
  },
} 