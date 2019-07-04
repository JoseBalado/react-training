import { AnyAction, Reducer } from 'redux';

import { IConfirmationState, IConfirmationActionTypes } from './model';
import { IConfirmation } from '../../models';

const initialState: IConfirmationState = {
  data: []
};

const filteredConfirmations = (confirmations: IConfirmation[], id: string) => {
  return confirmations.filter(confirmation => confirmation.id !== id);
};

export const confirmationReducer: Reducer<IConfirmationState> = (
  state: IConfirmationState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case IConfirmationActionTypes.SHOW_CONFIRMATION:
    case IConfirmationActionTypes.SHOW_DOUBLE_CONFIRMATION:
      return {
        ...state,
        data: [payload, ...filteredConfirmations(state.data, payload.id)]
      };
    case IConfirmationActionTypes.DISMISS_CONFIRMATION:
      return {
        ...state,
        data: filteredConfirmations(state.data, payload)
      };
    case IConfirmationActionTypes.DISMISS_ALL_CONFIRMATIONS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
};
