import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class ProgramListModel extends BaseModel {
  id!: number;

  archived!: boolean;
  name!: string;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.PROGRAM_LIST.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
