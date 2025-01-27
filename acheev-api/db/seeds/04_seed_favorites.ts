import Knex, { Knex as KnexInstance } from 'knex';
import { Model } from 'objection';
import { FavoriteModel } from '../../src/models/favoriteModel';
import { ProgramFacetModel } from '../../src/models/programFacetModel';
import { WorkoutModel } from '../../src/models/workoutModel';
import { FavoriteModelType, } from '../../src/types/gqlTypings.generated';
import { USER_1_ID } from '../seedHelper';

const knexFile = require('../../knexfile');
Model.knex(Knex(knexFile[process.env.NODE_ENV || 'development']));


export async function seed(knex: KnexInstance): Promise<any> {

  const facets = await ProgramFacetModel.query().where({ archived: false, live: true }).limit(5);
  await FavoriteModel.query().insert(facets.map(item => ({
    userId: USER_1_ID,
    modelId: `${item.id}`,
    modelType: FavoriteModelType.ProgramFacet
  })));

  const workouts = await WorkoutModel.query().where({ archived: false, live: true }).limit(10);
  await FavoriteModel.query().insert(workouts.map(item => ({
    userId: USER_1_ID,
    modelId: `${item.id}`,
    modelType: FavoriteModelType.Workout
  })));


  console.log('✅ Favorites');
};
