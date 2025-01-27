/* THIS IS A GENERATED FILE - DO NOT MODIFY */

/* eslint-disable */

import { ApolloContext } from './types';

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { CompletionModel } from '../models/completionModel';
import { UserModel } from '../models/userModel';
import { FavoriteModel } from '../models/favoriteModel';
import { WeightStatModel } from '../models/weightStatModel';
import { ProgramModel } from '../models/programModel';
import { ProgramFacetModel } from '../models/programFacetModel';
import { ProgramListModel } from '../models/programListModel';
import { WorkoutModel } from '../models/workoutModel';
import { CircuitModel } from '../models/circuitModel';
import { ExerciseModel } from '../models/exerciseModel';
import { ExerciseSetModel } from '../models/exerciseSetModel';
import { FeedbackModel } from '../models/feedbackModel';
import { RatingModel } from '../models/ratingModel';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdminMetrics: ResolverTypeWrapper<AdminMetrics>;
  AdminModifyUserInput: AdminModifyUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChangePasswordInput: ChangePasswordInput;
  ChatEvents: ChatEvents;
  ChatMessage: ResolverTypeWrapper<Omit<ChatMessage, 'readBy' | 'replyTo' | 'sender'> & { readBy: Array<ResolversTypes['User']>, replyTo?: Maybe<ResolversTypes['ReplyToMessage']>, sender: ResolversTypes['User'] }>;
  Circuit: ResolverTypeWrapper<CircuitModel>;
  CircuitInput: CircuitInput;
  CircuitXlsxInput: CircuitXlsxInput;
  Completion: ResolverTypeWrapper<CompletionModel>;
  CompletionInput: CompletionInput;
  CompletionModelType: CompletionModelType;
  CreateCircuitsByXlsxInput: CreateCircuitsByXlsxInput;
  CreateCircuitsByXlsxReponse: ResolverTypeWrapper<CreateCircuitsByXlsxReponse>;
  CreateOrModifyExerciseSetInput: CreateOrModifyExerciseSetInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DayOfWeek: DayOfWeek;
  Exercise: ResolverTypeWrapper<ExerciseModel>;
  ExerciseInput: ExerciseInput;
  ExerciseSet: ResolverTypeWrapper<ExerciseSetModel>;
  ExerciseSetHistory: ResolverTypeWrapper<ExerciseSetHistory>;
  ExerciseSetHistoryInput: ExerciseSetHistoryInput;
  ExerciseSetInput: ExerciseSetInput;
  ExerciseSetXlsxInput: ExerciseSetXlsxInput;
  ExerciseXlsxInput: ExerciseXlsxInput;
  Favorite: ResolverTypeWrapper<FavoriteModel>;
  FavoriteModelType: FavoriteModelType;
  Feedback: ResolverTypeWrapper<FeedbackModel>;
  FeedbackInput: FeedbackInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LoginResponse: ResolverTypeWrapper<Omit<LoginResponse, 'user'> & { user: ResolversTypes['User'] }>;
  Model: ResolversTypes['Circuit'] | ResolversTypes['Exercise'] | ResolversTypes['ExerciseSet'] | ResolversTypes['Program'] | ResolversTypes['ProgramFacet'] | ResolversTypes['Workout'];
  ModifyUserInput: ModifyUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  OrderBy: OrderBy;
  OrderByDirection: OrderByDirection;
  Pagination: Pagination;
  PaginationMeta: ResolverTypeWrapper<PaginationMeta>;
  Program: ResolverTypeWrapper<ProgramModel>;
  ProgramFacet: ResolverTypeWrapper<ProgramFacetModel>;
  ProgramFacetInput: ProgramFacetInput;
  ProgramFacetStats: ResolverTypeWrapper<ProgramFacetStats>;
  ProgramInput: ProgramInput;
  ProgramList: ResolverTypeWrapper<ProgramListModel>;
  ProgramMessagesResponse: ResolverTypeWrapper<Omit<ProgramMessagesResponse, 'data'> & { data: Array<ResolversTypes['ChatMessage']> }>;
  PublicUser: ResolverTypeWrapper<UserModel>;
  Query: ResolverTypeWrapper<{}>;
  Rating: ResolverTypeWrapper<RatingModel>;
  RatingInput: RatingInput;
  RatingModelType: RatingModelType;
  ReplyToMessage: ResolverTypeWrapper<Omit<ReplyToMessage, 'sender'> & { sender: ResolversTypes['User'] }>;
  S3DeleteResponse: ResolverTypeWrapper<S3DeleteResponse>;
  S3SignResponse: ResolverTypeWrapper<S3SignResponse>;
  ScheduledProgramFacet: ResolverTypeWrapper<Omit<ScheduledProgramFacet, 'programFacets'> & { programFacets: Array<ResolversTypes['ProgramFacet']> }>;
  ScheduledWorkout: ResolverTypeWrapper<ScheduledWorkout>;
  SkillLevel: SkillLevel;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateWeightInput: UpdateWeightInput;
  User: ResolverTypeWrapper<UserModel>;
  UserInput: UserInput;
  WeightStat: ResolverTypeWrapper<WeightStatModel>;
  WeightUnit: WeightUnit;
  Workout: ResolverTypeWrapper<WorkoutModel>;
  WorkoutInput: WorkoutInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminMetrics: AdminMetrics;
  AdminModifyUserInput: AdminModifyUserInput;
  Boolean: Scalars['Boolean'];
  ChangePasswordInput: ChangePasswordInput;
  ChatMessage: Omit<ChatMessage, 'readBy' | 'replyTo' | 'sender'> & { readBy: Array<ResolversParentTypes['User']>, replyTo?: Maybe<ResolversParentTypes['ReplyToMessage']>, sender: ResolversParentTypes['User'] };
  Circuit: CircuitModel;
  CircuitInput: CircuitInput;
  CircuitXlsxInput: CircuitXlsxInput;
  Completion: CompletionModel;
  CompletionInput: CompletionInput;
  CreateCircuitsByXlsxInput: CreateCircuitsByXlsxInput;
  CreateCircuitsByXlsxReponse: CreateCircuitsByXlsxReponse;
  CreateOrModifyExerciseSetInput: CreateOrModifyExerciseSetInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Exercise: ExerciseModel;
  ExerciseInput: ExerciseInput;
  ExerciseSet: ExerciseSetModel;
  ExerciseSetHistory: ExerciseSetHistory;
  ExerciseSetHistoryInput: ExerciseSetHistoryInput;
  ExerciseSetInput: ExerciseSetInput;
  ExerciseSetXlsxInput: ExerciseSetXlsxInput;
  ExerciseXlsxInput: ExerciseXlsxInput;
  Favorite: FavoriteModel;
  Feedback: FeedbackModel;
  FeedbackInput: FeedbackInput;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  LoginResponse: Omit<LoginResponse, 'user'> & { user: ResolversParentTypes['User'] };
  Model: ResolversParentTypes['Circuit'] | ResolversParentTypes['Exercise'] | ResolversParentTypes['ExerciseSet'] | ResolversParentTypes['Program'] | ResolversParentTypes['ProgramFacet'] | ResolversParentTypes['Workout'];
  ModifyUserInput: ModifyUserInput;
  Mutation: {};
  OrderBy: OrderBy;
  Pagination: Pagination;
  PaginationMeta: PaginationMeta;
  Program: ProgramModel;
  ProgramFacet: ProgramFacetModel;
  ProgramFacetInput: ProgramFacetInput;
  ProgramFacetStats: ProgramFacetStats;
  ProgramInput: ProgramInput;
  ProgramList: ProgramListModel;
  ProgramMessagesResponse: Omit<ProgramMessagesResponse, 'data'> & { data: Array<ResolversParentTypes['ChatMessage']> };
  PublicUser: UserModel;
  Query: {};
  Rating: RatingModel;
  RatingInput: RatingInput;
  ReplyToMessage: Omit<ReplyToMessage, 'sender'> & { sender: ResolversParentTypes['User'] };
  S3DeleteResponse: S3DeleteResponse;
  S3SignResponse: S3SignResponse;
  ScheduledProgramFacet: Omit<ScheduledProgramFacet, 'programFacets'> & { programFacets: Array<ResolversParentTypes['ProgramFacet']> };
  ScheduledWorkout: ScheduledWorkout;
  String: Scalars['String'];
  Subscription: {};
  Time: Scalars['Time'];
  UpdateWeightInput: UpdateWeightInput;
  User: UserModel;
  UserInput: UserInput;
  WeightStat: WeightStatModel;
  Workout: WorkoutModel;
  WorkoutInput: WorkoutInput;
};

