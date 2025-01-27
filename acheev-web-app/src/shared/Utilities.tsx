// @ts-ignore
import React from 'react'
import { ApolloError } from '@apollo/client';
import { cloneDeep, isString, startCase, toLower } from 'lodash';
import { CurrentUserFieldsFragment } from 'types/gqlReactTypings.generated.d';
import { StorageKeys } from './Constants';

export const getLocalToken = (): string | undefined => {
  const storedToken = window.localStorage.getItem(StorageKeys.TOKEN);
  return storedToken ?? undefined;
};

export const setLocalToken = (token: string) => {
  window.localStorage.setItem(StorageKeys.TOKEN, token);
}

export const getCurrentUser = (): CurrentUserFieldsFragment | undefined => {
  try {
    const stored = localStorage.getItem(StorageKeys.CURRENT_USER)
    if (!!stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.log(`Error loading user from storage: ${err}`);
  }

  return undefined;
};

export const setCurrentUser = async (user: CurrentUserFieldsFragment) => {
  localStorage.setItem(StorageKeys.CURRENT_USER, JSON.stringify(user));
};

export const clearLocalToken = () => {
  window.localStorage.removeItem(StorageKeys.TOKEN);
}

export const isDevEnvironment = () => {
  return process.env.NODE_ENV === 'development';
}

export function devEntry<T>(data?: T) {
  return isDevEnvironment() ? data : undefined;
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
export function testingOnlyData<T>(value: T, defaultVal: T): T {
  if (process.env.NODE_ENV === 'development') {
    return value;
  }
  return defaultVal;
}

export function formatGqlError(error: ApolloError | undefined) {
  return error ? error.toString().replace('Error: GraphQL error: ', '') : undefined;
}

export function formatBoolean(bool?: boolean | null) {
  return bool ? <span style={{ color: 'green' }}>Yes</span> : <span style={{ color: 'red' }}>No</span>;
}


export const formatUser = (user?: Partial<{
  fullName: string;
  id?: string;
}
>) => user ? `${user.fullName} (${user.id})` : '';

export const formatCurrency = (value?: number | null) => `$${((value || 0) / 100.0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;


export const titleCase = (val?: string) => startCase(toLower(val));


export const formatDate = (date: (Date | string | undefined), time = true, seconds = false): string => {
  if (!date) { return ''; }
  if (isString(date)) { date = new Date(date); }
  const stringVersion = time ? (date as Date).toLocaleString() : (date as Date).toLocaleDateString();
  return seconds ? stringVersion : stringVersion.replace(':00 ', ' ');
}

export const formatAddressLink = (address?: string): any => {
  return <a target='_blank' href={`http://maps.google.com/?q=${address}`} rel="noopener noreferrer">{address}</a>
}

export const formatLatLngLink = (lat?: number, lng?: number): any => {
  return <a target='_blank' href={`http://maps.google.com/?q=(${lat},${lng})`} rel="noopener noreferrer">({lat},{lng})</a>
}