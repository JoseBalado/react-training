import moment from 'moment';

import {
  USER_REGEX,
  PASSWORD_REGEX,
  ALPHABET_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX
} from '../constants';

export const minDate = (value: string) =>
  moment(value).isBefore(moment().startOf('day'))
    ? 'VALIDATION.MIN_DATE'
    : undefined;

export const validateUsername = (value: string) =>
  value && USER_REGEX.test(value) ? null : 'VALIDATION.USERNAME';

export const validatePassword = (value: string) =>
  value && PASSWORD_REGEX.test(value) ? null : 'VALIDATION.PASSWORD';

export const validateRequired = (value: string) =>
  value && value.trim() !== '' ? null : 'VALIDATION.REQUIRED';

export const validateRequiredArray = (value: any[]) =>
  value && value.length > 0 ? null : 'VALIDATION.REQUIRED';

export const validateAlphabets = (value: string) =>
  value && ALPHABET_REGEX.test(value) ? null : 'VALIDATION.ALPHABETS';

export const validateBlankOrAlphabets = (value: string) =>
  value && value.trim() ? validateAlphabets(value) : null;

export const validateEmail = (value: string) =>
  value && EMAIL_REGEX.test(value) ? null : 'VALIDATION.EMAIL';

export const validatePhoneNumber = (value: string) =>
  value && PHONE_REGEX.test(value) ? null : 'VALIDATION.PHONE';
