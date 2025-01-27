/* THIS IS A GENERATED FILE - DO NOT MODIFY */

/* eslint-disable */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  JSON: any;
  Time: any;
};

export type AdminMetrics = {
  __typename?: 'AdminMetrics';
  feedbackCount: Scalars['Int'];
  ratingCount: Scalars['Int'];
  userCount: Scalars['Int'];
};

export type AdminModifyUserInput = {
  admin?: InputMaybe<Scalars['Boolean']>;
  birthday?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  isCoach?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  restrictedAdmin?: InputMaybe<Scalars['Boolean']>;
  skillLevel?: InputMaybe<SkillLevel>;
  verified?: InputMaybe<Scalars['Boolean']>;
  weightUnit?: InputMaybe<WeightUnit>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  newPasswordConfirmation: Scalars['String'];
};

export enum ChatEvents {
  DeleteMessage = 'DELETE_MESSAGE',
  NewMessage = 'NEW_MESSAGE',
  UpdateMessage = 'UPDATE_MESSAGE'
}

export type ChatMessage = {
  __typename?: 'ChatMessage';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isEdited: Scalars['Boolean'];
  mediaType?: Maybe<Scalars['String']>;
  mediaUrl?: Maybe<Scalars['String']>;
  programId: Scalars['Int'];
  readBy: Array<User>;
  replyTo?: Maybe<ReplyToMessage>;
  replyToId?: Maybe<Scalars['Int']>;
  sender: User;
  senderId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Circuit = {
  __typename?: 'Circuit';
  archived: Scalars['Boolean'];
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  exercises: Array<Exercise>;
  id: Scalars['Int'];
  name: Scalars['String'];
  order: Scalars['Int'];
  programFacetId: Scalars['Int'];
  programId: Scalars['Int'];
  startedAt?: Maybe<Scalars['DateTime']>;
  workoutId: Scalars['Int'];
};

export type CircuitInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  programFacetId?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
  workoutId?: InputMaybe<Scalars['Int']>;
};

export type CircuitXlsxInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  exercises: Array<ExerciseXlsxInput>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  programFacetId?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
  workoutId?: InputMaybe<Scalars['Int']>;
};

export type Completion = {
  __typename?: 'Completion';
  archived: Scalars['Boolean'];
  completedAt: Scalars['DateTime'];
  id: Scalars['Int'];
  model: Model;
  modelId: Scalars['Int'];
  modelType: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  parentModelId?: Maybe<Scalars['Int']>;
  parentModelType?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type CompletionInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  modelId: Scalars['Int'];
  modelType: CompletionModelType;
  parentModelId?: InputMaybe<Scalars['Int']>;
  parentModelType?: InputMaybe<Scalars['String']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
};

export enum CompletionModelType {
  Cicuit = 'CICUIT',
  Exercise = 'EXERCISE',
  ExerciseSet = 'EXERCISE_SET',
  Program = 'PROGRAM',
  ProgramFacet = 'PROGRAM_FACET',
  Workout = 'WORKOUT'
}

export type CreateCircuitsByXlsxInput = {
  circuits: Array<CircuitXlsxInput>;
};

export type CreateCircuitsByXlsxReponse = {
  __typename?: 'CreateCircuitsByXlsxReponse';
  success: Scalars['Boolean'];
};

export type CreateOrModifyExerciseSetInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  distance?: InputMaybe<Scalars['Int']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  exerciseId: Scalars['Int'];
  exerciseSetId?: InputMaybe<Scalars['Int']>;
  maxPercAvailable?: InputMaybe<Scalars['Boolean']>;
  percentageMax?: InputMaybe<Scalars['Float']>;
  repCount?: InputMaybe<Scalars['Int']>;
  repsAvailable?: InputMaybe<Scalars['Boolean']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type Exercise = {
  __typename?: 'Exercise';
  archived: Scalars['Boolean'];
  circuitId: Scalars['Int'];
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  exerciseSets: Array<ExerciseSet>;
  id: Scalars['Int'];
  name: Scalars['String'];
  order: Scalars['Int'];
  programFacetId: Scalars['Int'];
  programId: Scalars['Int'];
  restDurationSeconds: Scalars['Int'];
  startedAt?: Maybe<Scalars['DateTime']>;
  videoUrl: Scalars['String'];
  workoutId: Scalars['Int'];
};

export type ExerciseInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circuitId?: InputMaybe<Scalars['Int']>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  programFacetId?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  restDurationSeconds?: InputMaybe<Scalars['Int']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
  videoUrl?: InputMaybe<Scalars['String']>;
  workoutId?: InputMaybe<Scalars['Int']>;
};

export type ExerciseSet = {
  __typename?: 'ExerciseSet';
  archived: Scalars['Boolean'];
  circuitId: Scalars['Int'];
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  distance?: Maybe<Scalars['Int']>;
  durationSeconds: Scalars['Int'];
  exerciseId: Scalars['Int'];
  id: Scalars['Int'];
  maxPercAvailable?: Maybe<Scalars['Boolean']>;
  order: Scalars['Int'];
  percentageMax?: Maybe<Scalars['Float']>;
  programFacetId: Scalars['Int'];
  programId: Scalars['Int'];
  repCount?: Maybe<Scalars['Int']>;
  repsAvailable?: Maybe<Scalars['Boolean']>;
  startedAt?: Maybe<Scalars['DateTime']>;
  templateId?: Maybe<Scalars['Int']>;
  weight: Scalars['Float'];
  weightRelative: Scalars['Boolean'];
  weightUnit: WeightUnit;
  workoutId: Scalars['Int'];
};

export type ExerciseSetHistory = {
  __typename?: 'ExerciseSetHistory';
  circuitId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  exerciseId: Scalars['Int'];
  exerciseSetId: Scalars['Int'];
  id: Scalars['Int'];
  programFacetId: Scalars['Int'];
  programId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
  workoutId: Scalars['Int'];
};

export type ExerciseSetHistoryInput = {
  circuitId: Scalars['Int'];
  exerciseId: Scalars['Int'];
  exerciseSetId: Scalars['Int'];
  programFacetId: Scalars['Int'];
  programId: Scalars['Int'];
  workoutId: Scalars['Int'];
};

export type ExerciseSetInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circuitId?: InputMaybe<Scalars['Int']>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  distance?: InputMaybe<Scalars['Int']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  exerciseId?: InputMaybe<Scalars['Int']>;
  maxPercAvailable?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  percentageMax?: InputMaybe<Scalars['Float']>;
  programFacetId?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  repCount?: InputMaybe<Scalars['Int']>;
  repsAvailable?: InputMaybe<Scalars['Boolean']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
  weight?: InputMaybe<Scalars['Float']>;
  weightRelative?: InputMaybe<Scalars['Boolean']>;
  weightUnit?: InputMaybe<WeightUnit>;
  workoutId?: InputMaybe<Scalars['Int']>;
};

export type ExerciseSetXlsxInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circuitId?: InputMaybe<Scalars['Int']>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  distance?: InputMaybe<Scalars['Int']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  exerciseId?: InputMaybe<Scalars['Int']>;
  maxPercAvailable?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  percentageMax?: InputMaybe<Scalars['Float']>;
  programFacetId?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  repCount?: InputMaybe<Scalars['Int']>;
  repsAvailable?: InputMaybe<Scalars['Boolean']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
  weight?: InputMaybe<Scalars['Float']>;
  weightRelative?: InputMaybe<Scalars['Boolean']>;
  weightUnit?: InputMaybe<WeightUnit>;
  workoutId?: InputMaybe<Scalars['Int']>;
};

