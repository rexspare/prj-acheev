import Knex, { Knex as KnexInstance } from 'knex';
import { Model } from 'objection';
import { CircuitModel } from '../../src/models/circuitModel';
import { ExerciseModel } from '../../src/models/exerciseModel';
import { ExerciseSetModel } from '../../src/models/exerciseSetModel';
import { FavoriteModel } from '../../src/models/favoriteModel';
import { ProgramFacetModel } from '../../src/models/programFacetModel';
import { ProgramListEntryModel } from '../../src/models/programListEntryModel';
import { ProgramListModel } from '../../src/models/programListModel';
import { ProgramModel } from '../../src/models/programModel';
import { UserModel } from '../../src/models/userModel';
import { WeightStatModel } from '../../src/models/weightStatModel';
import { WorkoutModel } from '../../src/models/workoutModel';

import { USER_ONE_EMAIL, USER_TWO_EMAIL, USER_THREE_EMAIL, USER_FOUR_EMAIL, USER_1_ID, USER_3_ID, USER_2_ID, USER_4_ID } from '../seedHelper';

const knexFile = require('../../knexfile');
Model.knex(Knex(knexFile[process.env.NODE_ENV || 'development']));

const rows: Partial<UserModel>[] = [
  {
    id: USER_1_ID,
    token: '123admin123',
    email: USER_ONE_EMAIL,
    phoneNumber: '+1-650-564-4594',
    password: 'testtest',
    firstName: 'Admin',
    lastName: 'Account',
    location: 'United States',
    admin: true,
    verified: true,
    imageUrl: 'https://placeimg.com/100/100/people/1'
  },
  {
    id: USER_2_ID,
    token: '2p',
    email: USER_TWO_EMAIL,
    phoneNumber: '+65-302-275-2222',
    password: 'testtest',
    firstName: 'User2',
    lastName: 'Demo',
    location: 'Taiwan',
    admin: false,
    verified: true,
    imageUrl: 'https://placeimg.com/100/100/people/2'
  },
  {
    id: USER_3_ID,
    token: '3p',
    email: USER_THREE_EMAIL,
    phoneNumber: '+1650564-4593',
    password: 'testtest',
    firstName: 'User3',
    lastName: 'Test',
    location: 'London',
    admin: false,
    imageUrl: 'https://placeimg.com/100/100/people/3'
  },
  {
    id: USER_4_ID,
    token: '4p',
    email: USER_FOUR_EMAIL,
    phoneNumber: '+1650564-4595',
    password: 'testtest',
    firstName: 'User4',
    lastName: 'Test',
    location: 'United States',
    admin: false,
    imageUrl: 'https://placeimg.com/100/100/people/4'
  }
];

export async function seed(knex: KnexInstance): Promise<any> {
  await FavoriteModel.query().delete();
  await ExerciseSetModel.query().delete();
  await ExerciseModel.query().delete();
  await CircuitModel.query().delete();
  await WorkoutModel.query().delete();
  await ProgramListEntryModel.query().delete();
  await ProgramListModel.query().delete();
  await ProgramFacetModel.query().delete();
  await ProgramModel.query().delete();
  await WeightStatModel.query().delete();
  await UserModel.query().delete();

  await UserModel.query().insert(rows)
  console.log('✅ Users');
};
