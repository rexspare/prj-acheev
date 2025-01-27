import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (
  key: string,
  value: string | number | boolean | object | null,
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItem = async (key: string) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('error', error);
  }
};


export const getItem = async <T>(key: string, defaultValue?: T) => {
  try {
    const respString = await AsyncStorage.getItem(key);
    if (respString) {
      return Promise.resolve(JSON.parse(respString) as T);
    }
    return defaultValue !== undefined
      ? Promise.resolve(defaultValue)
      : Promise.reject(new Error(`No item for ${key}`));
  } catch (error) {
    console.log('error', error);
    return Promise.reject(error);
  }
};

export const mergeItem = (
  key: string,
  value: Record<string | number, string | number | boolean | object>,
) => {
  try {
    console.log('key', key);
    console.log('JSON.stringify(value)', JSON.stringify(value));
    return AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('error', error);
    return Promise.reject(error);
  }
};


