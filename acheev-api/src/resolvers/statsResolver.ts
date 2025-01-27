import { WeightStatModel } from "../models/weightStatModel";
import { paginate, secureTargetUserId } from "../shared/utilities";
import { GQLResolver } from "../types/types";

export const StatsResolver: GQLResolver = {
  resolvers: {
    Query: {
      weightStats: async (_, { userId, pagination }, ctx) => {
        const targetUserId = secureTargetUserId(ctx, userId);
        return paginate(WeightStatModel.query().where({ userId: targetUserId }), pagination);
      }
    },
    Mutation: {
      updateWeight: async (_, { weightStatId, updateWeightInput }, ctx) => {
        const targetUserId = secureTargetUserId(ctx);
        if (weightStatId != null) {
          const weightStat = await WeightStatModel.query().findById(weightStatId).throwIfNotFound("Weight stat DNE");
          if (weightStat.userId !== targetUserId) {
            throw Error("User does not have access to this weight stat");
          }

          return weightStat.$query().updateAndFetch(updateWeightInput)
        } else {
          return WeightStatModel.query().insertAndFetch({ userId: targetUserId, ...updateWeightInput });
        }
      }
    }
  },
}