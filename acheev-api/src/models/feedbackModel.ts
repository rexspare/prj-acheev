import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class FeedbackModel extends BaseModel {
  id!: string;
  userId!: string;

  category?: String;
  content?: String;
  notes?: String;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.FEEDBACK.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