export type ExerciseXlsxInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circuitId?: InputMaybe<Scalars['Int']>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  programFacetId?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  restDurationSeconds?: InputMaybe<Scalars['Int']>;
  sets: Array<ExerciseSetXlsxInput>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
  videoUrl?: InputMaybe<Scalars['String']>;
  workoutId?: InputMaybe<Scalars['Int']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  archived: Scalars['Boolean'];
  id: Scalars['Int'];
  modelId: Scalars['Int'];
  modelType: Scalars['String'];
  userId: Scalars['String'];
};

export enum FavoriteModelType {
  ProgramFacet = 'PROGRAM_FACET',
  Workout = 'WORKOUT'
}

export type Feedback = {
  __typename?: 'Feedback';
  category?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type FeedbackInput = {
  category?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
};

export type Model = Circuit | Exercise | ExerciseSet | Program | ProgramFacet | Workout;

export type ModifyUserInput = {
  androidPushToken?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  iosPushToken?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
  notifications?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
  skillLevel?: InputMaybe<SkillLevel>;
  weightUnit?: InputMaybe<WeightUnit>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminChangePassword: Scalars['Boolean'];
  adminModifyUser: User;
  changePassword: Scalars['Boolean'];
  complete: Completion;
  createCircuit: Circuit;
  createCircuitsByXlsx: CreateCircuitsByXlsxReponse;
  createExercise: Exercise;
  createExerciseSet: ExerciseSet;
  createExerciseSetHistory: ExerciseSetHistory;
  createOrModifyExerciseSet: ExerciseSet;
  createProgram: Program;
  createProgramFacet: ProgramFacet;
  createWorkout: Workout;
  deleteMessage: ChatMessage;
  deleteS3Object: S3DeleteResponse;
  editMessage: ChatMessage;
  favorite: Favorite;
  forgotPasswordRequest: Scalars['Boolean'];
  login: LoginResponse;
  modifyCircuit: Circuit;
  modifyExercise: Exercise;
  modifyExerciseSet: ExerciseSet;
  modifyProgram: Program;
  modifyProgramFacet: ProgramFacet;
  modifyUser: User;
  modifyWorkout: Workout;
  ping: Scalars['String'];
  readMessage: ChatMessage;
  register: LoginResponse;
  requestOtp: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  sendMessage: ChatMessage;
  submitFeedback: Scalars['Boolean'];
  submitRating: Scalars['Boolean'];
  updateWeight: WeightStat;
  verifyOtp: LoginResponse;
};


export type MutationAdminChangePasswordArgs = {
  newPassword: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationAdminModifyUserArgs = {
  modifyUserInput: AdminModifyUserInput;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationCompleteArgs = {
  completionInput: CompletionInput;
};


export type MutationCreateCircuitArgs = {
  circuitInput: CircuitInput;
};


export type MutationCreateCircuitsByXlsxArgs = {
  createCircuitsByXlsxInput: CreateCircuitsByXlsxInput;
};


export type MutationCreateExerciseArgs = {
  exerciseInput: ExerciseInput;
};


export type MutationCreateExerciseSetArgs = {
  exerciseSetInput: ExerciseSetInput;
};


export type MutationCreateExerciseSetHistoryArgs = {
  exerciseSetHistoryInput: ExerciseSetHistoryInput;
};


export type MutationCreateOrModifyExerciseSetArgs = {
  createOrModifyExerciseSetInput: CreateOrModifyExerciseSetInput;
};


export type MutationCreateProgramArgs = {
  programInput: ProgramInput;
};


export type MutationCreateProgramFacetArgs = {
  programFacetInput: ProgramFacetInput;
};


export type MutationCreateWorkoutArgs = {
  workoutInput: WorkoutInput;
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationDeleteS3ObjectArgs = {
  fileKey: Scalars['String'];
};


export type MutationEditMessageArgs = {
  mediaType?: InputMaybe<Scalars['String']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
  messageId: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};


export type MutationFavoriteArgs = {
  modelId: Scalars['String'];
  modelType: FavoriteModelType;
};


export type MutationForgotPasswordRequestArgs = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};


export type MutationModifyCircuitArgs = {
  circuitId: Scalars['Int'];
  circuitInput: CircuitInput;
};


export type MutationModifyExerciseArgs = {
  exerciseId: Scalars['Int'];
  exerciseInput: ExerciseInput;
};


export type MutationModifyExerciseSetArgs = {
  exerciseSetId: Scalars['Int'];
  exerciseSetInput: ExerciseSetInput;
};


export type MutationModifyProgramArgs = {
  programId: Scalars['Int'];
  programInput: ProgramInput;
};


export type MutationModifyProgramFacetArgs = {
  programFacetId: Scalars['Int'];
  programFacetInput: ProgramFacetInput;
};


export type MutationModifyUserArgs = {
  modifyUserInput: ModifyUserInput;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationModifyWorkoutArgs = {
  workoutId: Scalars['Int'];
  workoutInput: WorkoutInput;
};


export type MutationReadMessageArgs = {
  messageId: Scalars['Int'];
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  userInput: UserInput;
};


export type MutationRequestOtpArgs = {
  phoneNumber: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};


export type MutationSendMessageArgs = {
  mediaType?: InputMaybe<Scalars['String']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
  programId: Scalars['Int'];
  replyToId?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};


export type MutationSubmitFeedbackArgs = {
  feedbackInput?: InputMaybe<FeedbackInput>;
};


export type MutationSubmitRatingArgs = {
  ratingInput: RatingInput;
};


export type MutationUpdateWeightArgs = {
  updateWeightInput: UpdateWeightInput;
  weightStatId?: InputMaybe<Scalars['Int']>;
};


export type MutationVerifyOtpArgs = {
  otp: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type OrderBy = {
  column: Scalars['String'];
  direction?: InputMaybe<OrderByDirection>;
};

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderBy>>;
  page?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Program = {
  __typename?: 'Program';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  live: Scalars['Boolean'];
  name: Scalars['String'];
  programFacets: Array<ProgramFacet>;
};

export type ProgramFacet = {
  __typename?: 'ProgramFacet';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  equipmentNeeded?: Maybe<Scalars['String']>;
  goals?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  isFavorited: Scalars['Boolean'];
  live: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Int'];
  program: Program;
  programId: Scalars['Int'];
  videoUrl?: Maybe<Scalars['String']>;
};

export type ProgramFacetInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  equipmentNeeded?: InputMaybe<Scalars['String']>;
  goals?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  live?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type ProgramFacetStats = {
  __typename?: 'ProgramFacetStats';
  weekCount: Scalars['Int'];
  workoutCount: Scalars['Int'];
  workoutLength: Scalars['String'];
};

export type ProgramInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  live?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ProgramList = {
  __typename?: 'ProgramList';
  id: Scalars['Int'];
  name: Scalars['String'];
  programs: Array<Program>;
};

export type ProgramMessagesResponse = {
  __typename?: 'ProgramMessagesResponse';
  data: Array<ChatMessage>;
  meta: PaginationMeta;
};

export type PublicUser = {
  __typename?: 'PublicUser';
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  location?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  adminFeedback: Array<Feedback>;
  adminMetrics: AdminMetrics;
  adminPrograms: Array<Program>;
  adminRatings: Array<Rating>;
  adminUsers: Array<User>;
  completedWorkouts: Array<Completion>;
  completions: Array<Completion>;
  exerciseSetHistory: Array<Maybe<ExerciseSetHistory>>;
  favoriteProgramFacets: Array<ProgramFacet>;
  favoriteWorkouts: Array<Workout>;
  favorites: Array<Favorite>;
  getProgramMessages: ProgramMessagesResponse;
  inProgressProgramFacets: Array<ProgramFacet>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  me?: Maybe<LoginResponse>;
  program: Program;
  programFacet: ProgramFacet;
  programFacetStats: ProgramFacetStats;
  programLists: Array<ProgramList>;
  programSearch: Array<Program>;
  programs: Array<Program>;
  scheduledWorkouts: Array<Maybe<ScheduledWorkout>>;
  signUrl: S3SignResponse;
  user: PublicUser;
  version: Scalars['String'];
  weightStats: Array<WeightStat>;
  workout: Workout;
  workouts: Array<Workout>;
};


export type QueryAdminFeedbackArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAdminProgramsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAdminRatingsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAdminUsersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryCompletionsArgs = {
  modelId?: InputMaybe<Scalars['Int']>;
  modelType?: InputMaybe<CompletionModelType>;
  parentModelId?: InputMaybe<Scalars['Int']>;
  parentModelType?: InputMaybe<CompletionModelType>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryFavoriteProgramFacetsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryFavoriteWorkoutsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryFavoritesArgs = {
  modelType?: InputMaybe<FavoriteModelType>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetProgramMessagesArgs = {
  pagination?: InputMaybe<Pagination>;
  programId: Scalars['Int'];
};


export type QueryInProgressProgramFacetsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryIsCompletedArgs = {
  modelId: Scalars['String'];
  modelType: CompletionModelType;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryProgramArgs = {
  programId: Scalars['Int'];
};


export type QueryProgramFacetArgs = {
  programFacetId: Scalars['Int'];
};


export type QueryProgramFacetStatsArgs = {
  programFacetId: Scalars['Int'];
  skillLevel: SkillLevel;
};


export type QueryProgramSearchArgs = {
  query: Scalars['String'];
};


export type QueryProgramsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QuerySignUrlArgs = {
  contentType: Scalars['String'];
  objectName: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};


export type QueryWeightStatsArgs = {
  pagination?: InputMaybe<Pagination>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryWorkoutArgs = {
  workoutId: Scalars['Int'];
};


export type QueryWorkoutsArgs = {
  programFacetId: Scalars['Int'];
  skillLevel: SkillLevel;
};

export type Rating = {
  __typename?: 'Rating';
  createdAt: Scalars['DateTime'];
  experiencedImprovement?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  modelId: Scalars['String'];
  modelType: RatingModelType;
  notes?: Maybe<Scalars['String']>;
  ratingChallenge?: Maybe<Scalars['Int']>;
  ratingChallengeScale: Scalars['Int'];
  ratingEffort?: Maybe<Scalars['Int']>;
  ratingEffortScale: Scalars['Int'];
  ratingOverall?: Maybe<Scalars['Int']>;
  ratingOverallScale: Scalars['Int'];
  ratingPerformance?: Maybe<Scalars['Int']>;
  ratingPerformanceScale: Scalars['Int'];
  userId: Scalars['String'];
};

export type RatingInput = {
  experiencedImprovement?: InputMaybe<Scalars['Boolean']>;
  modelId: Scalars['String'];
  modelType: RatingModelType;
  notes?: InputMaybe<Scalars['String']>;
  ratingChallenge?: InputMaybe<Scalars['Int']>;
  ratingChallengeScale?: InputMaybe<Scalars['Int']>;
  ratingEffort?: InputMaybe<Scalars['Int']>;
  ratingEffortScale?: InputMaybe<Scalars['Int']>;
  ratingOverall?: InputMaybe<Scalars['Int']>;
  ratingOverallScale?: InputMaybe<Scalars['Int']>;
  ratingPerformance?: InputMaybe<Scalars['Int']>;
  ratingPerformanceScale?: InputMaybe<Scalars['Int']>;
};

export enum RatingModelType {
  Program = 'PROGRAM',
  ProgramFacet = 'PROGRAM_FACET',
  Workout = 'WORKOUT'
}

export type ReplyToMessage = {
  __typename?: 'ReplyToMessage';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isEdited: Scalars['Boolean'];
  mediaType?: Maybe<Scalars['String']>;
  mediaUrl?: Maybe<Scalars['String']>;
  programId: Scalars['Int'];
  replyToId?: Maybe<Scalars['Int']>;
  senderId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type S3DeleteResponse = {
  __typename?: 'S3DeleteResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type S3SignResponse = {
  __typename?: 'S3SignResponse';
  fileKey: Scalars['String'];
  fileName: Scalars['String'];
  publicUrl: Scalars['String'];
  signedUrl: Scalars['String'];
};

export type ScheduledProgramFacet = {
  __typename?: 'ScheduledProgramFacet';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  programFacetId: Scalars['Int'];
  programFacets: Array<ProgramFacet>;
  startDate: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type ScheduledWorkout = {
  __typename?: 'ScheduledWorkout';
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  isCompleted: Scalars['Boolean'];
  name: Scalars['String'];
};

export enum SkillLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE',
  Professional = 'PROFESSIONAL'
}

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: ChatMessage;
};

export type UpdateWeightInput = {
  date: Scalars['DateTime'];
  imageUrl?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  weight: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  admin: Scalars['Boolean'];
  androidPushToken?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  iosPushToken?: Maybe<Scalars['String']>;
  isCoach: Scalars['Boolean'];
  lastName: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  newsletter: Scalars['Boolean'];
  notifications: Scalars['Boolean'];
  phoneNumber: Scalars['String'];
  private: Scalars['Boolean'];
  restrictedAdmin: Scalars['Boolean'];
  skillLevel: SkillLevel;
  title?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
  weightUnit: WeightUnit;
};

export type UserInput = {
  birthday?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
  notifications?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  private?: InputMaybe<Scalars['Boolean']>;
  skillLevel?: InputMaybe<SkillLevel>;
  title?: InputMaybe<Scalars['String']>;
  weightUnit?: InputMaybe<WeightUnit>;
};

export type WeightStat = {
  __typename?: 'WeightStat';
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  weight: Scalars['Float'];
};

export enum WeightUnit {
  Kilos = 'KILOS',
  Pounds = 'POUNDS'
}

export type Workout = {
  __typename?: 'Workout';
  archived: Scalars['Boolean'];
  circuits: Array<Circuit>;
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  durationMinutes: Scalars['Int'];
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  isFavorited: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Int'];
  programFacet: ProgramFacet;
  programFacetId: Scalars['Int'];
  programId: Scalars['Int'];
  skillLevel: SkillLevel;
  startedAt?: Maybe<Scalars['DateTime']>;
  week: Scalars['Int'];
};

export type WorkoutInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  durationMinutes?: InputMaybe<Scalars['Int']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  programFacetId?: InputMaybe<Scalars['Int']>;
  programId?: InputMaybe<Scalars['Int']>;
  skillLevel?: InputMaybe<SkillLevel>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
  week?: InputMaybe<Scalars['Int']>;
};

export type SignUrlQueryVariables = Exact<{
  objectName: Scalars['String'];
  contentType: Scalars['String'];
}>;


export type SignUrlQuery = { __typename?: 'Query', signUrl: { __typename?: 'S3SignResponse', signedUrl: string, publicUrl: string, fileName: string, fileKey: string } };

export type AdminMetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminMetricsQuery = { __typename?: 'Query', adminMetrics: { __typename?: 'AdminMetrics', userCount: number, ratingCount: number, feedbackCount: number } };

export type AdminUsersQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type AdminUsersQuery = { __typename?: 'Query', adminUsers: Array<{ __typename?: 'User', id: string, email?: string | undefined, phoneNumber: string, fullName: string, firstName: string, lastName: string, admin: boolean, restrictedAdmin: boolean, isCoach: boolean, verified: boolean, createdAt?: any | undefined }> };

export type AdminChangePasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type AdminChangePasswordMutation = { __typename?: 'Mutation', adminChangePassword: boolean };

export type AdminFeedbackQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type AdminFeedbackQuery = { __typename?: 'Query', adminFeedback: Array<{ __typename?: 'Feedback', id: string, userId: string, category?: string | undefined, content?: string | undefined, notes?: string | undefined, createdAt: any }> };

export type ProgramFacetQueryVariables = Exact<{
  programFacetId: Scalars['Int'];
}>;


export type ProgramFacetQuery = { __typename?: 'Query', programFacet: { __typename?: 'ProgramFacet', id: number, programId: number, name: string, imageUrl: string, program: { __typename?: 'Program', id: number, name: string } } };

export type WorkoutsQueryVariables = Exact<{
  programFacetId: Scalars['Int'];
  skillLevel: SkillLevel;
}>;


export type WorkoutsQuery = { __typename?: 'Query', workouts: Array<{ __typename?: 'Workout', id: number, skillLevel: SkillLevel, name: string, completedAt?: any | undefined, startedAt?: any | undefined, imageUrl: string, week: number, order: number, durationMinutes: number, archived: boolean, createdAt: any }> };

export type ModifyWorkoutMutationVariables = Exact<{
  workoutId: Scalars['Int'];
  workoutInput: WorkoutInput;
}>;


export type ModifyWorkoutMutation = { __typename?: 'Mutation', modifyWorkout: { __typename?: 'Workout', id: number } };

export type CreateWorkoutMutationVariables = Exact<{
  workoutInput: WorkoutInput;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename?: 'Workout', id: number } };

export type AdminProgramsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type AdminProgramsQuery = { __typename?: 'Query', adminPrograms: Array<{ __typename?: 'Program', id: number, name: string, imageUrl: string, live: boolean, archived: boolean, createdAt: any, programFacets: Array<{ __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, live: boolean, archived: boolean, createdAt: any, description?: string | undefined, goals?: string | undefined, videoUrl?: string | undefined, equipmentNeeded?: string | undefined }> }> };

export type ModifyProgramMutationVariables = Exact<{
  programId: Scalars['Int'];
  programInput: ProgramInput;
}>;


export type ModifyProgramMutation = { __typename?: 'Mutation', modifyProgram: { __typename?: 'Program', id: number } };

export type CreateProgramMutationVariables = Exact<{
  programInput: ProgramInput;
}>;


export type CreateProgramMutation = { __typename?: 'Mutation', createProgram: { __typename?: 'Program', id: number } };

export type AdminRatingsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type AdminRatingsQuery = { __typename?: 'Query', adminRatings: Array<{ __typename?: 'Rating', id: number, userId: string, modelType: RatingModelType, modelId: string, notes?: string | undefined, createdAt: any, ratingChallenge?: number | undefined, ratingChallengeScale: number, ratingPerformance?: number | undefined, ratingPerformanceScale: number, ratingEffort?: number | undefined, ratingEffortScale: number, ratingOverall?: number | undefined, ratingOverallScale: number, experiencedImprovement?: boolean | undefined }> };

export type WorkoutQueryVariables = Exact<{
  workoutId: Scalars['Int'];
}>;


export type WorkoutQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', id: number, name: string, week: number, order: number, skillLevel: SkillLevel, archived: boolean, createdAt: any, programId: number, programFacetId: number, programFacet: { __typename?: 'ProgramFacet', id: number, name: string, program: { __typename?: 'Program', id: number, name: string } }, circuits: Array<{ __typename?: 'Circuit', id: number, name: string, order: number, archived: boolean, createdAt: any, programId: number, programFacetId: number, workoutId: number, exercises: Array<{ __typename?: 'Exercise', id: number, name: string, order: number, videoUrl: string, restDurationSeconds: number, description: string, archived: boolean, createdAt: any, exerciseSets: Array<{ __typename?: 'ExerciseSet', id: number, order: number, durationSeconds: number, repCount?: number | undefined, weight: number, distance?: number | undefined, percentageMax?: number | undefined, repsAvailable?: boolean | undefined, maxPercAvailable?: boolean | undefined, weightRelative: boolean, weightUnit: WeightUnit, archived: boolean, createdAt: any }> }> }> } };

export type ModifyCircuitMutationVariables = Exact<{
  circuitId: Scalars['Int'];
  circuitInput: CircuitInput;
}>;


export type ModifyCircuitMutation = { __typename?: 'Mutation', modifyCircuit: { __typename?: 'Circuit', id: number } };

export type CreateCircuitMutationVariables = Exact<{
  circuitInput: CircuitInput;
}>;


export type CreateCircuitMutation = { __typename?: 'Mutation', createCircuit: { __typename?: 'Circuit', id: number } };

export type ModifyExerciseMutationVariables = Exact<{
  exerciseId: Scalars['Int'];
  exerciseInput: ExerciseInput;
}>;


export type ModifyExerciseMutation = { __typename?: 'Mutation', modifyExercise: { __typename?: 'Exercise', id: number } };

export type CreateExerciseMutationVariables = Exact<{
  exerciseInput: ExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id: number } };

export type ModifyExerciseSetMutationVariables = Exact<{
  exerciseSetId: Scalars['Int'];
  exerciseSetInput: ExerciseSetInput;
}>;


export type ModifyExerciseSetMutation = { __typename?: 'Mutation', modifyExerciseSet: { __typename?: 'ExerciseSet', id: number } };

export type CreateExerciseSetMutationVariables = Exact<{
  exerciseSetInput: ExerciseSetInput;
}>;


export type CreateExerciseSetMutation = { __typename?: 'Mutation', createExerciseSet: { __typename?: 'ExerciseSet', id: number } };

export type CreateCircuitsByXlsxMutationVariables = Exact<{
  createCircuitsByXlsxInput: CreateCircuitsByXlsxInput;
}>;


export type CreateCircuitsByXlsxMutation = { __typename?: 'Mutation', createCircuitsByXlsx: { __typename?: 'CreateCircuitsByXlsxReponse', success: boolean } };

export type ModifyProgramFacetMutationVariables = Exact<{
  programFacetId: Scalars['Int'];
  programFacetInput: ProgramFacetInput;
}>;


export type ModifyProgramFacetMutation = { __typename?: 'Mutation', modifyProgramFacet: { __typename?: 'ProgramFacet', id: number } };

export type CreateProgramFacetMutationVariables = Exact<{
  programFacetInput: ProgramFacetInput;
}>;


export type CreateProgramFacetMutation = { __typename?: 'Mutation', createProgramFacet: { __typename?: 'ProgramFacet', id: number } };

export type GenericUserFieldsFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, admin: boolean, restrictedAdmin: boolean, createdAt?: any | undefined };

export type CurrentUserFieldsFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, admin: boolean, restrictedAdmin: boolean, createdAt?: any | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, admin: boolean, restrictedAdmin: boolean, createdAt?: any | undefined } } | undefined };

export type LoginMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, admin: boolean, restrictedAdmin: boolean, createdAt?: any | undefined } } };

