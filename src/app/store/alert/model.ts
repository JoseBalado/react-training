import { IAlert } from "../../models";

export enum IAlertActionTypes {
  DISMISS_ALL_ALERTS = "@@alert/DISMISS_ALL_ALERTS",
  DISMISS_ALERT = "@@alert/DISMISS_ALERT",
  SHOW_ALERT = "@@alert/SHOW_ALERT"
}

export interface IAlertState {
  data: IAlert[];
}
