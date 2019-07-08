import { Reducer, AnyAction } from "redux";
import { IReduxMovieState, ReduxMovieActionType } from "./model";
import { REQUEST, FAILURE, SUCCESS } from "../../shared/constants";

const initialState: IReduxMovieState = {
  movie: {
    Title: '',
    Plot: '',
    Poster: ''
  },
  loading: false
};

export const reduxMovieReducer: Reducer<IReduxMovieState> = (
  state: IReduxMovieState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case REQUEST(ReduxMovieActionType.FETCH_REDUX_MOVIE):
      return { ...state, loading: true };
    case FAILURE(ReduxMovieActionType.FETCH_REDUX_MOVIE):
      return { ...state, loading: false };
    case SUCCESS(ReduxMovieActionType.FETCH_REDUX_MOVIE):
      return { movie: payload.data, loading: false };
    default:
      return state;
  }
};
