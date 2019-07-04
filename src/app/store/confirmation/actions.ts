import { action } from 'typesafe-actions';

import { IConfirmation } from '../../models';
import { IConfirmationActionTypes } from './model';

// SYNCHRONOUS

export const showConfirmation = (confirmation: IConfirmation) =>
  action(IConfirmationActionTypes.SHOW_CONFIRMATION, confirmation);
export const showDoubleConfirmation = (confirmation: IConfirmation) =>
  action(IConfirmationActionTypes.SHOW_DOUBLE_CONFIRMATION, confirmation);
export const dismissConfirmation = (id: string) =>
  action(IConfirmationActionTypes.DISMISS_CONFIRMATION, id);
export const dismissAllConfirmations = () =>
  action(IConfirmationActionTypes.DISMISS_ALL_CONFIRMATIONS);
