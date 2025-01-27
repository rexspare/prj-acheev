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
  historyMessageId?: InputMaybe<Scalars['Int']>;
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
  sender: User;
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

export type FavoritesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  modelType?: InputMaybe<FavoriteModelType>;
}>;


export type FavoritesQuery = { __typename?: 'Query', favorites: Array<{ __typename?: 'Favorite', id: number, modelType: string, modelId: number }> };

export type FavoriteWorkoutsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type FavoriteWorkoutsQuery = { __typename?: 'Query', favoriteWorkouts: Array<{ __typename?: 'Workout', id: number, programId: number, programFacetId: number, skillLevel: SkillLevel, name: string, completedAt?: any | undefined, startedAt?: any | undefined, imageUrl: string, week: number, order: number, durationMinutes: number, isFavorited: boolean, isCompleted: boolean, programFacet: { __typename?: 'ProgramFacet', id: number, name: string, program: { __typename?: 'Program', id: number, name: string } } }> };

export type FavoriteProgramFacetsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type FavoriteProgramFacetsQuery = { __typename?: 'Query', favoriteProgramFacets: Array<{ __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, isFavorited: boolean, description?: string | undefined, equipmentNeeded?: string | undefined, videoUrl?: string | undefined, goals?: string | undefined, program: { __typename?: 'Program', id: number, name: string } }> };

export type SubmitRatingMutationVariables = Exact<{
  ratingInput: RatingInput;
}>;


export type SubmitRatingMutation = { __typename?: 'Mutation', submitRating: boolean };

export type ProgramSearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type ProgramSearchQuery = { __typename?: 'Query', programSearch: Array<{ __typename?: 'Program', id: number, name: string, imageUrl: string, live: boolean, archived: boolean }> };

export type ForgotPasswordRequestMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type ForgotPasswordRequestMutation = { __typename?: 'Mutation', forgotPasswordRequest: boolean };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordToken: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'PublicUser', id: string, fullName: string, imageUrl?: string | undefined, location?: string | undefined } };

export type SubmitFeedbackMutationVariables = Exact<{
  feedbackInput: FeedbackInput;
}>;


export type SubmitFeedbackMutation = { __typename?: 'Mutation', submitFeedback: boolean };

export type WeightStatsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type WeightStatsQuery = { __typename?: 'Query', weightStats: Array<{ __typename?: 'WeightStat', id: number, weight: number, date: any, imageUrl?: string | undefined }> };

export type UpdateWeightMutationVariables = Exact<{
  weightStatId?: InputMaybe<Scalars['Int']>;
  updateWeightInput: UpdateWeightInput;
}>;


export type UpdateWeightMutation = { __typename?: 'Mutation', updateWeight: { __typename?: 'WeightStat', id: number } };

export type CurrentUserFieldsFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, private: boolean, createdAt?: any | undefined, birthday?: any | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, notifications: boolean, location?: string | undefined, imageUrl?: string | undefined };

export type GenericUserFieldsFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string };

export type GenericPublicUserFragment = { __typename?: 'PublicUser', id: string, imageUrl?: string | undefined, location?: string | undefined, fullName: string };

export type LoginMutationVariables = Exact<{
  phoneNumber?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, private: boolean, createdAt?: any | undefined, birthday?: any | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, notifications: boolean, location?: string | undefined, imageUrl?: string | undefined } } };

export type RegisterMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, private: boolean, createdAt?: any | undefined, birthday?: any | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, notifications: boolean, location?: string | undefined, imageUrl?: string | undefined } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, private: boolean, createdAt?: any | undefined, birthday?: any | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, notifications: boolean, location?: string | undefined, imageUrl?: string | undefined } } | undefined };

export type ModifyUserMutationVariables = Exact<{
  modifyUserInput: ModifyUserInput;
  userId?: InputMaybe<Scalars['String']>;
}>;


export type ModifyUserMutation = { __typename?: 'Mutation', modifyUser: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, private: boolean, createdAt?: any | undefined, birthday?: any | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, notifications: boolean, location?: string | undefined, imageUrl?: string | undefined } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ProgramFieldsFragment = { __typename?: 'Program', id: number, name: string, imageUrl: string, live: boolean, archived: boolean };

export type ProgramListFieldsFragment = { __typename?: 'ProgramList', id: number, name: string, programs: Array<{ __typename?: 'Program', id: number, name: string, imageUrl: string, live: boolean, archived: boolean }> };

export type ProgramFacetFieldsFragment = { __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, description?: string | undefined, equipmentNeeded?: string | undefined, videoUrl?: string | undefined, goals?: string | undefined, live: boolean, archived: boolean };

export type ProgramListingFieldsFragment = { __typename?: 'Program', id: number, name: string, imageUrl: string, live: boolean, archived: boolean, programFacets: Array<{ __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, description?: string | undefined, equipmentNeeded?: string | undefined, videoUrl?: string | undefined, goals?: string | undefined, live: boolean, archived: boolean }> };

export type ProgramFacetListingFieldsFragment = { __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, isFavorited: boolean, description?: string | undefined, equipmentNeeded?: string | undefined, videoUrl?: string | undefined, goals?: string | undefined, program: { __typename?: 'Program', id: number, name: string } };

export type ProgramListsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProgramListsQuery = { __typename?: 'Query', programLists: Array<{ __typename?: 'ProgramList', id: number, name: string, programs: Array<{ __typename?: 'Program', id: number, name: string, imageUrl: string, live: boolean, archived: boolean }> }> };

export type ProgramQueryVariables = Exact<{
  programId: Scalars['Int'];
}>;


export type ProgramQuery = { __typename?: 'Query', program: { __typename?: 'Program', id: number, name: string, imageUrl: string, live: boolean, archived: boolean, programFacets: Array<{ __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, description?: string | undefined, equipmentNeeded?: string | undefined, videoUrl?: string | undefined, goals?: string | undefined, live: boolean, archived: boolean }> } };

export type ProgramFacetQueryVariables = Exact<{
  programFacetId: Scalars['Int'];
}>;


export type ProgramFacetQuery = { __typename?: 'Query', programFacet: { __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, isFavorited: boolean, description?: string | undefined, equipmentNeeded?: string | undefined, videoUrl?: string | undefined, goals?: string | undefined, program: { __typename?: 'Program', id: number, name: string } } };

export type ProgramFacetStatsQueryVariables = Exact<{
  programFacetId: Scalars['Int'];
  skillLevel: SkillLevel;
}>;


export type ProgramFacetStatsQuery = { __typename?: 'Query', programFacetStats: { __typename?: 'ProgramFacetStats', weekCount: number, workoutCount: number, workoutLength: string } };