export type RegisterMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, admin: boolean, restrictedAdmin: boolean, createdAt?: any | undefined } } };

export type AdminModifyUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  modifyUserInput: AdminModifyUserInput;
}>;


export type AdminModifyUserMutation = { __typename?: 'Mutation', adminModifyUser: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, admin: boolean, restrictedAdmin: boolean, createdAt?: any | undefined } };

export const GenericUserFieldsFragmentDoc = gql`
    fragment GenericUserFields on User {
  id
  firstName
  lastName
  fullName
  email
  phoneNumber
  admin
  restrictedAdmin
  createdAt
}
    `;
export const CurrentUserFieldsFragmentDoc = gql`
    fragment CurrentUserFields on User {
  ...GenericUserFields
}
    ${GenericUserFieldsFragmentDoc}`;
export const SignUrlDocument = gql`
    query SignUrl($objectName: String!, $contentType: String!) {
  signUrl(objectName: $objectName, contentType: $contentType) {
    signedUrl
    publicUrl
    fileName
    fileKey
  }
}
    `;

/**
 * __useSignUrlQuery__
 *
 * To run a query within a React component, call `useSignUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignUrlQuery({
 *   variables: {
 *      objectName: // value for 'objectName'
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useSignUrlQuery(baseOptions: Apollo.QueryHookOptions<SignUrlQuery, SignUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignUrlQuery, SignUrlQueryVariables>(SignUrlDocument, options);
      }
export function useSignUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignUrlQuery, SignUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignUrlQuery, SignUrlQueryVariables>(SignUrlDocument, options);
        }
export type SignUrlQueryHookResult = ReturnType<typeof useSignUrlQuery>;
export type SignUrlLazyQueryHookResult = ReturnType<typeof useSignUrlLazyQuery>;
export type SignUrlQueryResult = Apollo.QueryResult<SignUrlQuery, SignUrlQueryVariables>;
export const AdminMetricsDocument = gql`
    query AdminMetrics {
  adminMetrics {
    userCount
    ratingCount
    feedbackCount
  }
}
    `;

/**
 * __useAdminMetricsQuery__
 *
 * To run a query within a React component, call `useAdminMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminMetricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminMetricsQuery(baseOptions?: Apollo.QueryHookOptions<AdminMetricsQuery, AdminMetricsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminMetricsQuery, AdminMetricsQueryVariables>(AdminMetricsDocument, options);
      }
export function useAdminMetricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminMetricsQuery, AdminMetricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminMetricsQuery, AdminMetricsQueryVariables>(AdminMetricsDocument, options);
        }
export type AdminMetricsQueryHookResult = ReturnType<typeof useAdminMetricsQuery>;
export type AdminMetricsLazyQueryHookResult = ReturnType<typeof useAdminMetricsLazyQuery>;
export type AdminMetricsQueryResult = Apollo.QueryResult<AdminMetricsQuery, AdminMetricsQueryVariables>;
export const AdminUsersDocument = gql`
    query AdminUsers($pagination: Pagination) {
  adminUsers(pagination: $pagination) {
    id
    email
    phoneNumber
    fullName
    firstName
    lastName
    admin
    restrictedAdmin
    isCoach
    verified
    createdAt
  }
}
    `;

/**
 * __useAdminUsersQuery__
 *
 * To run a query within a React component, call `useAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUsersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminUsersQuery(baseOptions?: Apollo.QueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
      }
export function useAdminUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
export type AdminUsersQueryHookResult = ReturnType<typeof useAdminUsersQuery>;
export type AdminUsersLazyQueryHookResult = ReturnType<typeof useAdminUsersLazyQuery>;
export type AdminUsersQueryResult = Apollo.QueryResult<AdminUsersQuery, AdminUsersQueryVariables>;
export const AdminChangePasswordDocument = gql`
    mutation AdminChangePassword($userId: String!, $newPassword: String!) {
  adminChangePassword(userId: $userId, newPassword: $newPassword)
}
    `;
export type AdminChangePasswordMutationFn = Apollo.MutationFunction<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>;

/**
 * __useAdminChangePasswordMutation__
 *
 * To run a mutation, you first call `useAdminChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminChangePasswordMutation, { data, loading, error }] = useAdminChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useAdminChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>(AdminChangePasswordDocument, options);
      }
export type AdminChangePasswordMutationHookResult = ReturnType<typeof useAdminChangePasswordMutation>;
export type AdminChangePasswordMutationResult = Apollo.MutationResult<AdminChangePasswordMutation>;
export type AdminChangePasswordMutationOptions = Apollo.BaseMutationOptions<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>;
export const AdminFeedbackDocument = gql`
    query AdminFeedback($pagination: Pagination) {
  adminFeedback(pagination: $pagination) {
    id
    userId
    category
    content
    notes
    createdAt
  }
}
    `;

/**
 * __useAdminFeedbackQuery__
 *
 * To run a query within a React component, call `useAdminFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminFeedbackQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminFeedbackQuery(baseOptions?: Apollo.QueryHookOptions<AdminFeedbackQuery, AdminFeedbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminFeedbackQuery, AdminFeedbackQueryVariables>(AdminFeedbackDocument, options);
      }
export function useAdminFeedbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminFeedbackQuery, AdminFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminFeedbackQuery, AdminFeedbackQueryVariables>(AdminFeedbackDocument, options);
        }
export type AdminFeedbackQueryHookResult = ReturnType<typeof useAdminFeedbackQuery>;
export type AdminFeedbackLazyQueryHookResult = ReturnType<typeof useAdminFeedbackLazyQuery>;
export type AdminFeedbackQueryResult = Apollo.QueryResult<AdminFeedbackQuery, AdminFeedbackQueryVariables>;
export const ProgramFacetDocument = gql`
    query ProgramFacet($programFacetId: Int!) {
  programFacet(programFacetId: $programFacetId) {
    id
    programId
    name
    imageUrl
    program {
      id
      name
    }
  }
}
    `;

/**
 * __useProgramFacetQuery__
 *
 * To run a query within a React component, call `useProgramFacetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramFacetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramFacetQuery({
 *   variables: {
 *      programFacetId: // value for 'programFacetId'
 *   },
 * });
 */
