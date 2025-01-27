import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { UserModel } from '../models/userModel';

export function formatEmail(email: string) {
  return email.toLowerCase().trim();
}

export function formatUsername(username: string) {
  return username.trim();
}

export function formatPhoneNumber(phoneNumber: string) {
  try {
    return parsePhoneNumberFromString(phoneNumber.toLowerCase().trim(), 'US')?.number;
  } catch (e) {
    console.info(`Failed to parse phone number: ${phoneNumber}`, e);
    return phoneNumber;
  }
}

export function formatFullName(user: UserModel) {
  return `${user.firstName} ${user.lastName}`;
}