export type WorkoutFieldsFragment = { __typename?: 'Workout', id: number, programId: number, programFacetId: number, skillLevel: SkillLevel, name: string, completedAt?: any | undefined, startedAt?: any | undefined, imageUrl: string, week: number, order: number, durationMinutes: number, isFavorited: boolean, isCompleted: boolean };

export type WorkoutsQueryVariables = Exact<{
  programFacetId: Scalars['Int'];
  skillLevel: SkillLevel;
}>;


export type WorkoutsQuery = { __typename?: 'Query', workouts: Array<{ __typename?: 'Workout', id: number, programId: number, programFacetId: number, skillLevel: SkillLevel, name: string, completedAt?: any | undefined, startedAt?: any | undefined, imageUrl: string, week: number, order: number, durationMinutes: number, isFavorited: boolean, isCompleted: boolean }> };

export type CircuitFieldsFragment = { __typename?: 'Circuit', id: number, name: string, workoutId: number, completedAt?: any | undefined, startedAt?: any | undefined, order: number, exercises: Array<{ __typename?: 'Exercise', id: number, name: string, videoUrl: string, restDurationSeconds: number, description: string, order: number, exerciseSets: Array<{ __typename?: 'ExerciseSet', id: number, exerciseId: number, durationSeconds: number, repCount?: number | undefined, weight: number, distance?: number | undefined, percentageMax?: number | undefined, repsAvailable?: boolean | undefined, weightUnit: WeightUnit, templateId?: number | undefined, order: number, archived: boolean, maxPercAvailable?: boolean | undefined, weightRelative: boolean }> }> };

export type WorkoutQueryVariables = Exact<{
  workoutId: Scalars['Int'];
}>;


export type WorkoutQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', id: number, programId: number, programFacetId: number, skillLevel: SkillLevel, name: string, completedAt?: any | undefined, startedAt?: any | undefined, imageUrl: string, week: number, order: number, durationMinutes: number, isFavorited: boolean, isCompleted: boolean, circuits: Array<{ __typename?: 'Circuit', id: number, name: string, workoutId: number, completedAt?: any | undefined, startedAt?: any | undefined, order: number, exercises: Array<{ __typename?: 'Exercise', id: number, name: string, videoUrl: string, restDurationSeconds: number, description: string, order: number, exerciseSets: Array<{ __typename?: 'ExerciseSet', id: number, exerciseId: number, durationSeconds: number, repCount?: number | undefined, weight: number, distance?: number | undefined, percentageMax?: number | undefined, repsAvailable?: boolean | undefined, weightUnit: WeightUnit, templateId?: number | undefined, order: number, archived: boolean, maxPercAvailable?: boolean | undefined, weightRelative: boolean }> }> }> } };

export type FavoriteMutationVariables = Exact<{
  modelId: Scalars['String'];
  modelType: FavoriteModelType;
}>;


export type FavoriteMutation = { __typename?: 'Mutation', favorite: { __typename?: 'Favorite', id: number } };

export type CompleteMutationVariables = Exact<{
  completionInput: CompletionInput;
}>;


export type CompleteMutation = { __typename?: 'Mutation', complete: { __typename?: 'Completion', id: number } };

export type CompletionsQueryVariables = Exact<{
  modelType?: InputMaybe<CompletionModelType>;
  modelId?: InputMaybe<Scalars['Int']>;
  parentModelType?: InputMaybe<CompletionModelType>;
  parentModelId?: InputMaybe<Scalars['Int']>;
}>;


export type CompletionsQuery = { __typename?: 'Query', completions: Array<{ __typename?: 'Completion', id: number, modelId: number, modelType: string, parentModelId?: number | undefined, parentModelType?: string | undefined, completedAt: any }> };

export type CreateOrModifyExerciseSetMutationVariables = Exact<{
  createOrModifyExerciseSetInput: CreateOrModifyExerciseSetInput;
}>;


export type CreateOrModifyExerciseSetMutation = { __typename?: 'Mutation', createOrModifyExerciseSet: { __typename?: 'ExerciseSet', id: number } };

export type InProgressProgramFacetsQueryVariables = Exact<{ [key: string]: never; }>;


export type InProgressProgramFacetsQuery = { __typename?: 'Query', inProgressProgramFacets: Array<{ __typename?: 'ProgramFacet', id: number, name: string, imageUrl: string, order: number, description?: string | undefined, equipmentNeeded?: string | undefined, videoUrl?: string | undefined, goals?: string | undefined, live: boolean, archived: boolean, program: { __typename?: 'Program', id: number, name: string } }> };

export type RequestOtpMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp: boolean };

export type VerifyOtpMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
  otp: Scalars['String'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, email?: string | undefined, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, private: boolean, createdAt?: any | undefined, birthday?: any | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, notifications: boolean, location?: string | undefined, imageUrl?: string | undefined } } };

export type CreateExerciseHistoryMutationVariables = Exact<{
  exerciseSetHistoryInput: ExerciseSetHistoryInput;
}>;


export type CreateExerciseHistoryMutation = { __typename?: 'Mutation', createExerciseSetHistory: { __typename?: 'ExerciseSetHistory', id: number, programId: number, programFacetId: number, workoutId: number, circuitId: number, exerciseId: number, exerciseSetId: number, userId: number, createdAt: any, updatedAt: any } };

export type GetExerciseHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExerciseHistoryQuery = { __typename?: 'Query', exerciseSetHistory: Array<{ __typename?: 'ExerciseSetHistory', id: number, programId: number, programFacetId: number, workoutId: number, circuitId: number, exerciseId: number, exerciseSetId: number, userId: number, createdAt: any, updatedAt: any } | undefined> };

export type GetProgramMessagesQueryVariables = Exact<{
  programId: Scalars['Int'];
  pagination?: InputMaybe<Pagination>;
  historyMessageId?: InputMaybe<Scalars['Int']>;
}>;


export type GetProgramMessagesQuery = { __typename?: 'Query', getProgramMessages: { __typename?: 'ProgramMessagesResponse', data: Array<{ __typename?: 'ChatMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }, replyTo?: { __typename?: 'ReplyToMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean } } | undefined, readBy: Array<{ __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }> }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type SendMessageMutationVariables = Exact<{
  programId: Scalars['Int'];
  replyToId?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
  mediaType?: InputMaybe<Scalars['String']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'ChatMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }, replyTo?: { __typename?: 'ReplyToMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean } } | undefined, readBy: Array<{ __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }> } };