export function useProgramFacetQuery(baseOptions: Apollo.QueryHookOptions<ProgramFacetQuery, ProgramFacetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramFacetQuery, ProgramFacetQueryVariables>(ProgramFacetDocument, options);
      }
export function useProgramFacetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramFacetQuery, ProgramFacetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramFacetQuery, ProgramFacetQueryVariables>(ProgramFacetDocument, options);
        }
export type ProgramFacetQueryHookResult = ReturnType<typeof useProgramFacetQuery>;
export type ProgramFacetLazyQueryHookResult = ReturnType<typeof useProgramFacetLazyQuery>;
export type ProgramFacetQueryResult = Apollo.QueryResult<ProgramFacetQuery, ProgramFacetQueryVariables>;
export const WorkoutsDocument = gql`
    query Workouts($programFacetId: Int!, $skillLevel: SkillLevel!) {
  workouts(programFacetId: $programFacetId, skillLevel: $skillLevel) {
    id
    skillLevel
    name
    completedAt
    startedAt
    imageUrl
    week
    order
    durationMinutes
    archived
    createdAt
  }
}
    `;

/**
 * __useWorkoutsQuery__
 *
 * To run a query within a React component, call `useWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutsQuery({
 *   variables: {
 *      programFacetId: // value for 'programFacetId'
 *      skillLevel: // value for 'skillLevel'
 *   },
 * });
 */
