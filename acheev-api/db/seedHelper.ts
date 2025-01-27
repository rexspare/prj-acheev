import { UserModel } from "../src/models/userModel";

export const USER_1_ID = '1';
export const USER_2_ID = '2';
export const USER_3_ID = '3';
export const USER_4_ID = '4';

export const ORG_1_ID = '1';
export const ORG_2_ID = '2';


export const USER_ONE_EMAIL = 'team@waker.com';
export const USER_TWO_EMAIL = 'user+2@test.com';
export const USER_THREE_EMAIL = 'user+3@test.com';
export const USER_FOUR_EMAIL = 'user+4@test.com';

export const getUserOne = () => UserModel.query().findOne({ email: USER_ONE_EMAIL });
export const getUserTwo = () => UserModel.query().findOne({ email: USER_TWO_EMAIL });
export const getUserThree = () => UserModel.query().findOne({ email: USER_THREE_EMAIL });
export const getUserFour = () => UserModel.query().findOne({ email: USER_FOUR_EMAIL });

