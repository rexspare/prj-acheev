import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class FavoriteModel extends BaseModel {
  id!: number;
  userId!: string;

  modelType!: string;
  modelId!: string;

  archived!: boolean;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.FAVORITE.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
