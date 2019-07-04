import { IConfirmation } from '../../models';

export enum IConfirmationActionTypes {
  DISMISS_ALL_CONFIRMATIONS = '@@confirmation/DISMISS_ALL_CONFIRMATIONS',
  DISMISS_CONFIRMATION = '@@confirmation/DISMISS_CONFIRMATION',
  SHOW_CONFIRMATION = '@@confirmation/SHOW_CONFIRMATION',
  SHOW_DOUBLE_CONFIRMATION = '@@confirmation/SHOW_DOUBLE_CONFIRMATION'
}

export interface IConfirmationState {
  data: IConfirmation[];
}
