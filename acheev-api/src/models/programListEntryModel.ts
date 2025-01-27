import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class ProgramListEntryModel extends BaseModel {
  id!: number;
  programId!: number;
  programListId!: number;

  archived!: boolean;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.PROGRAM_LIST_ENTRY.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
