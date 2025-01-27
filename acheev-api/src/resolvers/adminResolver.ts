import { FeedbackModel } from "../models/feedbackModel";
import { RatingModel } from "../models/ratingModel";
import { UserModel } from "../models/userModel";
import { paginate, recordCount, requireAdmin, searchColumns } from "../shared/utilities";
import { GQLResolver } from "../types/types";

export const AdminResolver: GQLResolver = {
  resolvers: {
    Query: {
      adminMetrics: async (_, _1, ctx) => {
        requireAdmin(ctx);
        const userCount = await recordCount(UserModel);
        const feedbackCount = await recordCount(FeedbackModel);
        const ratingCount = await recordCount(RatingModel);

        return {
          userCount, feedbackCount, ratingCount
        }
      },
      adminUsers: async (_, { pagination }, ctx) => {
        requireAdmin(ctx, true);
        const { query } = pagination ?? {};

        return paginate(
          searchColumns(UserModel.query().orderBy('created_at', 'desc'), ['email', 'first_name', 'last_name', 'id'], query), pagination);
      },
      adminFeedback: async (_, { pagination }, ctx) => {
        requireAdmin(ctx, true);
        const { query } = pagination ?? {};

        return paginate(
          searchColumns(FeedbackModel.query().orderBy('created_at', 'desc'), ['category', 'content', 'notes', 'user_id', 'id'], query), pagination);
      },
      adminRatings: async (_, { pagination }, ctx) => {
        requireAdmin(ctx, true);
        const { query } = pagination ?? {};

        return paginate(
          searchColumns(RatingModel.query().orderBy('created_at', 'desc'), ['model_type', 'model_id', 'notes', 'user_id', 'id'], query), pagination);
      },
    },
  },
}