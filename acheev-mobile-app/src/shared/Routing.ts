import { ParamListBase } from "@react-navigation/native"
import { ProgramFieldsFragment, ProgramListFieldsFragment, SkillLevel, WeightStat } from "../types/gqlReactTypings.generated.d"

export const BaseRoutes = {
  HOME: 'Home',
  ONBOARDING: 'Onboarding',
  SUBSCRIPTION: "Subscription",
}

export enum OnboardingRoutes {
  LANDING = 'OnboardingLanding',
  LOGIN = 'OnboardingLogin',
  REGISTER = 'OnboardingRegister',
  VERIFY = 'OnboardingVerify',
  FORGOT_PASSWORD = 'OnboardingForgotPassword',
  WALKTHROUGH = 'OnboardingWALKTHROUGH',
}

export enum AppRoutes {
  BASE = 'Base',
  FEED = 'Feed',
  FEED_INDEX = 'FeedIndex',
  FAVORITES = 'Favorites',
  FAVORITES_INDEX = 'FavoritesIndex',
  PROGRAMS_ALL = 'ProgramsAll',
  PROGRAM_LISTING = 'ProgramListing',
  PROGRAM_INFO = 'ProgramInfo',
  PROGRAM_SEARCH = 'ProgramSearch',
  NOTIFICATIONS = 'Notifications',
  WALKTHROUGH = 'Walkthrough',
  PROFILE = 'Profile',
  PROFILE_INDEX = 'ProfileIndex',
  PROFILE_SETTINGS = 'ProfileSettings',
  PROFILE_WEIGHT_STATS = 'ProfileWeightStats',
  PROFILE_WEIGHT_STAT_UPDATE = 'ProfileWeightStatUpdate',
  PROFILE_SUBSCRIPTION = 'ProfileSubscription',
  PROFILE_CALENDAR = 'ProfileCalendar',
  PROFILE_FAQ = 'ProfileFAQ',
  PROFILE_FEEDBACK = 'ProfileFeedback',
  PROFILE_WELCOME_VIDEOS = 'ProfileWelcomeVideos',
  PROFILE_WORKOUT_STATS = 'ProfileWorkoutStats',
  PROFILE_PERSONALIZE = 'ProfilePersonalize',
  PROFILE_CHANGE_PASSWORD = 'ProfileChangePassword',
  WORKOUT_LISTING = 'WorkoutListing',
  WORKOUT_RATING = 'WorkoutRating',
  PROGRAM_RATING = 'ProgramRating',
  COMMUNITY = 'Community',
  COMMUNITY_INDEX = 'CommunityIndex',
  CHAT_ROOM = "ChatRoom"
}

export interface NavigatorParams extends ParamListBase {
  [AppRoutes.BASE]: {},
  [AppRoutes.PROFILE]: { userId: string },
  [AppRoutes.PROGRAMS_ALL]: { programList: ProgramListFieldsFragment }
  [AppRoutes.PROGRAM_LISTING]: { programId: number, selectedFacetId?: number, skillLevel?: string | null },
  [AppRoutes.PROGRAM_INFO]: { programId: number, facetId: number, skillLevel: SkillLevel },
  [AppRoutes.WORKOUT_LISTING]: { workoutId: number, programWorkouts?: any, selectedFacetId?: any, skillLevel?: any },
  [AppRoutes.WORKOUT_RATING]: { workoutId: number },
  [AppRoutes.PROGRAM_RATING]: { programId: number },
  [AppRoutes.PROFILE_WEIGHT_STAT_UPDATE]: { weightStat?: Pick<WeightStat, 'id' | 'weight' | 'date' | 'imageUrl' | 'notes'> },
  [AppRoutes.CHAT_ROOM]: { program: ProgramFieldsFragment }
}


export const Routes = {
  HOME: BaseRoutes.HOME,

  // Feed
  FEED: AppRoutes.FEED,
  // Onboarding
  ONBOARDING: BaseRoutes.ONBOARDING,
}
