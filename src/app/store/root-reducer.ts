import { combineReducers } from "redux";
import { history } from "../config";
import { IRootState } from "./model";
import { alertReducer } from "./alert";
import { connectRouter } from "connected-react-router";
import { confirmationReducer } from "./confirmation";
import { demoReducer } from "./demo/reducer";

export const rootReducer = combineReducers<IRootState>({
  alert: alertReducer,
  confirmation: confirmationReducer,
  demo: demoReducer,
  router: connectRouter(history)
});