export type EditMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
  mediaType?: InputMaybe<Scalars['String']>;
}>;


export type EditMessageMutation = { __typename?: 'Mutation', editMessage: { __typename?: 'ChatMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }, replyTo?: { __typename?: 'ReplyToMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean } } | undefined, readBy: Array<{ __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }> } };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'ChatMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }, replyTo?: { __typename?: 'ReplyToMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean } } | undefined, readBy: Array<{ __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }> } };

export type SubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'ChatMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }, replyTo?: { __typename?: 'ReplyToMessage', id: number, senderId: string, programId: number, replyToId?: number | undefined, text?: string | undefined, mediaUrl?: string | undefined, mediaType?: string | undefined, isEdited: boolean, isDeleted: boolean, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean } } | undefined, readBy: Array<{ __typename?: 'User', id: string, email?: string | undefined, title?: string | undefined, firstName: string, lastName: string, fullName: string, phoneNumber: string, iosPushToken?: string | undefined, androidPushToken?: string | undefined, weightUnit: WeightUnit, skillLevel: SkillLevel, location?: string | undefined, imageUrl?: string | undefined, birthday?: any | undefined, admin: boolean, restrictedAdmin: boolean, verified: boolean, private: boolean, newsletter: boolean, notifications: boolean, createdAt?: any | undefined, isCoach: boolean }> } };

export type SignUrlQueryVariables = Exact<{
  objectName: Scalars['String'];
  contentType: Scalars['String'];
}>;


export type SignUrlQuery = { __typename?: 'Query', signUrl: { __typename?: 'S3SignResponse', signedUrl: string, publicUrl: string, fileName: string, fileKey: string } };

export type DeleteS3ObjectMutationVariables = Exact<{
  fileKey: Scalars['String'];
}>;


export type DeleteS3ObjectMutation = { __typename?: 'Mutation', deleteS3Object: { __typename?: 'S3DeleteResponse', success: boolean, message: string } };

export const CurrentUserFieldsFragmentDoc = gql`
    fragment CurrentUserFields on User {
  id
  firstName
  lastName
  fullName
  email
  phoneNumber
  iosPushToken
  androidPushToken
  private
  createdAt
  birthday
  weightUnit
  skillLevel
  notifications
  location
  imageUrl
}
    `;
export const GenericUserFieldsFragmentDoc = gql`
    fragment GenericUserFields on User {
  id
  firstName
  lastName
  fullName
  email
  phoneNumber
}
    `;
export const GenericPublicUserFragmentDoc = gql`
    fragment GenericPublicUser on PublicUser {
  id
  imageUrl
  location
  fullName
}
    `;
export const ProgramFieldsFragmentDoc = gql`
    fragment ProgramFields on Program {
  id
  name
  imageUrl
  live
  archived
}
    `;
export const ProgramListFieldsFragmentDoc = gql`
    fragment ProgramListFields on ProgramList {
  id
  name
  programs {
    ...ProgramFields
  }
}
    ${ProgramFieldsFragmentDoc}`;
export const ProgramFacetFieldsFragmentDoc = gql`
    fragment ProgramFacetFields on ProgramFacet {
  id
  name
  imageUrl
  order
  description
  equipmentNeeded
  videoUrl
  goals
  live
  archived
}
    `;
export const ProgramListingFieldsFragmentDoc = gql`
    fragment ProgramListingFields on Program {
  id
  name
  imageUrl
  live
  archived
  programFacets {
    ...ProgramFacetFields
  }
}
    ${ProgramFacetFieldsFragmentDoc}`;
export const ProgramFacetListingFieldsFragmentDoc = gql`
    fragment ProgramFacetListingFields on ProgramFacet {
  id
  name
  imageUrl
  order
  isFavorited
  description
  equipmentNeeded
  videoUrl
  goals
  program {
    id
    name
  }
}
    `;
export const WorkoutFieldsFragmentDoc = gql`
    fragment WorkoutFields on Workout {
  id
  programId
  programFacetId
  skillLevel
  name
  completedAt
  startedAt
  imageUrl
  week
  order
  durationMinutes
  isFavorited
  isCompleted
}
    `;
export const CircuitFieldsFragmentDoc = gql`
    fragment CircuitFields on Circuit {
  id
  name
  workoutId
  completedAt
  startedAt
  order
  exercises {
    id
    name
    videoUrl
    restDurationSeconds
    description
    order
    exerciseSets {
      id
      exerciseId
      durationSeconds
      repCount
      weight
      distance
      percentageMax
      repsAvailable
      weightUnit
      templateId
      order
      archived
      maxPercAvailable
      weightRelative
    }
  }
}
    `;
export const FavoritesDocument = gql`
    query Favorites($userId: String, $modelType: FavoriteModelType) {
  favorites(userId: $userId, modelType: $modelType) {
    id
    modelType
    modelId
  }
}
    `;

/**
 * __useFavoritesQuery__
 *
 * To run a query within a React component, call `useFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoritesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      modelType: // value for 'modelType'
 *   },
 * });
 */
export function useFavoritesQuery(baseOptions?: Apollo.QueryHookOptions<FavoritesQuery, FavoritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoritesQuery, FavoritesQueryVariables>(FavoritesDocument, options);
      }
export function useFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoritesQuery, FavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoritesQuery, FavoritesQueryVariables>(FavoritesDocument, options);
        }
export type FavoritesQueryHookResult = ReturnType<typeof useFavoritesQuery>;
export type FavoritesLazyQueryHookResult = ReturnType<typeof useFavoritesLazyQuery>;
export type FavoritesQueryResult = Apollo.QueryResult<FavoritesQuery, FavoritesQueryVariables>;
export const FavoriteWorkoutsDocument = gql`
    query FavoriteWorkouts($userId: String) {
  favoriteWorkouts(userId: $userId) {
    ...WorkoutFields
    programFacet {
      id
      name
      program {
        id
        name
      }
    }
  }
}
    ${WorkoutFieldsFragmentDoc}`;

