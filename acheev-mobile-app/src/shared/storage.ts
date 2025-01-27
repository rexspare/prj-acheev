import AsyncStorage from '@react-native-async-storage/async-storage';
import { GenericUserFieldsFragment } from '../types/gqlReactTypings.generated.d';
import { appSessionStorage } from './auth/sessionStorage';
import { isSimulator } from './Utilities';

export const ACCESS_TOKEN_KEY = 'token';
export const CURRENT_USER_KEY = 'current_user';

const shouldUseSessionStorage = (): boolean => {
  return !isSimulator() && false;
}


export const getAccessToken = async (): Promise<string | null> => {
  return shouldUseSessionStorage() ? appSessionStorage.getItem(ACCESS_TOKEN_KEY) : AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = async (token: string) => {
  await (shouldUseSessionStorage() ? appSessionStorage.setItem(ACCESS_TOKEN_KEY, token) : AsyncStorage.setItem(ACCESS_TOKEN_KEY, token));
};

export const getCurrentUser = async (): Promise<GenericUserFieldsFragment | undefined> => {
  try {
    const stored = await (shouldUseSessionStorage() ? appSessionStorage.getItem(CURRENT_USER_KEY) : AsyncStorage.getItem(CURRENT_USER_KEY));
    if (!!stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.log(`Error loading user from storage: ${err}`);
  };

  return undefined;
};

export const setCurrentUser = async (user: GenericUserFieldsFragment) => {
  try {
    await (shouldUseSessionStorage() ? appSessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)) : AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)));
  } catch (err) {
    console.log(`Error saving user to storage: ${err}`);
  };
};

export const removeAccessToken = async () => {
  await (shouldUseSessionStorage() ? appSessionStorage.removeItem(ACCESS_TOKEN_KEY) : AsyncStorage.removeItem(ACCESS_TOKEN_KEY));
};
