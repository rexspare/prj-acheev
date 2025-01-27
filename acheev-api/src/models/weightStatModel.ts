import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class WeightStatModel extends BaseModel {
  id!: string;
  userId!: string;

  weight!: Number;
  date!: Date;

  imageUrl?: string;
  notes?: string;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.WEIGHT_STAT.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