/**
 * __useFavoriteWorkoutsQuery__
 *
 * To run a query within a React component, call `useFavoriteWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteWorkoutsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFavoriteWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<FavoriteWorkoutsQuery, FavoriteWorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoriteWorkoutsQuery, FavoriteWorkoutsQueryVariables>(FavoriteWorkoutsDocument, options);
      }
export function useFavoriteWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteWorkoutsQuery, FavoriteWorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoriteWorkoutsQuery, FavoriteWorkoutsQueryVariables>(FavoriteWorkoutsDocument, options);
        }
export type FavoriteWorkoutsQueryHookResult = ReturnType<typeof useFavoriteWorkoutsQuery>;
export type FavoriteWorkoutsLazyQueryHookResult = ReturnType<typeof useFavoriteWorkoutsLazyQuery>;
export type FavoriteWorkoutsQueryResult = Apollo.QueryResult<FavoriteWorkoutsQuery, FavoriteWorkoutsQueryVariables>;
export const FavoriteProgramFacetsDocument = gql`
    query FavoriteProgramFacets($userId: String) {
  favoriteProgramFacets(userId: $userId) {
    ...ProgramFacetListingFields
    program {
      id
      name
    }
  }
}
    ${ProgramFacetListingFieldsFragmentDoc}`;

/**
 * __useFavoriteProgramFacetsQuery__
 *
 * To run a query within a React component, call `useFavoriteProgramFacetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteProgramFacetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteProgramFacetsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFavoriteProgramFacetsQuery(baseOptions?: Apollo.QueryHookOptions<FavoriteProgramFacetsQuery, FavoriteProgramFacetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoriteProgramFacetsQuery, FavoriteProgramFacetsQueryVariables>(FavoriteProgramFacetsDocument, options);
      }
export function useFavoriteProgramFacetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteProgramFacetsQuery, FavoriteProgramFacetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoriteProgramFacetsQuery, FavoriteProgramFacetsQueryVariables>(FavoriteProgramFacetsDocument, options);
        }
export type FavoriteProgramFacetsQueryHookResult = ReturnType<typeof useFavoriteProgramFacetsQuery>;
export type FavoriteProgramFacetsLazyQueryHookResult = ReturnType<typeof useFavoriteProgramFacetsLazyQuery>;
export type FavoriteProgramFacetsQueryResult = Apollo.QueryResult<FavoriteProgramFacetsQuery, FavoriteProgramFacetsQueryVariables>;
export const SubmitRatingDocument = gql`
    mutation SubmitRating($ratingInput: RatingInput!) {
  submitRating(ratingInput: $ratingInput)
}
    `;
export type SubmitRatingMutationFn = Apollo.MutationFunction<SubmitRatingMutation, SubmitRatingMutationVariables>;

/**
 * __useSubmitRatingMutation__
 *
 * To run a mutation, you first call `useSubmitRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitRatingMutation, { data, loading, error }] = useSubmitRatingMutation({
 *   variables: {
 *      ratingInput: // value for 'ratingInput'
 *   },
 * });
 */
export function useSubmitRatingMutation(baseOptions?: Apollo.MutationHookOptions<SubmitRatingMutation, SubmitRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitRatingMutation, SubmitRatingMutationVariables>(SubmitRatingDocument, options);
      }
export type SubmitRatingMutationHookResult = ReturnType<typeof useSubmitRatingMutation>;
export type SubmitRatingMutationResult = Apollo.MutationResult<SubmitRatingMutation>;
export type SubmitRatingMutationOptions = Apollo.BaseMutationOptions<SubmitRatingMutation, SubmitRatingMutationVariables>;
export const ProgramSearchDocument = gql`
    query ProgramSearch($query: String!) {
  programSearch(query: $query) {
    ...ProgramFields
  }
}
    ${ProgramFieldsFragmentDoc}`;

/**
 * __useProgramSearchQuery__
 *
 * To run a query within a React component, call `useProgramSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProgramSearchQuery(baseOptions: Apollo.QueryHookOptions<ProgramSearchQuery, ProgramSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramSearchQuery, ProgramSearchQueryVariables>(ProgramSearchDocument, options);
      }
export function useProgramSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramSearchQuery, ProgramSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramSearchQuery, ProgramSearchQueryVariables>(ProgramSearchDocument, options);
        }
export type ProgramSearchQueryHookResult = ReturnType<typeof useProgramSearchQuery>;
export type ProgramSearchLazyQueryHookResult = ReturnType<typeof useProgramSearchLazyQuery>;
export type ProgramSearchQueryResult = Apollo.QueryResult<ProgramSearchQuery, ProgramSearchQueryVariables>;
export const ForgotPasswordRequestDocument = gql`
    mutation ForgotPasswordRequest($email: String) {
  forgotPasswordRequest(email: $email)
}
    `;
export type ForgotPasswordRequestMutationFn = Apollo.MutationFunction<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>;

/**
 * __useForgotPasswordRequestMutation__
 *
 * To run a mutation, you first call `useForgotPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordRequestMutation, { data, loading, error }] = useForgotPasswordRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordRequestMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>(ForgotPasswordRequestDocument, options);
      }
export type ForgotPasswordRequestMutationHookResult = ReturnType<typeof useForgotPasswordRequestMutation>;
export type ForgotPasswordRequestMutationResult = Apollo.MutationResult<ForgotPasswordRequestMutation>;
export type ForgotPasswordRequestMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($resetPasswordToken: String!, $newPassword: String!) {
  resetPassword(
    resetPasswordToken: $resetPasswordToken
    newPassword: $newPassword
  )
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetPasswordToken: // value for 'resetPasswordToken'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UserDocument = gql`
    query User($userId: String!) {
  user(userId: $userId) {
    id
    fullName
    imageUrl
    location
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const SubmitFeedbackDocument = gql`
    mutation SubmitFeedback($feedbackInput: FeedbackInput!) {
  submitFeedback(feedbackInput: $feedbackInput)
}
    `;
export type SubmitFeedbackMutationFn = Apollo.MutationFunction<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>;

/**
 * __useSubmitFeedbackMutation__
 *
 * To run a mutation, you first call `useSubmitFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitFeedbackMutation, { data, loading, error }] = useSubmitFeedbackMutation({
 *   variables: {
 *      feedbackInput: // value for 'feedbackInput'
 *   },
 * });
 */
export function useSubmitFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>(SubmitFeedbackDocument, options);
      }
export type SubmitFeedbackMutationHookResult = ReturnType<typeof useSubmitFeedbackMutation>;
export type SubmitFeedbackMutationResult = Apollo.MutationResult<SubmitFeedbackMutation>;
export type SubmitFeedbackMutationOptions = Apollo.BaseMutationOptions<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>;
export const WeightStatsDocument = gql`
    query WeightStats($pagination: Pagination) {
  weightStats(pagination: $pagination) {
    id
    weight
    date
    imageUrl
  }
}
    `;

