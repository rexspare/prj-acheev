import Knex, { Knex as KnexInstance } from 'knex';
import { range } from 'lodash';
import moment from 'moment';
import { Model } from 'objection';
import { WeightStatModel } from '../../src/models/weightStatModel';
import { USER_1_ID } from '../seedHelper';

const knexFile = require('../../knexfile');
Model.knex(Knex(knexFile[process.env.NODE_ENV || 'development']));

export async function seed(knex: KnexInstance): Promise<any> {

  const partials: Partial<WeightStatModel>[] = range(0, 100).map(index => ({
    userId: USER_1_ID,
    weight: 130 + index + Math.round((Math.random() * 10)) / 10,
    date: moment().subtract(index * 1.1, 'days').toDate(),
    imageUrl: Math.random() > .5 ? 'https://via.placeholder.com/150' : undefined
  }));

  await WeightStatModel.query().insert(partials)
  console.log('✅ Weight stats');
};
