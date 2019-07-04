import { action } from "typesafe-actions";

import { IAlert } from "../../models";
import { IAlertActionTypes } from "./model";

// SYNCHRONOUS

export const showAlert = (alert: Partial<IAlert>) =>
  action(IAlertActionTypes.SHOW_ALERT, alert);
export const dismissAlert = (id: string) =>
  action(IAlertActionTypes.DISMISS_ALERT, id);
export const dismissAllAlerts = () =>
  action(IAlertActionTypes.DISMISS_ALL_ALERTS);
