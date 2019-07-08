import { combineReducers } from "redux";
import { history } from "../config";
import { IRootState } from "./model";
import { alertReducer } from "./alert";
import { connectRouter } from "connected-react-router";
import { confirmationReducer } from "./confirmation";
import { demoReducer } from "./demo/reducer";
import { movieReducer } from "./omdb/reducer";
import { reduxMovieReducer } from "./omdb-reduxform/reducer";
import { reducer as reduxFormReducer } from 'redux-form';

export const rootReducer = combineReducers<IRootState>({
  alert: alertReducer,
  confirmation: confirmationReducer,
  demo: demoReducer,
  movie: movieReducer,
  form: reduxFormReducer,
  reduxMovie: reduxMovieReducer,
  router: connectRouter(history)
});
