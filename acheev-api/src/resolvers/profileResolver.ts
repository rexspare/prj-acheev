import { CompletionModel } from "../models/completionModel";
import { FavoriteModel } from "../models/favoriteModel";
import { FeedbackModel } from "../models/feedbackModel";
import { ProgramFacetModel } from "../models/programFacetModel";
import { ProgramModel } from "../models/programModel";
import { CircuitModel } from "../models/circuitModel";
import { ExerciseModel } from "../models/exerciseModel";
import { ExerciseSetModel } from "../models/exerciseSetModel";
import { RatingModel } from "../models/ratingModel";
import { WorkoutModel } from "../models/workoutModel";
import { secureTargetUserId } from "../shared/utilities";
import { CompletionModelType, FavoriteModelType } from "../types/gqlTypings.generated";
import { GQLResolver } from "../types/types";

const favoriteModelIds = async (modelType: FavoriteModelType, userId: string) => {
  return (await FavoriteModel.query().where({ archived: false, userId, modelType }).select('model_id')).map(item => item.modelId);
}

export const ProfileResolver: GQLResolver = {
  resolvers: {
    Mutation: {
      favorite: async (_, { modelId, modelType }, ctx) => {
        const targetUserId = secureTargetUserId(ctx);
        const existing = await FavoriteModel.query().findOne({ modelId, modelType, userId: targetUserId });

        console.info({ existing });

        if (existing != null) {
          return existing.$query().updateAndFetch({ archived: !existing.archived });
        }

        return FavoriteModel.query().insertAndFetch({ modelId, modelType, userId: targetUserId });
      },
      submitFeedback: async (_, { feedbackInput }, ctx) => {
        const targetUserId = secureTargetUserId(ctx);
        return !!await (FeedbackModel.query().insert({ userId: targetUserId, ...feedbackInput }));
      },
      complete: async (_, { completionInput }, ctx) => {
        const targetUserId = secureTargetUserId(ctx);
        const { modelId, modelType } = completionInput;
        const existing = await CompletionModel.query().findOne({ modelId, modelType, userId: targetUserId });

        if (existing != null) {
          return existing.$query().updateAndFetch({ /*archived: !existing.archived, */ completedAt: new Date(), archived: false });
        }

        return CompletionModel.query().insertAndFetch({ userId: targetUserId, completedAt: new Date(), ...completionInput });
      },
      submitRating: async (_, { ratingInput }, ctx) => {
        const targetUserId = secureTargetUserId(ctx);

        return !!(await RatingModel.query().insertAndFetch({ userId: targetUserId, ...ratingInput }));
      },
    },
    Query: {
      isCompleted: async (_, { userId, modelType, modelId }, ctx) => {
        const targetUserId = secureTargetUserId(ctx, userId);
        return (await CompletionModel.query().findOne({ modelId, modelType, userId: targetUserId, archived: false })) != null;
      },
      completions: async (_, { userId, modelId, modelType, parentModelId, parentModelType }, ctx) => {
        const targetUserId = secureTargetUserId(ctx, userId);
        let query = CompletionModel.query().where({ archived: false, userId: targetUserId })
        if (modelType != null) {
          query = query.where({ modelType });
        }
        if (modelId != null) {
          query = query.where({ modelId });
        }
        if (parentModelType != null) {
          query = query.where({ parentModelType });
        }
        if (parentModelId != null) {
          query = query.where({ parentModelId });
        }
        return query;
      },
      favorites: async (_, { userId, modelType }, ctx) => {
        const targetUserId = secureTargetUserId(ctx, userId);
        let query = FavoriteModel.query().where({ archived: false, userId: targetUserId })
        if (modelType != null) {
          query = query.where({ modelType });
        }
        return query;
      },
      favoriteWorkouts: async (_, { userId }, ctx) => {
        const targetUserId = secureTargetUserId(ctx, userId);
        let modelIds = await favoriteModelIds(FavoriteModelType.Workout, targetUserId);

        return WorkoutModel.query().findByIds(modelIds).where({ archived: false });
      },
      favoriteProgramFacets: async (_, { userId }, ctx) => {
        const targetUserId = secureTargetUserId(ctx, userId);
        let modelIds = await favoriteModelIds(FavoriteModelType.ProgramFacet, targetUserId);

        return ProgramFacetModel.query().findByIds(modelIds).where({ archived: false });
      }
    },
    Completion: {
      model: async ({ modelType, modelId }) => {
        switch (modelType) {
          case CompletionModelType.Program:
            return await ProgramModel.query().findById(modelId).throwIfNotFound("Program not found!");
          case CompletionModelType.ProgramFacet:
            return await ProgramFacetModel.query().findById(modelId).throwIfNotFound("Program Facet not found!");
          case CompletionModelType.Workout:
            return await WorkoutModel.query().findById(modelId).throwIfNotFound("Workout not found!");
          case CompletionModelType.Cicuit:
            return await CircuitModel.query().findById(modelId).throwIfNotFound("Cicuit not found!");
          case CompletionModelType.Exercise:
            return await ExerciseModel.query().findById(modelId).throwIfNotFound("Exercise not found!");
          case CompletionModelType.ExerciseSet:
            return await ExerciseSetModel.query().findById(modelId).throwIfNotFound("Exercise Set not found!");
          default:
          throw new Error("Model Not Found!");
        }
      }
    },
    Model: {
      __resolveType(obj) {  
        switch (true) {
          case obj instanceof ProgramModel:
            return "Program";
          case obj instanceof ProgramFacetModel:
            return "ProgramFacet";
          case obj instanceof WorkoutModel:
            return "Workout";
          case obj instanceof CircuitModel:
            return "Circuit";
          case obj instanceof ExerciseModel:
            return "Exercise";
          case obj instanceof ExerciseSetModel:
            return "ExerciseSet";
          default:
            throw new Error("Model Not Found!");
        }
      },
    },
  },
}