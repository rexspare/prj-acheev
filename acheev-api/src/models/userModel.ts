import { ModelOptions, QueryContext } from 'objection';
import bcrypt from 'bcryptjs';
import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';
import crypto from 'crypto';
import { formatEmail, formatPhoneNumber } from '../shared/formats';
import validator from 'validator'
import { SkillLevel, UserInput, WeightUnit } from '../types/gqlTypings.generated';
import { isEmpty } from 'lodash';

export class UserModel extends BaseModel {
  id!: string;
  token!: string;

  email!: string;
  phoneNumber!: string;
  password!: string;

  firstName!: string;
  lastName!: string;
  location?: string;
  imageUrl?: string;
  birthday?: Date;

  phoneNumberConfirmed!: boolean;
  emailConfirmed!: boolean;
  emailVerificationCode?: string;
  phoneNumberVerificationCode?: string;
  resetPasswordToken?: string;

  iosPushToken?: string;
  androidPushToken?: string;
  weightUnit!: WeightUnit;
  skillLevel!: SkillLevel;

  isCoach!: boolean;
  admin!: boolean;
  restrictedAdmin!: boolean;
  verified!: boolean;
  private!: boolean;
  newsletter!: boolean;
  notifications!: boolean;

  createdAt!: Date;
  updatedAt!: Date;

  private static encryptPassword = (password: string): string => bcrypt.hashSync(password.trim(), bcrypt.genSaltSync(10));
  private comparePassword = (password: string): boolean => bcrypt.compareSync(password, this.password);

  async $beforeInsert(context: QueryContext) {
    await super.$beforeInsert(context);
    const { password, email, token, phoneNumber, weightUnit, skillLevel } = this;

    if (password) {
      this.password = UserModel.encryptPassword(password);
    }

    this.id = this.id ?? crypto.randomBytes(32).toString('hex');
    if (!!email) {
      this.email = formatEmail(email);
    }
    if (!!phoneNumber) {
      this.phoneNumber = formatPhoneNumber(phoneNumber)?.toString()!!;
    }

    if (weightUnit == null) {
      this.weightUnit = WeightUnit.Pounds;
    }

    if (skillLevel == null) {
      this.skillLevel = SkillLevel.Beginner;
    }

    // const newPhoneNumber = formatPhoneNumber(phoneNumber)?.toString();
    // if (!newPhoneNumber) {
    //   throw Error("No phone number given to create user");
    // }
    // this.phoneNumber = newPhoneNumber;
    this.token = token || crypto.randomBytes(64).toString('hex');
  }

  async $afterInsert(context: any) {
    await super.$afterInsert(context);
  }

  async $beforeUpdate(opt: ModelOptions, context: QueryContext) {
    await super.$beforeUpdate(opt, context);
    const { email, phoneNumber } = this;

    if (!!email) {
      this.email = formatEmail(email);
    }
    if (!!phoneNumber) {
      this.phoneNumber = formatPhoneNumber(phoneNumber)?.toString()!!;
    }
  }

  static findUserByPhone = async (phoneNumber: string) => {
    const formattedPhone = formatPhoneNumber(phoneNumber) ?? phoneNumber;
    console.info("formattedPhone: ", formattedPhone);
    let user: UserModel | undefined = await UserModel.query().findOne({ phoneNumber: formattedPhone });
    if (user == null) {
      user = await UserModel.query().findOne({ email: formatEmail(phoneNumber) });
    }
    return user;
  }

  static verifyPhonePassword = async (phoneNumber: string, password: string): Promise<UserModel | undefined> => {
    const user = await this.findUserByPhone(phoneNumber);

    if (user == null) {
      throw Error(`Phone number DNE: ${phoneNumber}`);
    }

    console.info("found user");
    return UserModel.verifyPasswordUser(user, password);
  }

  static verifyEmailPassword = async (email: string, password: string): Promise<UserModel | undefined> => {
    const user: UserModel = await UserModel.query().findOne({ email: formatEmail(email) }).throwIfNotFound(new Error('Phone number DNE'));
    return UserModel.verifyPasswordUser(user, password);
  }

  static verifyPasswordUser = async (user: UserModel, password: string): Promise<UserModel | undefined> => {
    const validPassword = user && (await user.comparePassword(password));
    return validPassword ? user : undefined;
  }


  static changePassword = async (userId: string, password: string): Promise<UserModel> => {
    return await UserModel.query().updateAndFetchById(userId, { password: UserModel.encryptPassword(password) });
  }

  static doesEmailExist = async (baseEmail: string): Promise<boolean> => {
    const user = await UserModel.query().findOne({ email: formatEmail(baseEmail) });
    return user !== undefined;
  }

  static create = async (params: UserInput): Promise<UserModel> => {
    // if (!validator.isEmail(params.email || "")) {
    //   throw Error('Email required');
    // } else
    if (isEmpty(params.firstName) || isEmpty(params.lastName)) {
      throw Error('Name required');
    } else if (isEmpty(params.password)) {
      throw Error('Password required');
    } else if (isEmpty(params.phoneNumber) || !validator.isMobilePhone(params.phoneNumber)) {
      throw Error('Phone number required');
    }

    return UserModel.query().insertAndFetch(params);
  }


  static tableName = Models.USER.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