/**
 * __useWeightStatsQuery__
 *
 * To run a query within a React component, call `useWeightStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWeightStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWeightStatsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useWeightStatsQuery(baseOptions?: Apollo.QueryHookOptions<WeightStatsQuery, WeightStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WeightStatsQuery, WeightStatsQueryVariables>(WeightStatsDocument, options);
      }
export function useWeightStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WeightStatsQuery, WeightStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WeightStatsQuery, WeightStatsQueryVariables>(WeightStatsDocument, options);
        }
export type WeightStatsQueryHookResult = ReturnType<typeof useWeightStatsQuery>;
export type WeightStatsLazyQueryHookResult = ReturnType<typeof useWeightStatsLazyQuery>;
export type WeightStatsQueryResult = Apollo.QueryResult<WeightStatsQuery, WeightStatsQueryVariables>;
export const UpdateWeightDocument = gql`
    mutation UpdateWeight($weightStatId: Int, $updateWeightInput: UpdateWeightInput!) {
  updateWeight(weightStatId: $weightStatId, updateWeightInput: $updateWeightInput) {
    id
  }
}
    `;
export type UpdateWeightMutationFn = Apollo.MutationFunction<UpdateWeightMutation, UpdateWeightMutationVariables>;

/**
 * __useUpdateWeightMutation__
 *
 * To run a mutation, you first call `useUpdateWeightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWeightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWeightMutation, { data, loading, error }] = useUpdateWeightMutation({
 *   variables: {
 *      weightStatId: // value for 'weightStatId'
 *      updateWeightInput: // value for 'updateWeightInput'
 *   },
 * });
 */
export function useUpdateWeightMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWeightMutation, UpdateWeightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWeightMutation, UpdateWeightMutationVariables>(UpdateWeightDocument, options);
      }
export type UpdateWeightMutationHookResult = ReturnType<typeof useUpdateWeightMutation>;
export type UpdateWeightMutationResult = Apollo.MutationResult<UpdateWeightMutation>;
export type UpdateWeightMutationOptions = Apollo.BaseMutationOptions<UpdateWeightMutation, UpdateWeightMutationVariables>;
export const LoginDocument = gql`
    mutation Login($phoneNumber: String, $password: String!) {
  login(phoneNumber: $phoneNumber, password: $password) {
    user {
      ...CurrentUserFields
    }
    token
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
    user {
      ...CurrentUserFields
    }
    token
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
export const ModifyUserDocument = gql`
    mutation ModifyUser($modifyUserInput: ModifyUserInput!, $userId: String) {
  modifyUser(modifyUserInput: $modifyUserInput, userId: $userId) {
    ...CurrentUserFields
  }
}
    ${CurrentUserFieldsFragmentDoc}`;
export type ModifyUserMutationFn = Apollo.MutationFunction<ModifyUserMutation, ModifyUserMutationVariables>;

/**
 * __useModifyUserMutation__
 *
 * To run a mutation, you first call `useModifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyUserMutation, { data, loading, error }] = useModifyUserMutation({
 *   variables: {
 *      modifyUserInput: // value for 'modifyUserInput'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useModifyUserMutation(baseOptions?: Apollo.MutationHookOptions<ModifyUserMutation, ModifyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyUserMutation, ModifyUserMutationVariables>(ModifyUserDocument, options);
      }
export type ModifyUserMutationHookResult = ReturnType<typeof useModifyUserMutation>;
export type ModifyUserMutationResult = Apollo.MutationResult<ModifyUserMutation>;
export type ModifyUserMutationOptions = Apollo.BaseMutationOptions<ModifyUserMutation, ModifyUserMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePasswordInput: $changePasswordInput)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ProgramListsDocument = gql`
    query ProgramLists {
  programLists {
    ...ProgramListFields
  }
}
    ${ProgramListFieldsFragmentDoc}`;

/**
 * __useProgramListsQuery__
 *
 * To run a query within a React component, call `useProgramListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProgramListsQuery(baseOptions?: Apollo.QueryHookOptions<ProgramListsQuery, ProgramListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramListsQuery, ProgramListsQueryVariables>(ProgramListsDocument, options);
      }
export function useProgramListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramListsQuery, ProgramListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramListsQuery, ProgramListsQueryVariables>(ProgramListsDocument, options);
        }
export type ProgramListsQueryHookResult = ReturnType<typeof useProgramListsQuery>;
export type ProgramListsLazyQueryHookResult = ReturnType<typeof useProgramListsLazyQuery>;
export type ProgramListsQueryResult = Apollo.QueryResult<ProgramListsQuery, ProgramListsQueryVariables>;
export const ProgramDocument = gql`
    query Program($programId: Int!) {
  program(programId: $programId) {
    ...ProgramListingFields
  }
}
    ${ProgramListingFieldsFragmentDoc}`;

/**
 * __useProgramQuery__
 *
 * To run a query within a React component, call `useProgramQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useProgramQuery(baseOptions: Apollo.QueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, options);
      }
export function useProgramLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, options);
        }
export type ProgramQueryHookResult = ReturnType<typeof useProgramQuery>;
export type ProgramLazyQueryHookResult = ReturnType<typeof useProgramLazyQuery>;
export type ProgramQueryResult = Apollo.QueryResult<ProgramQuery, ProgramQueryVariables>;
export const ProgramFacetDocument = gql`
    query ProgramFacet($programFacetId: Int!) {
  programFacet(programFacetId: $programFacetId) {
    ...ProgramFacetListingFields
  }
}
    ${ProgramFacetListingFieldsFragmentDoc}`;

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
export const ProgramFacetStatsDocument = gql`
    query ProgramFacetStats($programFacetId: Int!, $skillLevel: SkillLevel!) {
  programFacetStats(programFacetId: $programFacetId, skillLevel: $skillLevel) {
    weekCount
    workoutCount
    workoutLength
  }
}
    `;

/**
 * __useProgramFacetStatsQuery__
 *
 * To run a query within a React component, call `useProgramFacetStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramFacetStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramFacetStatsQuery({
 *   variables: {
 *      programFacetId: // value for 'programFacetId'
 *      skillLevel: // value for 'skillLevel'
 *   },
 * });
 */
export function useProgramFacetStatsQuery(baseOptions: Apollo.QueryHookOptions<ProgramFacetStatsQuery, ProgramFacetStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramFacetStatsQuery, ProgramFacetStatsQueryVariables>(ProgramFacetStatsDocument, options);
      }
export function useProgramFacetStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramFacetStatsQuery, ProgramFacetStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramFacetStatsQuery, ProgramFacetStatsQueryVariables>(ProgramFacetStatsDocument, options);
        }