export function useWorkoutsQuery(baseOptions: Apollo.QueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
      }
export function useWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
        }
export type WorkoutsQueryHookResult = ReturnType<typeof useWorkoutsQuery>;
export type WorkoutsLazyQueryHookResult = ReturnType<typeof useWorkoutsLazyQuery>;
export type WorkoutsQueryResult = Apollo.QueryResult<WorkoutsQuery, WorkoutsQueryVariables>;
export const ModifyWorkoutDocument = gql`
    mutation ModifyWorkout($workoutId: Int!, $workoutInput: WorkoutInput!) {
  modifyWorkout(workoutId: $workoutId, workoutInput: $workoutInput) {
    id
  }
}
    `;
export type ModifyWorkoutMutationFn = Apollo.MutationFunction<ModifyWorkoutMutation, ModifyWorkoutMutationVariables>;

/**
 * __useModifyWorkoutMutation__
 *
 * To run a mutation, you first call `useModifyWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyWorkoutMutation, { data, loading, error }] = useModifyWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      workoutInput: // value for 'workoutInput'
 *   },
 * });
 */
export function useModifyWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<ModifyWorkoutMutation, ModifyWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyWorkoutMutation, ModifyWorkoutMutationVariables>(ModifyWorkoutDocument, options);
      }
export type ModifyWorkoutMutationHookResult = ReturnType<typeof useModifyWorkoutMutation>;
export type ModifyWorkoutMutationResult = Apollo.MutationResult<ModifyWorkoutMutation>;
export type ModifyWorkoutMutationOptions = Apollo.BaseMutationOptions<ModifyWorkoutMutation, ModifyWorkoutMutationVariables>;
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($workoutInput: WorkoutInput!) {
  createWorkout(workoutInput: $workoutInput) {
    id
  }
}
    `;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      workoutInput: // value for 'workoutInput'
 *   },
 * });
 */
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, options);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export const AdminProgramsDocument = gql`
    query AdminPrograms($pagination: Pagination) {
  adminPrograms(pagination: $pagination) {
    id
    name
    imageUrl
    live
    archived
    createdAt
    programFacets {
      id
      name
      imageUrl
      order
      live
      archived
      createdAt
      description
      goals
      videoUrl
      equipmentNeeded
    }
  }
}
    `;

/**
 * __useAdminProgramsQuery__
 *
 * To run a query within a React component, call `useAdminProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminProgramsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminProgramsQuery(baseOptions?: Apollo.QueryHookOptions<AdminProgramsQuery, AdminProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminProgramsQuery, AdminProgramsQueryVariables>(AdminProgramsDocument, options);
      }
