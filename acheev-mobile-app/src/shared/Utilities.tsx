import { Platform, Linking, Alert, NativeModules } from 'react-native';
import { cloneDeep, compact, debounce, last, memoize } from 'lodash';
import { useEffect } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import moment from 'moment';
import { ApolloError } from '@apollo/client';
import { isDevice, osBuildFingerprint } from 'expo-device';
import humanizeDuration from 'humanize-duration';
import { CircuitFieldsFragment } from '../types/gqlReactTypings.generated.d';

export const isIos = () => {
  return Platform.OS === 'ios';
}

export const isAndroid = () => {
  return Platform.OS === 'android';
}

export function isSimulator() {
  if (2 + 2 === 4) {
    return false;
  }
  return !isDevice || osBuildFingerprint?.includes("emulator");
}

export function testingOnlyData<T>(value: T, defaultVal: T) {
  if (isSimulator()) {
    return value;
  }
  return defaultVal;
}

export function hookStateChangeInjector<T>(state: T, changer: (obj: T) => any, callback?: () => any) {
  return (propertyKey: keyof T) => {
    return (val: any) => {
      const newState = cloneDeep(state);
      newState[propertyKey] = val;
      changer(newState);
      callback && callback();
    }
  }
}

export function formatGqlError(error: ApolloError | undefined) {
  console.log('full error', JSON.stringify(error, null, 2));
  return error ? error.toString().replace('Error: GraphQL error: ', '') : undefined;
}

export const useOnFocus = (navigation: NavigationProp<ParamListBase>, callback: () => void) => useEffect(() => {
  navigation.addListener(
    'focus',
    callback
  );
}, []);

export function filterForAlphanumeric(val: string) {
  return val.replace(/[^a-z0-9]/gi, '');
}

export const callPhoneNumber = (phoneNumber?: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
}

export const openUrl = (url: string) => {
  return Linking.openURL(url);
}

export const showConfirmation = (description: string, onContinue: () => void) => {
  Alert.alert("Are you sure?", description,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK', onPress: onContinue
      }
    ],
    { cancelable: false }
  );
}

export const shortMomentFromNow = (input: Date | string | number | undefined) => {
  return moment(input)
    .fromNow(true)
    .replace(" hours", "h")
    .replace(" minutes", "m")
    .replace(" seconds", "s")
    .replace(" days", "d")
}

export const getLocale = (): string => {
  if (isIos()) {
    return NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
  } else {
    return NativeModules.I18nManager.localeIdentifier;
  }

}

export const removeNonDigits = (number: string) => {
  return number.replace(/\D/g, '');
}

export const formatCurrency = (value?: number) => `$${((value || 0) / 100.0).toFixed(2)}`;

export const getLatestFormattedDate = (dates: (string | null)[] | undefined) => moment(last(compact(dates).sort())).toDate().toLocaleDateString();

export const maybeRenderEmailLine = (title: string, val: string | undefined) => {
  if (val == null || val.length === 0) {
    return '';
  }

  return `<b>${title}:</b><br/>${val}<br/><br/>`;
}

export function memoizeDebounce(func: (...params: any) => any | void, cacheKeyResolver: (obj: any) => string | number, wait = 500, options = {}) {
  return memoize((..._param) => {
    return debounce(func, wait, options)
  }, cacheKeyResolver);
}

export function getUseFocusCallback() {
  const date = new Date();
  return [date.getDate(), date.getHours(), date.getMinutes(), Math.round(date.getSeconds() / 10)];
}

export const shortDurationHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "hr",
      m: () => "mins",
      s: () => "secs",
      ms: () => "ms",
    }
  },
});

export const minuteSecondsString = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}

export const filterWorkoutExerciseSets = (exercise?: CircuitFieldsFragment['exercises'][0]) => {
  const baseSets = compact(exercise?.exerciseSets);
  const templateReplacementIds = compact(baseSets.map(item => item.templateId));
  return baseSets.filter(item => !templateReplacementIds.includes(item.id) && item.archived !== true);
}

export const restDurationHumanizer = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds}s`
  } else {
    return `${(seconds / 60).toFixed(0)}:${(seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60}`
  }

}