export type ProgramFacetStatsQueryHookResult = ReturnType<typeof useProgramFacetStatsQuery>;
export type ProgramFacetStatsLazyQueryHookResult = ReturnType<typeof useProgramFacetStatsLazyQuery>;
export type ProgramFacetStatsQueryResult = Apollo.QueryResult<ProgramFacetStatsQuery, ProgramFacetStatsQueryVariables>;
export const WorkoutsDocument = gql`
    query Workouts($programFacetId: Int!, $skillLevel: SkillLevel!) {
  workouts(programFacetId: $programFacetId, skillLevel: $skillLevel) {
    ...WorkoutFields
  }
}
    ${WorkoutFieldsFragmentDoc}`;

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
export const WorkoutDocument = gql`
    query Workout($workoutId: Int!) {
  workout(workoutId: $workoutId) {
    ...WorkoutFields
    circuits {
      ...CircuitFields
    }
  }
}
    ${WorkoutFieldsFragmentDoc}
${CircuitFieldsFragmentDoc}`;

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
export const FavoriteDocument = gql`
    mutation Favorite($modelId: String!, $modelType: FavoriteModelType!) {
  favorite(modelId: $modelId, modelType: $modelType) {
    id
  }
}
    `;
export type FavoriteMutationFn = Apollo.MutationFunction<FavoriteMutation, FavoriteMutationVariables>;

/**
 * __useFavoriteMutation__
 *
 * To run a mutation, you first call `useFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoriteMutation, { data, loading, error }] = useFavoriteMutation({
 *   variables: {
 *      modelId: // value for 'modelId'
 *      modelType: // value for 'modelType'
 *   },
 * });
 */
export function useFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<FavoriteMutation, FavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavoriteMutation, FavoriteMutationVariables>(FavoriteDocument, options);
      }
export type FavoriteMutationHookResult = ReturnType<typeof useFavoriteMutation>;
export type FavoriteMutationResult = Apollo.MutationResult<FavoriteMutation>;
export type FavoriteMutationOptions = Apollo.BaseMutationOptions<FavoriteMutation, FavoriteMutationVariables>;
export const CompleteDocument = gql`
    mutation Complete($completionInput: CompletionInput!) {
  complete(completionInput: $completionInput) {
    id
  }
}
    `;
export type CompleteMutationFn = Apollo.MutationFunction<CompleteMutation, CompleteMutationVariables>;

/**
 * __useCompleteMutation__
 *
 * To run a mutation, you first call `useCompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeMutation, { data, loading, error }] = useCompleteMutation({
 *   variables: {
 *      completionInput: // value for 'completionInput'
 *   },
 * });
 */
export function useCompleteMutation(baseOptions?: Apollo.MutationHookOptions<CompleteMutation, CompleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteMutation, CompleteMutationVariables>(CompleteDocument, options);
      }
export type CompleteMutationHookResult = ReturnType<typeof useCompleteMutation>;
export type CompleteMutationResult = Apollo.MutationResult<CompleteMutation>;
export type CompleteMutationOptions = Apollo.BaseMutationOptions<CompleteMutation, CompleteMutationVariables>;
export const CompletionsDocument = gql`
    query Completions($modelType: CompletionModelType, $modelId: Int, $parentModelType: CompletionModelType, $parentModelId: Int) {
  completions(
    modelType: $modelType
    modelId: $modelId
    parentModelType: $parentModelType
    parentModelId: $parentModelId
  ) {
    id
    modelId
    modelType
    parentModelId
    parentModelType
    completedAt
  }
}
    `;

/**
 * __useCompletionsQuery__
 *
 * To run a query within a React component, call `useCompletionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletionsQuery({
 *   variables: {
 *      modelType: // value for 'modelType'
 *      modelId: // value for 'modelId'
 *      parentModelType: // value for 'parentModelType'
 *      parentModelId: // value for 'parentModelId'
 *   },
 * });
 */
export function useCompletionsQuery(baseOptions?: Apollo.QueryHookOptions<CompletionsQuery, CompletionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletionsQuery, CompletionsQueryVariables>(CompletionsDocument, options);
      }
export function useCompletionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletionsQuery, CompletionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletionsQuery, CompletionsQueryVariables>(CompletionsDocument, options);
        }
export type CompletionsQueryHookResult = ReturnType<typeof useCompletionsQuery>;
export type CompletionsLazyQueryHookResult = ReturnType<typeof useCompletionsLazyQuery>;
export type CompletionsQueryResult = Apollo.QueryResult<CompletionsQuery, CompletionsQueryVariables>;
export const CreateOrModifyExerciseSetDocument = gql`
    mutation CreateOrModifyExerciseSet($createOrModifyExerciseSetInput: CreateOrModifyExerciseSetInput!) {
  createOrModifyExerciseSet(
    createOrModifyExerciseSetInput: $createOrModifyExerciseSetInput
  ) {
    id
  }
}
    `;
export type CreateOrModifyExerciseSetMutationFn = Apollo.MutationFunction<CreateOrModifyExerciseSetMutation, CreateOrModifyExerciseSetMutationVariables>;

/**
 * __useCreateOrModifyExerciseSetMutation__
 *
 * To run a mutation, you first call `useCreateOrModifyExerciseSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrModifyExerciseSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrModifyExerciseSetMutation, { data, loading, error }] = useCreateOrModifyExerciseSetMutation({
 *   variables: {
 *      createOrModifyExerciseSetInput: // value for 'createOrModifyExerciseSetInput'
 *   },
 * });
 */
export function useCreateOrModifyExerciseSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrModifyExerciseSetMutation, CreateOrModifyExerciseSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrModifyExerciseSetMutation, CreateOrModifyExerciseSetMutationVariables>(CreateOrModifyExerciseSetDocument, options);
      }
export type CreateOrModifyExerciseSetMutationHookResult = ReturnType<typeof useCreateOrModifyExerciseSetMutation>;
export type CreateOrModifyExerciseSetMutationResult = Apollo.MutationResult<CreateOrModifyExerciseSetMutation>;
export type CreateOrModifyExerciseSetMutationOptions = Apollo.BaseMutationOptions<CreateOrModifyExerciseSetMutation, CreateOrModifyExerciseSetMutationVariables>;
export const InProgressProgramFacetsDocument = gql`
    query InProgressProgramFacets {
  inProgressProgramFacets {
    ...ProgramFacetFields
    program {
      id
      name
    }
  }
}
    ${ProgramFacetFieldsFragmentDoc}`;