export function useAdminProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminProgramsQuery, AdminProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminProgramsQuery, AdminProgramsQueryVariables>(AdminProgramsDocument, options);
        }
export type AdminProgramsQueryHookResult = ReturnType<typeof useAdminProgramsQuery>;
export type AdminProgramsLazyQueryHookResult = ReturnType<typeof useAdminProgramsLazyQuery>;
export type AdminProgramsQueryResult = Apollo.QueryResult<AdminProgramsQuery, AdminProgramsQueryVariables>;
export const ModifyProgramDocument = gql`
    mutation ModifyProgram($programId: Int!, $programInput: ProgramInput!) {
  modifyProgram(programId: $programId, programInput: $programInput) {
    id
  }
}
    `;
export type ModifyProgramMutationFn = Apollo.MutationFunction<ModifyProgramMutation, ModifyProgramMutationVariables>;

/**
 * __useModifyProgramMutation__
 *
 * To run a mutation, you first call `useModifyProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyProgramMutation, { data, loading, error }] = useModifyProgramMutation({
 *   variables: {
 *      programId: // value for 'programId'
 *      programInput: // value for 'programInput'
 *   },
 * });
 */
export function useModifyProgramMutation(baseOptions?: Apollo.MutationHookOptions<ModifyProgramMutation, ModifyProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyProgramMutation, ModifyProgramMutationVariables>(ModifyProgramDocument, options);
      }
export type ModifyProgramMutationHookResult = ReturnType<typeof useModifyProgramMutation>;
export type ModifyProgramMutationResult = Apollo.MutationResult<ModifyProgramMutation>;
export type ModifyProgramMutationOptions = Apollo.BaseMutationOptions<ModifyProgramMutation, ModifyProgramMutationVariables>;
export const CreateProgramDocument = gql`
    mutation CreateProgram($programInput: ProgramInput!) {
  createProgram(programInput: $programInput) {
    id
  }
}
    `;
export type CreateProgramMutationFn = Apollo.MutationFunction<CreateProgramMutation, CreateProgramMutationVariables>;

/**
 * __useCreateProgramMutation__
 *
 * To run a mutation, you first call `useCreateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramMutation, { data, loading, error }] = useCreateProgramMutation({
 *   variables: {
 *      programInput: // value for 'programInput'
 *   },
 * });
 */
export function useCreateProgramMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramMutation, CreateProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProgramMutation, CreateProgramMutationVariables>(CreateProgramDocument, options);
      }
export type CreateProgramMutationHookResult = ReturnType<typeof useCreateProgramMutation>;
export type CreateProgramMutationResult = Apollo.MutationResult<CreateProgramMutation>;
export type CreateProgramMutationOptions = Apollo.BaseMutationOptions<CreateProgramMutation, CreateProgramMutationVariables>;
export const AdminRatingsDocument = gql`
    query AdminRatings($pagination: Pagination) {
  adminRatings(pagination: $pagination) {
    id
    userId
    modelType
    modelId
    notes
    createdAt
    ratingChallenge
    ratingChallengeScale
    ratingPerformance
    ratingPerformanceScale
    ratingEffort
    ratingEffortScale
    ratingOverall
    ratingOverallScale
    experiencedImprovement
  }
}
    `;

