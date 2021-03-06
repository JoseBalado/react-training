import { RouterState } from "connected-react-router";
import { IAlertState } from "./alert";
import { IConfirmationState } from "./confirmation";
import { IDemo_TodoState } from "./demo/model";
import { IMovieState } from "./omdb/model";
import { IReduxMovieState } from "./omdb-reduxform/model";
import { FormStateMap } from 'redux-form';

export interface ICommonState {
  loading: boolean;
  error?: { message: any };
}

export interface IRootState {
  alert: IAlertState;
  confirmation: IConfirmationState;
  demo: IDemo_TodoState;
  form: FormStateMap;
  router: RouterState;
  movie: IMovieState;
  reduxMovie: IReduxMovieState;
}
