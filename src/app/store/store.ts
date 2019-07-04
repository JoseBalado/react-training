import { createStore, applyMiddleware, Store, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

import {
  history,
  apiResponseAlertMiddleware,
  routeRedirectMiddleware
} from "../config";
import { rootReducer } from "./root-reducer";
import { IRootState } from "./model";

const middlewares = applyMiddleware(
  routerMiddleware(history),
  apiResponseAlertMiddleware,
  routeRedirectMiddleware,
  thunkMiddleware,
  promiseMiddleware
);

export const configureStore = () =>
  createStore(
    rootReducer,
    process.env.NODE_ENV === "development"
      ? composeWithDevTools(middlewares)
      : compose(middlewares)
  ) as Store<IRootState>;