/**
 * __useAdminRatingsQuery__
 *
 * To run a query within a React component, call `useAdminRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminRatingsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminRatingsQuery(baseOptions?: Apollo.QueryHookOptions<AdminRatingsQuery, AdminRatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminRatingsQuery, AdminRatingsQueryVariables>(AdminRatingsDocument, options);
      }
export function useAdminRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminRatingsQuery, AdminRatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminRatingsQuery, AdminRatingsQueryVariables>(AdminRatingsDocument, options);
        }
export type AdminRatingsQueryHookResult = ReturnType<typeof useAdminRatingsQuery>;
export type AdminRatingsLazyQueryHookResult = ReturnType<typeof useAdminRatingsLazyQuery>;
export type AdminRatingsQueryResult = Apollo.QueryResult<AdminRatingsQuery, AdminRatingsQueryVariables>;
export const WorkoutDocument = gql`
    query Workout($workoutId: Int!) {
  workout(workoutId: $workoutId) {
    id
    name
    week
    order
    skillLevel
    archived
    createdAt
    programId
    programFacetId
    programFacet {
      id
      name
      program {
        id
        name
      }
    }
    circuits {
      id
      name
      order
      archived
      createdAt
      programId
      programFacetId
      workoutId
      exercises {
        id
        name
        order
        videoUrl
        restDurationSeconds
        description
        archived
        createdAt
        exerciseSets {
          id
          order
          durationSeconds
          repCount
          weight
          distance
          percentageMax
          repsAvailable
          maxPercAvailable
          weightRelative
          weightUnit
          archived
          createdAt
        }
      }
    }
  }
}
    `;

/**
 * __useWorkoutQuery__
 *
 * To run a query within a React component, call `useWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutQuery({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useWorkoutQuery(baseOptions: Apollo.QueryHookOptions<WorkoutQuery, WorkoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutQuery, WorkoutQueryVariables>(WorkoutDocument, options);
      }
export function useWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutQuery, WorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutQuery, WorkoutQueryVariables>(WorkoutDocument, options);
        }
export type WorkoutQueryHookResult = ReturnType<typeof useWorkoutQuery>;
export type WorkoutLazyQueryHookResult = ReturnType<typeof useWorkoutLazyQuery>;
export type WorkoutQueryResult = Apollo.QueryResult<WorkoutQuery, WorkoutQueryVariables>;
export const ModifyCircuitDocument = gql`
    mutation ModifyCircuit($circuitId: Int!, $circuitInput: CircuitInput!) {
  modifyCircuit(circuitId: $circuitId, circuitInput: $circuitInput) {
    id
  }
}
    `;
export type ModifyCircuitMutationFn = Apollo.MutationFunction<ModifyCircuitMutation, ModifyCircuitMutationVariables>;

/**
 * __useModifyCircuitMutation__
 *
 * To run a mutation, you first call `useModifyCircuitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyCircuitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyCircuitMutation, { data, loading, error }] = useModifyCircuitMutation({
 *   variables: {
 *      circuitId: // value for 'circuitId'
 *      circuitInput: // value for 'circuitInput'
 *   },
 * });
 */
export function useModifyCircuitMutation(baseOptions?: Apollo.MutationHookOptions<ModifyCircuitMutation, ModifyCircuitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyCircuitMutation, ModifyCircuitMutationVariables>(ModifyCircuitDocument, options);
      }
export type ModifyCircuitMutationHookResult = ReturnType<typeof useModifyCircuitMutation>;
export type ModifyCircuitMutationResult = Apollo.MutationResult<ModifyCircuitMutation>;
export type ModifyCircuitMutationOptions = Apollo.BaseMutationOptions<ModifyCircuitMutation, ModifyCircuitMutationVariables>;
export const CreateCircuitDocument = gql`
    mutation CreateCircuit($circuitInput: CircuitInput!) {
  createCircuit(circuitInput: $circuitInput) {
    id
  }
}
    `;
export type CreateCircuitMutationFn = Apollo.MutationFunction<CreateCircuitMutation, CreateCircuitMutationVariables>;

/**
 * __useCreateCircuitMutation__
 *
 * To run a mutation, you first call `useCreateCircuitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCircuitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCircuitMutation, { data, loading, error }] = useCreateCircuitMutation({
 *   variables: {
 *      circuitInput: // value for 'circuitInput'
 *   },
 * });
 */
export function useCreateCircuitMutation(baseOptions?: Apollo.MutationHookOptions<CreateCircuitMutation, CreateCircuitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCircuitMutation, CreateCircuitMutationVariables>(CreateCircuitDocument, options);
      }
export type CreateCircuitMutationHookResult = ReturnType<typeof useCreateCircuitMutation>;
export type CreateCircuitMutationResult = Apollo.MutationResult<CreateCircuitMutation>;
export type CreateCircuitMutationOptions = Apollo.BaseMutationOptions<CreateCircuitMutation, CreateCircuitMutationVariables>;
export const ModifyExerciseDocument = gql`
    mutation ModifyExercise($exerciseId: Int!, $exerciseInput: ExerciseInput!) {
  modifyExercise(exerciseId: $exerciseId, exerciseInput: $exerciseInput) {
    id
  }
}
    `;
export type ModifyExerciseMutationFn = Apollo.MutationFunction<ModifyExerciseMutation, ModifyExerciseMutationVariables>;

/**
 * __useModifyExerciseMutation__
 *
 * To run a mutation, you first call `useModifyExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyExerciseMutation, { data, loading, error }] = useModifyExerciseMutation({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *      exerciseInput: // value for 'exerciseInput'
 *   },
 * });
 */
export function useModifyExerciseMutation(baseOptions?: Apollo.MutationHookOptions<ModifyExerciseMutation, ModifyExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyExerciseMutation, ModifyExerciseMutationVariables>(ModifyExerciseDocument, options);
      }
export type ModifyExerciseMutationHookResult = ReturnType<typeof useModifyExerciseMutation>;
export type ModifyExerciseMutationResult = Apollo.MutationResult<ModifyExerciseMutation>;
export type ModifyExerciseMutationOptions = Apollo.BaseMutationOptions<ModifyExerciseMutation, ModifyExerciseMutationVariables>;
export const CreateExerciseDocument = gql`
    mutation CreateExercise($exerciseInput: ExerciseInput!) {
  createExercise(exerciseInput: $exerciseInput) {
    id
  }
}
    `;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      exerciseInput: // value for 'exerciseInput'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const ModifyExerciseSetDocument = gql`
    mutation ModifyExerciseSet($exerciseSetId: Int!, $exerciseSetInput: ExerciseSetInput!) {
  modifyExerciseSet(
    exerciseSetId: $exerciseSetId
    exerciseSetInput: $exerciseSetInput
  ) {
    id
  }
}
    `;
export type ModifyExerciseSetMutationFn = Apollo.MutationFunction<ModifyExerciseSetMutation, ModifyExerciseSetMutationVariables>;

/**
 * __useModifyExerciseSetMutation__
 *
 * To run a mutation, you first call `useModifyExerciseSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyExerciseSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyExerciseSetMutation, { data, loading, error }] = useModifyExerciseSetMutation({
 *   variables: {
 *      exerciseSetId: // value for 'exerciseSetId'
 *      exerciseSetInput: // value for 'exerciseSetInput'
 *   },
 * });
 */
export function useModifyExerciseSetMutation(baseOptions?: Apollo.MutationHookOptions<ModifyExerciseSetMutation, ModifyExerciseSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyExerciseSetMutation, ModifyExerciseSetMutationVariables>(ModifyExerciseSetDocument, options);
      }
export type ModifyExerciseSetMutationHookResult = ReturnType<typeof useModifyExerciseSetMutation>;
export type ModifyExerciseSetMutationResult = Apollo.MutationResult<ModifyExerciseSetMutation>;
export type ModifyExerciseSetMutationOptions = Apollo.BaseMutationOptions<ModifyExerciseSetMutation, ModifyExerciseSetMutationVariables>;
export const CreateExerciseSetDocument = gql`
    mutation CreateExerciseSet($exerciseSetInput: ExerciseSetInput!) {
  createExerciseSet(exerciseSetInput: $exerciseSetInput) {
    id
  }
}
    `;