/**
 * __useInProgressProgramFacetsQuery__
 *
 * To run a query within a React component, call `useInProgressProgramFacetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInProgressProgramFacetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInProgressProgramFacetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInProgressProgramFacetsQuery(baseOptions?: Apollo.QueryHookOptions<InProgressProgramFacetsQuery, InProgressProgramFacetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InProgressProgramFacetsQuery, InProgressProgramFacetsQueryVariables>(InProgressProgramFacetsDocument, options);
      }
export function useInProgressProgramFacetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InProgressProgramFacetsQuery, InProgressProgramFacetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InProgressProgramFacetsQuery, InProgressProgramFacetsQueryVariables>(InProgressProgramFacetsDocument, options);
        }
export type InProgressProgramFacetsQueryHookResult = ReturnType<typeof useInProgressProgramFacetsQuery>;
export type InProgressProgramFacetsLazyQueryHookResult = ReturnType<typeof useInProgressProgramFacetsLazyQuery>;
export type InProgressProgramFacetsQueryResult = Apollo.QueryResult<InProgressProgramFacetsQuery, InProgressProgramFacetsQueryVariables>;
export const RequestOtpDocument = gql`
    mutation RequestOtp($phoneNumber: String!) {
  requestOtp(phoneNumber: $phoneNumber)
}
    `;
export type RequestOtpMutationFn = Apollo.MutationFunction<RequestOtpMutation, RequestOtpMutationVariables>;

/**
 * __useRequestOtpMutation__
 *
 * To run a mutation, you first call `useRequestOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestOtpMutation, { data, loading, error }] = useRequestOtpMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useRequestOtpMutation(baseOptions?: Apollo.MutationHookOptions<RequestOtpMutation, RequestOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestOtpMutation, RequestOtpMutationVariables>(RequestOtpDocument, options);
      }
export type RequestOtpMutationHookResult = ReturnType<typeof useRequestOtpMutation>;
export type RequestOtpMutationResult = Apollo.MutationResult<RequestOtpMutation>;
export type RequestOtpMutationOptions = Apollo.BaseMutationOptions<RequestOtpMutation, RequestOtpMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOtp($phoneNumber: String!, $otp: String!) {
  verifyOtp(phoneNumber: $phoneNumber, otp: $otp) {
    user {
      ...CurrentUserFields
    }
    token
  }
}
    ${CurrentUserFieldsFragmentDoc}`;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const CreateExerciseHistoryDocument = gql`
    mutation CreateExerciseHistory($exerciseSetHistoryInput: ExerciseSetHistoryInput!) {
  createExerciseSetHistory(exerciseSetHistoryInput: $exerciseSetHistoryInput) {
    id
    programId
    programFacetId
    workoutId
    circuitId
    exerciseId
    exerciseSetId
    userId
    createdAt
    updatedAt
  }
}
    `;
export type CreateExerciseHistoryMutationFn = Apollo.MutationFunction<CreateExerciseHistoryMutation, CreateExerciseHistoryMutationVariables>;

/**
 * __useCreateExerciseHistoryMutation__
 *
 * To run a mutation, you first call `useCreateExerciseHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseHistoryMutation, { data, loading, error }] = useCreateExerciseHistoryMutation({
 *   variables: {
 *      exerciseSetHistoryInput: // value for 'exerciseSetHistoryInput'
 *   },
 * });
 */
export function useCreateExerciseHistoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseHistoryMutation, CreateExerciseHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseHistoryMutation, CreateExerciseHistoryMutationVariables>(CreateExerciseHistoryDocument, options);
      }
export type CreateExerciseHistoryMutationHookResult = ReturnType<typeof useCreateExerciseHistoryMutation>;
export type CreateExerciseHistoryMutationResult = Apollo.MutationResult<CreateExerciseHistoryMutation>;
export type CreateExerciseHistoryMutationOptions = Apollo.BaseMutationOptions<CreateExerciseHistoryMutation, CreateExerciseHistoryMutationVariables>;
export const GetExerciseHistoryDocument = gql`
    query GetExerciseHistory {
  exerciseSetHistory {
    id
    programId
    programFacetId
    workoutId
    circuitId
    exerciseId
    exerciseSetId
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetExerciseHistoryQuery__
 *
 * To run a query within a React component, call `useGetExerciseHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExerciseHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetExerciseHistoryQuery, GetExerciseHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciseHistoryQuery, GetExerciseHistoryQueryVariables>(GetExerciseHistoryDocument, options);
      }
export function useGetExerciseHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseHistoryQuery, GetExerciseHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciseHistoryQuery, GetExerciseHistoryQueryVariables>(GetExerciseHistoryDocument, options);
        }
export type GetExerciseHistoryQueryHookResult = ReturnType<typeof useGetExerciseHistoryQuery>;
export type GetExerciseHistoryLazyQueryHookResult = ReturnType<typeof useGetExerciseHistoryLazyQuery>;
export type GetExerciseHistoryQueryResult = Apollo.QueryResult<GetExerciseHistoryQuery, GetExerciseHistoryQueryVariables>;
export const GetProgramMessagesDocument = gql`
    query GetProgramMessages($programId: Int!, $pagination: Pagination, $historyMessageId: Int) {
  getProgramMessages(
    programId: $programId
    pagination: $pagination
    historyMessageId: $historyMessageId
  ) {
    data {
      id
      senderId
      programId
      replyToId
      sender {
        id
        email
        title
        firstName
        lastName
        fullName
        phoneNumber
        iosPushToken
        androidPushToken
        weightUnit
        skillLevel
        location
        imageUrl
        birthday
        admin
        restrictedAdmin
        verified
        private
        newsletter
        notifications
        createdAt
        isCoach
      }
      replyTo {
        id
        senderId
        programId
        replyToId
        text
        mediaUrl
        mediaType
        isEdited
        isDeleted
        createdAt
        updatedAt
        sender {
          id
          email
          title
          firstName
          lastName
          fullName
          phoneNumber
          iosPushToken
          androidPushToken
          weightUnit
          skillLevel
          location
          imageUrl
          birthday
          admin
          restrictedAdmin
          verified
          private
          newsletter
          notifications
          createdAt
          isCoach
        }
      }
      readBy {
        id
        email
        title
        firstName
        lastName
        fullName
        phoneNumber
        iosPushToken
        androidPushToken
        weightUnit
        skillLevel
        location
        imageUrl
        birthday
        admin
        restrictedAdmin
        verified
        private
        newsletter
        notifications
        createdAt
        isCoach
      }
      text
      mediaUrl
      mediaType
      isEdited
      isDeleted
      createdAt
      updatedAt
    }
    meta {
      total
      page
      limit
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useGetProgramMessagesQuery__
 *
 * To run a query within a React component, call `useGetProgramMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgramMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgramMessagesQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *      pagination: // value for 'pagination'
 *      historyMessageId: // value for 'historyMessageId'
 *   },
 * });
 */
