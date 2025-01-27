import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class ProgramFacetModel extends BaseModel {
  id!: number;
  programId!: number;

  live!: boolean;
  archived!: boolean;

  name!: string;
  order!: number;
  imageUrl!: string;

  videoUrl?: string;
  description?: string;
  equipmentNeeded?: string;
  goals?: string;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.PROGRAM_FACET.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