export type CreateExerciseSetMutationFn = Apollo.MutationFunction<CreateExerciseSetMutation, CreateExerciseSetMutationVariables>;

/**
 * __useCreateExerciseSetMutation__
 *
 * To run a mutation, you first call `useCreateExerciseSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseSetMutation, { data, loading, error }] = useCreateExerciseSetMutation({
 *   variables: {
 *      exerciseSetInput: // value for 'exerciseSetInput'
 *   },
 * });
 */
export function useCreateExerciseSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseSetMutation, CreateExerciseSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseSetMutation, CreateExerciseSetMutationVariables>(CreateExerciseSetDocument, options);
      }
export type CreateExerciseSetMutationHookResult = ReturnType<typeof useCreateExerciseSetMutation>;
export type CreateExerciseSetMutationResult = Apollo.MutationResult<CreateExerciseSetMutation>;
export type CreateExerciseSetMutationOptions = Apollo.BaseMutationOptions<CreateExerciseSetMutation, CreateExerciseSetMutationVariables>;
export const CreateCircuitsByXlsxDocument = gql`
    mutation CreateCircuitsByXlsx($createCircuitsByXlsxInput: CreateCircuitsByXlsxInput!) {
  createCircuitsByXlsx(createCircuitsByXlsxInput: $createCircuitsByXlsxInput) {
    success
  }
}
    `;
export type CreateCircuitsByXlsxMutationFn = Apollo.MutationFunction<CreateCircuitsByXlsxMutation, CreateCircuitsByXlsxMutationVariables>;

/**
 * __useCreateCircuitsByXlsxMutation__
 *
 * To run a mutation, you first call `useCreateCircuitsByXlsxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCircuitsByXlsxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCircuitsByXlsxMutation, { data, loading, error }] = useCreateCircuitsByXlsxMutation({
 *   variables: {
 *      createCircuitsByXlsxInput: // value for 'createCircuitsByXlsxInput'
 *   },
 * });
 */
export function useCreateCircuitsByXlsxMutation(baseOptions?: Apollo.MutationHookOptions<CreateCircuitsByXlsxMutation, CreateCircuitsByXlsxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCircuitsByXlsxMutation, CreateCircuitsByXlsxMutationVariables>(CreateCircuitsByXlsxDocument, options);
      }
export type CreateCircuitsByXlsxMutationHookResult = ReturnType<typeof useCreateCircuitsByXlsxMutation>;
export type CreateCircuitsByXlsxMutationResult = Apollo.MutationResult<CreateCircuitsByXlsxMutation>;
export type CreateCircuitsByXlsxMutationOptions = Apollo.BaseMutationOptions<CreateCircuitsByXlsxMutation, CreateCircuitsByXlsxMutationVariables>;
export const ModifyProgramFacetDocument = gql`
    mutation ModifyProgramFacet($programFacetId: Int!, $programFacetInput: ProgramFacetInput!) {
  modifyProgramFacet(
    programFacetId: $programFacetId
    programFacetInput: $programFacetInput
  ) {
    id
  }
}
    `;
export type ModifyProgramFacetMutationFn = Apollo.MutationFunction<ModifyProgramFacetMutation, ModifyProgramFacetMutationVariables>;

/**
 * __useModifyProgramFacetMutation__
 *
 * To run a mutation, you first call `useModifyProgramFacetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyProgramFacetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyProgramFacetMutation, { data, loading, error }] = useModifyProgramFacetMutation({
 *   variables: {
 *      programFacetId: // value for 'programFacetId'
 *      programFacetInput: // value for 'programFacetInput'
 *   },
 * });
 */
export function useModifyProgramFacetMutation(baseOptions?: Apollo.MutationHookOptions<ModifyProgramFacetMutation, ModifyProgramFacetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyProgramFacetMutation, ModifyProgramFacetMutationVariables>(ModifyProgramFacetDocument, options);
      }
export type ModifyProgramFacetMutationHookResult = ReturnType<typeof useModifyProgramFacetMutation>;
export type ModifyProgramFacetMutationResult = Apollo.MutationResult<ModifyProgramFacetMutation>;
export type ModifyProgramFacetMutationOptions = Apollo.BaseMutationOptions<ModifyProgramFacetMutation, ModifyProgramFacetMutationVariables>;
export const CreateProgramFacetDocument = gql`
    mutation CreateProgramFacet($programFacetInput: ProgramFacetInput!) {
  createProgramFacet(programFacetInput: $programFacetInput) {
    id
  }
}
    `;
export type CreateProgramFacetMutationFn = Apollo.MutationFunction<CreateProgramFacetMutation, CreateProgramFacetMutationVariables>;

/**
 * __useCreateProgramFacetMutation__
 *
 * To run a mutation, you first call `useCreateProgramFacetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramFacetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramFacetMutation, { data, loading, error }] = useCreateProgramFacetMutation({
 *   variables: {
 *      programFacetInput: // value for 'programFacetInput'
 *   },
 * });
 */
export function useCreateProgramFacetMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramFacetMutation, CreateProgramFacetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProgramFacetMutation, CreateProgramFacetMutationVariables>(CreateProgramFacetDocument, options);
      }
export type CreateProgramFacetMutationHookResult = ReturnType<typeof useCreateProgramFacetMutation>;
export type CreateProgramFacetMutationResult = Apollo.MutationResult<CreateProgramFacetMutation>;
export type CreateProgramFacetMutationOptions = Apollo.BaseMutationOptions<CreateProgramFacetMutation, CreateProgramFacetMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    token
    user {
      ...CurrentUserFields
    }
  }
}
    ${CurrentUserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($phoneNumber: String!, $password: String!) {
  login(phoneNumber: $phoneNumber, password: $password) {
    token
    user {
      ...CurrentUserFields
    }
  }
}
    ${CurrentUserFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($userInput: UserInput!) {
  register(userInput: $userInput) {
    token
    user {
      ...CurrentUserFields
    }
  }
}
    ${CurrentUserFieldsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AdminModifyUserDocument = gql`
    mutation AdminModifyUser($userId: String, $modifyUserInput: AdminModifyUserInput!) {
  adminModifyUser(modifyUserInput: $modifyUserInput, userId: $userId) {
    ...GenericUserFields
  }
}
    ${GenericUserFieldsFragmentDoc}`;
export type AdminModifyUserMutationFn = Apollo.MutationFunction<AdminModifyUserMutation, AdminModifyUserMutationVariables>;

/**
 * __useAdminModifyUserMutation__
 *
 * To run a mutation, you first call `useAdminModifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminModifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminModifyUserMutation, { data, loading, error }] = useAdminModifyUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      modifyUserInput: // value for 'modifyUserInput'
 *   },
 * });
 */
export function useAdminModifyUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminModifyUserMutation, AdminModifyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminModifyUserMutation, AdminModifyUserMutationVariables>(AdminModifyUserDocument, options);
      }
export type AdminModifyUserMutationHookResult = ReturnType<typeof useAdminModifyUserMutation>;
export type AdminModifyUserMutationResult = Apollo.MutationResult<AdminModifyUserMutation>;
export type AdminModifyUserMutationOptions = Apollo.BaseMutationOptions<AdminModifyUserMutation, AdminModifyUserMutationVariables>;