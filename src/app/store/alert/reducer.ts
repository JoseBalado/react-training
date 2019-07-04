import { AnyAction, Reducer } from "redux";

import { IAlertState, IAlertActionTypes } from "./model";
import { IAlert } from "../../models";

const initialState: IAlertState = {
  data: []
};

const filteredAlerts = (alerts: IAlert[], id: string) => {
  return alerts.filter(alert => alert.id !== id);
};

export const alertReducer: Reducer<IAlertState> = (
  state: IAlertState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case IAlertActionTypes.SHOW_ALERT:
      return {
        data: [payload, ...filteredAlerts(state.data, payload.id)]
      };
    case IAlertActionTypes.DISMISS_ALERT:
      return {
        data: filteredAlerts(state.data, payload)
      };
    case IAlertActionTypes.DISMISS_ALL_ALERTS:
      return {
        data: []
      };
    default:
      return state;
  }
};