export type AdminMetricsResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['AdminMetrics'] = ResolversParentTypes['AdminMetrics']> = {
  feedbackCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ratingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatMessageResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isEdited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mediaUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  readBy?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  replyTo?: Resolver<Maybe<ResolversTypes['ReplyToMessage']>, ParentType, ContextType>;
  replyToId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  senderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CircuitResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Circuit'] = ResolversParentTypes['Circuit']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  exercises?: Resolver<Array<ResolversTypes['Exercise']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programFacetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  workoutId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompletionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Completion'] = ResolversParentTypes['Completion']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['Model'], ParentType, ContextType>;
  modelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  modelType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentModelId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentModelType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCircuitsByXlsxReponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['CreateCircuitsByXlsxReponse'] = ResolversParentTypes['CreateCircuitsByXlsxReponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ExerciseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  circuitId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exerciseSets?: Resolver<Array<ResolversTypes['ExerciseSet']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programFacetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  restDurationSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  videoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workoutId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseSetResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ExerciseSet'] = ResolversParentTypes['ExerciseSet']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  circuitId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  durationSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  exerciseId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxPercAvailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  percentageMax?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  programFacetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repsAvailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  templateId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weightRelative?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  weightUnit?: Resolver<ResolversTypes['WeightUnit'], ParentType, ContextType>;
  workoutId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseSetHistoryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ExerciseSetHistory'] = ResolversParentTypes['ExerciseSetHistory']> = {
  circuitId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  exerciseId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  exerciseSetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programFacetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workoutId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  modelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  modelType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Feedback'] = ResolversParentTypes['Feedback']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LoginResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Model'] = ResolversParentTypes['Model']> = {
  __resolveType: TypeResolveFn<'Circuit' | 'Exercise' | 'ExerciseSet' | 'Program' | 'ProgramFacet' | 'Workout', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  adminChangePassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAdminChangePasswordArgs, 'newPassword' | 'userId'>>;
  adminModifyUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAdminModifyUserArgs, 'modifyUserInput'>>;
  changePassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'changePasswordInput'>>;
  complete?: Resolver<ResolversTypes['Completion'], ParentType, ContextType, RequireFields<MutationCompleteArgs, 'completionInput'>>;
  createCircuit?: Resolver<ResolversTypes['Circuit'], ParentType, ContextType, RequireFields<MutationCreateCircuitArgs, 'circuitInput'>>;
  createCircuitsByXlsx?: Resolver<ResolversTypes['CreateCircuitsByXlsxReponse'], ParentType, ContextType, RequireFields<MutationCreateCircuitsByXlsxArgs, 'createCircuitsByXlsxInput'>>;
  createExercise?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType, RequireFields<MutationCreateExerciseArgs, 'exerciseInput'>>;
  createExerciseSet?: Resolver<ResolversTypes['ExerciseSet'], ParentType, ContextType, RequireFields<MutationCreateExerciseSetArgs, 'exerciseSetInput'>>;
  createExerciseSetHistory?: Resolver<ResolversTypes['ExerciseSetHistory'], ParentType, ContextType, RequireFields<MutationCreateExerciseSetHistoryArgs, 'exerciseSetHistoryInput'>>;
  createOrModifyExerciseSet?: Resolver<ResolversTypes['ExerciseSet'], ParentType, ContextType, RequireFields<MutationCreateOrModifyExerciseSetArgs, 'createOrModifyExerciseSetInput'>>;
  createProgram?: Resolver<ResolversTypes['Program'], ParentType, ContextType, RequireFields<MutationCreateProgramArgs, 'programInput'>>;
  createProgramFacet?: Resolver<ResolversTypes['ProgramFacet'], ParentType, ContextType, RequireFields<MutationCreateProgramFacetArgs, 'programFacetInput'>>;
  createWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'workoutInput'>>;
  deleteMessage?: Resolver<ResolversTypes['ChatMessage'], ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'messageId'>>;
  deleteS3Object?: Resolver<ResolversTypes['S3DeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteS3ObjectArgs, 'fileKey'>>;
  editMessage?: Resolver<ResolversTypes['ChatMessage'], ParentType, ContextType, RequireFields<MutationEditMessageArgs, 'messageId'>>;
  favorite?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType, RequireFields<MutationFavoriteArgs, 'modelId' | 'modelType'>>;
  forgotPasswordRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationForgotPasswordRequestArgs, never>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password'>>;
  modifyCircuit?: Resolver<ResolversTypes['Circuit'], ParentType, ContextType, RequireFields<MutationModifyCircuitArgs, 'circuitId' | 'circuitInput'>>;
  modifyExercise?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType, RequireFields<MutationModifyExerciseArgs, 'exerciseId' | 'exerciseInput'>>;
  modifyExerciseSet?: Resolver<ResolversTypes['ExerciseSet'], ParentType, ContextType, RequireFields<MutationModifyExerciseSetArgs, 'exerciseSetId' | 'exerciseSetInput'>>;
  modifyProgram?: Resolver<ResolversTypes['Program'], ParentType, ContextType, RequireFields<MutationModifyProgramArgs, 'programId' | 'programInput'>>;
  modifyProgramFacet?: Resolver<ResolversTypes['ProgramFacet'], ParentType, ContextType, RequireFields<MutationModifyProgramFacetArgs, 'programFacetId' | 'programFacetInput'>>;
  modifyUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationModifyUserArgs, 'modifyUserInput'>>;
  modifyWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationModifyWorkoutArgs, 'workoutId' | 'workoutInput'>>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  readMessage?: Resolver<ResolversTypes['ChatMessage'], ParentType, ContextType, RequireFields<MutationReadMessageArgs, 'messageId' | 'userId'>>;
  register?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'userInput'>>;
  requestOtp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRequestOtpArgs, 'phoneNumber'>>;
  resetPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPassword' | 'resetPasswordToken'>>;
  sendMessage?: Resolver<ResolversTypes['ChatMessage'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'programId'>>;
  submitFeedback?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSubmitFeedbackArgs, never>>;
  submitRating?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSubmitRatingArgs, 'ratingInput'>>;
  updateWeight?: Resolver<ResolversTypes['WeightStat'], ParentType, ContextType, RequireFields<MutationUpdateWeightArgs, 'updateWeightInput'>>;
  verifyOtp?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationVerifyOtpArgs, 'otp' | 'phoneNumber'>>;
};

export type PaginationMetaResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PaginationMeta'] = ResolversParentTypes['PaginationMeta']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Program'] = ResolversParentTypes['Program']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  live?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  programFacets?: Resolver<Array<ResolversTypes['ProgramFacet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFacetResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ProgramFacet'] = ResolversParentTypes['ProgramFacet']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  equipmentNeeded?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  goals?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isFavorited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  live?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  program?: Resolver<ResolversTypes['Program'], ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFacetStatsResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ProgramFacetStats'] = ResolversParentTypes['ProgramFacetStats']> = {
  weekCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workoutCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workoutLength?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramListResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ProgramList'] = ResolversParentTypes['ProgramList']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  programs?: Resolver<Array<ResolversTypes['Program']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramMessagesResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ProgramMessagesResponse'] = ResolversParentTypes['ProgramMessagesResponse']> = {
  data?: Resolver<Array<ResolversTypes['ChatMessage']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicUserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PublicUser'] = ResolversParentTypes['PublicUser']> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  adminFeedback?: Resolver<Array<ResolversTypes['Feedback']>, ParentType, ContextType, RequireFields<QueryAdminFeedbackArgs, never>>;
  adminMetrics?: Resolver<ResolversTypes['AdminMetrics'], ParentType, ContextType>;
  adminPrograms?: Resolver<Array<ResolversTypes['Program']>, ParentType, ContextType, RequireFields<QueryAdminProgramsArgs, never>>;
  adminRatings?: Resolver<Array<ResolversTypes['Rating']>, ParentType, ContextType, RequireFields<QueryAdminRatingsArgs, never>>;
  adminUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryAdminUsersArgs, never>>;
  completedWorkouts?: Resolver<Array<ResolversTypes['Completion']>, ParentType, ContextType>;
  completions?: Resolver<Array<ResolversTypes['Completion']>, ParentType, ContextType, RequireFields<QueryCompletionsArgs, never>>;
  exerciseSetHistory?: Resolver<Array<Maybe<ResolversTypes['ExerciseSetHistory']>>, ParentType, ContextType>;
  favoriteProgramFacets?: Resolver<Array<ResolversTypes['ProgramFacet']>, ParentType, ContextType, RequireFields<QueryFavoriteProgramFacetsArgs, never>>;
  favoriteWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryFavoriteWorkoutsArgs, never>>;
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<QueryFavoritesArgs, never>>;
  getProgramMessages?: Resolver<ResolversTypes['ProgramMessagesResponse'], ParentType, ContextType, RequireFields<QueryGetProgramMessagesArgs, 'programId'>>;
  inProgressProgramFacets?: Resolver<Array<ResolversTypes['ProgramFacet']>, ParentType, ContextType, RequireFields<QueryInProgressProgramFacetsArgs, never>>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryIsCompletedArgs, 'modelId' | 'modelType'>>;
  me?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType>;
  program?: Resolver<ResolversTypes['Program'], ParentType, ContextType, RequireFields<QueryProgramArgs, 'programId'>>;
  programFacet?: Resolver<ResolversTypes['ProgramFacet'], ParentType, ContextType, RequireFields<QueryProgramFacetArgs, 'programFacetId'>>;
  programFacetStats?: Resolver<ResolversTypes['ProgramFacetStats'], ParentType, ContextType, RequireFields<QueryProgramFacetStatsArgs, 'programFacetId' | 'skillLevel'>>;
  programLists?: Resolver<Array<ResolversTypes['ProgramList']>, ParentType, ContextType>;
  programSearch?: Resolver<Array<ResolversTypes['Program']>, ParentType, ContextType, RequireFields<QueryProgramSearchArgs, 'query'>>;
  programs?: Resolver<Array<ResolversTypes['Program']>, ParentType, ContextType, RequireFields<QueryProgramsArgs, never>>;
  scheduledWorkouts?: Resolver<Array<Maybe<ResolversTypes['ScheduledWorkout']>>, ParentType, ContextType>;
  signUrl?: Resolver<ResolversTypes['S3SignResponse'], ParentType, ContextType, RequireFields<QuerySignUrlArgs, 'contentType' | 'objectName'>>;
  user?: Resolver<ResolversTypes['PublicUser'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weightStats?: Resolver<Array<ResolversTypes['WeightStat']>, ParentType, ContextType, RequireFields<QueryWeightStatsArgs, never>>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<QueryWorkoutArgs, 'workoutId'>>;
  workouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryWorkoutsArgs, 'programFacetId' | 'skillLevel'>>;
};

export type RatingResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  experiencedImprovement?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  modelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modelType?: Resolver<ResolversTypes['RatingModelType'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ratingChallenge?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ratingChallengeScale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ratingEffort?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ratingEffortScale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ratingOverall?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ratingOverallScale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ratingPerformance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ratingPerformanceScale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyToMessageResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ReplyToMessage'] = ResolversParentTypes['ReplyToMessage']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isEdited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mediaUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replyToId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  senderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type S3DeleteResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['S3DeleteResponse'] = ResolversParentTypes['S3DeleteResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type S3SignResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['S3SignResponse'] = ResolversParentTypes['S3SignResponse']> = {
  fileKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publicUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduledProgramFacetResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ScheduledProgramFacet'] = ResolversParentTypes['ScheduledProgramFacet']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programFacetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programFacets?: Resolver<Array<ResolversTypes['ProgramFacet']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduledWorkoutResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ScheduledWorkout'] = ResolversParentTypes['ScheduledWorkout']> = {
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newMessage?: SubscriptionResolver<ResolversTypes['ChatMessage'], "newMessage", ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  androidPushToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iosPushToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCoach?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newsletter?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  notifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  restrictedAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skillLevel?: Resolver<ResolversTypes['SkillLevel'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  weightUnit?: Resolver<ResolversTypes['WeightUnit'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeightStatResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['WeightStat'] = ResolversParentTypes['WeightStat']> = {
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkoutResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  circuits?: Resolver<Array<ResolversTypes['Circuit']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  durationMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFavorited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programFacet?: Resolver<ResolversTypes['ProgramFacet'], ParentType, ContextType>;
  programFacetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  programId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skillLevel?: Resolver<ResolversTypes['SkillLevel'], ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  week?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  AdminMetrics?: AdminMetricsResolvers<ContextType>;
  ChatMessage?: ChatMessageResolvers<ContextType>;
  Circuit?: CircuitResolvers<ContextType>;
  Completion?: CompletionResolvers<ContextType>;
  CreateCircuitsByXlsxReponse?: CreateCircuitsByXlsxReponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Exercise?: ExerciseResolvers<ContextType>;
  ExerciseSet?: ExerciseSetResolvers<ContextType>;
  ExerciseSetHistory?: ExerciseSetHistoryResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  Feedback?: FeedbackResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Model?: ModelResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginationMeta?: PaginationMetaResolvers<ContextType>;
  Program?: ProgramResolvers<ContextType>;
  ProgramFacet?: ProgramFacetResolvers<ContextType>;
  ProgramFacetStats?: ProgramFacetStatsResolvers<ContextType>;
  ProgramList?: ProgramListResolvers<ContextType>;
  ProgramMessagesResponse?: ProgramMessagesResponseResolvers<ContextType>;
  PublicUser?: PublicUserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rating?: RatingResolvers<ContextType>;
  ReplyToMessage?: ReplyToMessageResolvers<ContextType>;
  S3DeleteResponse?: S3DeleteResponseResolvers<ContextType>;
  S3SignResponse?: S3SignResponseResolvers<ContextType>;
  ScheduledProgramFacet?: ScheduledProgramFacetResolvers<ContextType>;
  ScheduledWorkout?: ScheduledWorkoutResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Time?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  WeightStat?: WeightStatResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
};

