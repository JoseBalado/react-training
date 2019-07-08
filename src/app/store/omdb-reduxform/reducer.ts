import { Reducer, AnyAction } from "redux";
import { IReduxMovieState, MovieActionType } from "./model";
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
    case REQUEST(MovieActionType.FETCH_REDUX_MOVIE):
      return { ...state, loading: true };
    case FAILURE(MovieActionType.FETCH_REDUX_MOVIE):
      return { ...state, loading: false };
    case SUCCESS(MovieActionType.FETCH_REDUX_MOVIE):
      return { movie: payload.data, loading: false };
    default:
      return state;
  }
};