export function useGetProgramMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetProgramMessagesQuery, GetProgramMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProgramMessagesQuery, GetProgramMessagesQueryVariables>(GetProgramMessagesDocument, options);
      }
export function useGetProgramMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgramMessagesQuery, GetProgramMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProgramMessagesQuery, GetProgramMessagesQueryVariables>(GetProgramMessagesDocument, options);
        }
export type GetProgramMessagesQueryHookResult = ReturnType<typeof useGetProgramMessagesQuery>;
export type GetProgramMessagesLazyQueryHookResult = ReturnType<typeof useGetProgramMessagesLazyQuery>;
export type GetProgramMessagesQueryResult = Apollo.QueryResult<GetProgramMessagesQuery, GetProgramMessagesQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($programId: Int!, $replyToId: Int, $text: String, $mediaUrl: String, $mediaType: String) {
  sendMessage(
    programId: $programId
    replyToId: $replyToId
    text: $text
    mediaUrl: $mediaUrl
    mediaType: $mediaType
  ) {
    id
    senderId
    programId
    replyToId
    sender {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    replyTo {
      id
      senderId
      programId
      replyToId
      text
      mediaUrl
      mediaType
      isEdited
      isDeleted
      createdAt
      updatedAt
      sender {
        id
        email
        title
        firstName
        lastName
        fullName
        phoneNumber
        iosPushToken
        androidPushToken
        weightUnit
        skillLevel
        location
        imageUrl
        birthday
        admin
        restrictedAdmin
        verified
        private
        newsletter
        notifications
        createdAt
        isCoach
      }
    }
    readBy {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    text
    mediaUrl
    mediaType
    isEdited
    isDeleted
    createdAt
    updatedAt
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      programId: // value for 'programId'
 *      replyToId: // value for 'replyToId'
 *      text: // value for 'text'
 *      mediaUrl: // value for 'mediaUrl'
 *      mediaType: // value for 'mediaType'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($messageId: Int!, $text: String, $mediaUrl: String, $mediaType: String) {
  editMessage(
    messageId: $messageId
    text: $text
    mediaUrl: $mediaUrl
    mediaType: $mediaType
  ) {
    id
    senderId
    programId
    replyToId
    sender {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    replyTo {
      id
      senderId
      programId
      replyToId
      text
      mediaUrl
      mediaType
      isEdited
      isDeleted
      createdAt
      updatedAt
      sender {
        id
        email
        title
        firstName
        lastName
        fullName
        phoneNumber
        iosPushToken
        androidPushToken
        weightUnit
        skillLevel
        location
        imageUrl
        birthday
        admin
        restrictedAdmin
        verified
        private
        newsletter
        notifications
        createdAt
        isCoach
      }
    }
    readBy {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    text
    mediaUrl
    mediaType
    isEdited
    isDeleted
    createdAt
    updatedAt
  }
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      text: // value for 'text'
 *      mediaUrl: // value for 'mediaUrl'
 *      mediaType: // value for 'mediaType'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: Int!) {
  deleteMessage(messageId: $messageId) {
    id
    senderId
    programId
    replyToId
    sender {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    replyTo {
      id
      senderId
      programId
      replyToId
      text
      mediaUrl
      mediaType
      isEdited
      isDeleted
      createdAt
      updatedAt
      sender {
        id
        email
        title
        firstName
        lastName
        fullName
        phoneNumber
        iosPushToken
        androidPushToken
        weightUnit
        skillLevel
        location
        imageUrl
        birthday
        admin
        restrictedAdmin
        verified
        private
        newsletter
        notifications
        createdAt
        isCoach
      }
    }
    readBy {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    text
    mediaUrl
    mediaType
    isEdited
    isDeleted
    createdAt
    updatedAt
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const SubscriptionDocument = gql`
    subscription Subscription {
  newMessage {
    id
    senderId
    programId
    replyToId
    sender {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    replyTo {
      id
      senderId
      programId
      replyToId
      text
      mediaUrl
      mediaType
      isEdited
      isDeleted
      createdAt
      updatedAt
      sender {
        id
        email
        title
        firstName
        lastName
        fullName
        phoneNumber
        iosPushToken
        androidPushToken
        weightUnit
        skillLevel
        location
        imageUrl
        birthday
        admin
        restrictedAdmin
        verified
        private
        newsletter
        notifications
        createdAt
        isCoach
      }
    }
    readBy {
      id
      email
      title
      firstName
      lastName
      fullName
      phoneNumber
      iosPushToken
      androidPushToken
      weightUnit
      skillLevel
      location
      imageUrl
      birthday
      admin
      restrictedAdmin
      verified
      private
      newsletter
      notifications
      createdAt
      isCoach
    }
    text
    mediaUrl
    mediaType
    isEdited
    isDeleted
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSubscriptionSubscription__
 *
 * To run a query within a React component, call `useSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscriptionSubscription, SubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscriptionSubscription, SubscriptionSubscriptionVariables>(SubscriptionDocument, options);
      }
export type SubscriptionSubscriptionHookResult = ReturnType<typeof useSubscriptionSubscription>;
export type SubscriptionSubscriptionResult = Apollo.SubscriptionResult<SubscriptionSubscription>;
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
export const DeleteS3ObjectDocument = gql`
    mutation DeleteS3Object($fileKey: String!) {
  deleteS3Object(fileKey: $fileKey) {
    success
    message
  }
}
    `;
export type DeleteS3ObjectMutationFn = Apollo.MutationFunction<DeleteS3ObjectMutation, DeleteS3ObjectMutationVariables>;

/**
 * __useDeleteS3ObjectMutation__
 *
 * To run a mutation, you first call `useDeleteS3ObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteS3ObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteS3ObjectMutation, { data, loading, error }] = useDeleteS3ObjectMutation({
 *   variables: {
 *      fileKey: // value for 'fileKey'
 *   },
 * });
 */
export function useDeleteS3ObjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteS3ObjectMutation, DeleteS3ObjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteS3ObjectMutation, DeleteS3ObjectMutationVariables>(DeleteS3ObjectDocument, options);
      }
export type DeleteS3ObjectMutationHookResult = ReturnType<typeof useDeleteS3ObjectMutation>;
export type DeleteS3ObjectMutationResult = Apollo.MutationResult<DeleteS3ObjectMutation>;
export type DeleteS3ObjectMutationOptions = Apollo.BaseMutationOptions<DeleteS3ObjectMutation, DeleteS3ObjectMutationVariables>;