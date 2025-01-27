import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class ProgramModel extends BaseModel {
  id!: number;

  live!: boolean;
  archived!: boolean;

  name!: string;
  imageUrl!: string;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.PROGRAM.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
