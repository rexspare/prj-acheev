import { GQLResolver } from "../types/types";
import { UserModel } from "../models/userModel";
import { first } from "lodash";
import { getAppUrl, getS3Image, requireAdmin, requireAdminOrSelf, secureTargetUser } from "../shared/utilities";
import isEmpty from "validator/lib/isEmpty";
import { formatEmail, formatPhoneNumber } from "../shared/formats";
import { SmsService } from "../services/SmsService";
import crypto from 'crypto';
import { IS3Options, s3DeleteObject, s3SignObject } from "../vendor/s3router";

const { S3_BUCKET, S3_REGION, } = process.env;

export const UserResolver: GQLResolver = {
  resolvers: {
    Query: {
      me: (_, _1, ctx) => ({ user: ctx.currentUser as UserModel, token: ctx.currentUser?.token ?? "DNE" }),
      user: async (_, { userId }, ctx) => UserModel.query().findById(userId).throwIfNotFound('Public User DNE'),
      signUrl: (_, { objectName, contentType, }) => {

        const s3Options: IS3Options = {
          bucket: S3_BUCKET ?? "NOT_FOUND",
          headers: { 'Access-Control-Allow-Origin': '*' },
          ACL: 'public-read	', // this is default
          signatureVersion: 'v4',
          expires: 300,
          uniquePrefix: true, // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
          region: S3_REGION ?? "NOT_FOUND"
        }

        return s3SignObject(s3Options, objectName, contentType)
      }
    },
    Mutation: {
      deleteS3Object: (_, { fileKey }, ctx) => {
        requireAdminOrSelf(ctx);

        const s3Options: IS3Options = {
          bucket: S3_BUCKET ?? "NOT_FOUND",
          headers: { 'Access-Control-Allow-Origin': '*' },
          ACL: 'public-read	', // this is default
          signatureVersion: 'v4',
          expires: 300,
          uniquePrefix: true, // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
          region: S3_REGION ?? "NOT_FOUND"
        }
        return s3DeleteObject(s3Options, fileKey);
      },
      requestOtp: async (_, { phoneNumber }) => {
        const user = await UserModel.findUserByPhone(phoneNumber);
        if (user == null) {
          return false;
        }

        return !!(await SmsService.requestVerify(user))
      },
      verifyOtp: async (_, { phoneNumber, otp }) => {
        const user = await UserModel.findUserByPhone(phoneNumber);
        if (user == null || otp == null) {
          throw new Error("Invalid user or OTP");
        }

        const verification = await SmsService.attemptVerify(user, otp);

        if (!verification) {
          throw new Error("Invalid OTP");
        }

        return { user, token: user.token };
      },
      login: async (_, { phoneNumber, email, password }, ctx) => {
        console.info("phone login", phoneNumber);
        const user = await (phoneNumber != null ? UserModel.verifyPhonePassword(phoneNumber, password) : UserModel.verifyEmailPassword(email ?? "none", password));

        if (user == null) {
          console.info("user dne or incorrect password");
          throw new Error('User DNE or incorrect password');
        }
        ctx.currentUser = user;
        console.info('user result', user);
        return { user, token: user.token };
      },
      register: async (_, { userInput }) => {
        const { phoneNumber } = userInput;
        let user = first(await UserModel.query()
          // .andWhere({ email: formatEmail(email ?? "") })
          .where({ phoneNumber: formatPhoneNumber(phoneNumber ?? "") })
        );

        if (user === undefined) {
          user = await UserModel.create(userInput);
        }

        if (!user) {
          throw new Error("Failed to create user");
        }


        return { user, token: user.token };
      },
      modifyUser: async (_, { userId, modifyUserInput }, ctx) => {
        const targetUser = await secureTargetUser(ctx, userId);
        let safeModify: Partial<UserModel> = {
          ...modifyUserInput,
        }
        const { email, iosPushToken, androidPushToken } = safeModify;
        if (email != null) {
          safeModify['email'] = formatEmail(email);
        }

        if (iosPushToken != null) {
          await UserModel.query().where({ ios_push_token: iosPushToken }).update({ iosPushToken: '' });
        } else if (androidPushToken != null) {
          await UserModel.query().where({ android_push_token: androidPushToken }).update({ androidPushToken: '' });
        }

        console.info("Final params", safeModify);

        return targetUser.$query().updateAndFetch(safeModify);
      },
      adminModifyUser: async (_, { userId, modifyUserInput }, ctx) => {
        requireAdmin(ctx, true);
        const targetUser = await secureTargetUser(ctx, userId);
        return targetUser.$query().updateAndFetch(modifyUserInput);
      },
      adminChangePassword: async (_, { userId, newPassword }, ctx) => {
        requireAdmin(ctx, true);
        const targetUser = await secureTargetUser(ctx, userId);
        return !!(await UserModel.changePassword(targetUser.id, newPassword));
      },
      changePassword: async (_, { userId, changePasswordInput }, ctx) => {
        const targetUser = await secureTargetUser(ctx, userId);
        const { currentPassword, newPassword, newPasswordConfirmation } = changePasswordInput;
        if (newPassword !== newPasswordConfirmation || isEmpty(newPassword)) {
          throw Error("New passwords do not match or are not valid");
        }

        if (!(await UserModel.verifyPasswordUser(targetUser, currentPassword))) {
          throw Error("Invalid current password");
        }

        return !!(await UserModel.changePassword(targetUser.id, newPassword));
      },
      forgotPasswordRequest: async (_, { phoneNumber, email }) => {
        let user = await (phoneNumber != null ? UserModel.query().findOne({ phoneNumber: formatPhoneNumber(phoneNumber) }) : UserModel.query().findOne({ email: (email ?? "none").toLowerCase().trim() }));

        if (user) {
          user = await user.$query().updateAndFetch({ resetPasswordToken: crypto.randomBytes(16).toString('hex') });
          const forgotPasswordResetLink = `${getAppUrl()}/forgot-password/${user.resetPasswordToken}`
          SmsService.sendMessageUser(user, `[Acheev] Please visit this link to reset your password: ${forgotPasswordResetLink}`);
          return true;
        }

        return false;
      },
      resetPassword: async (_, { resetPasswordToken, newPassword }) => {
        if (resetPasswordToken.length === 0) {
          return false;
        }
        let user = await UserModel.query().findOne({ resetPasswordToken });

        if (user) {
          await UserModel.changePassword(user.id, newPassword);
          user = await user.$query().updateAndFetch({ resetPasswordToken: undefined });
          return true;
        }

        return false;
      }
    },
    User: {
      admin: (user, _, { isCurrentUserAdmin }) => isCurrentUserAdmin && user.admin,
      fullName: user => `${user.firstName} ${user.lastName}`,
      imageUrl: user => getS3Image(user.imageUrl)
    },
    PublicUser: {
      fullName: user => `${user.firstName} ${user.lastName}`,
      imageUrl: user => getS3Image(user.imageUrl),
    }
  },
}