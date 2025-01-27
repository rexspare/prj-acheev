import { Model, snakeCaseMappers } from "objection";

export class BaseModelClass extends Model {

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get modelPaths() {
    return [__dirname];
  }
}

export const BaseModel = BaseModelClass;