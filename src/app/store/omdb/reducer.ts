import { Reducer, AnyAction } from "redux";
import { IMovieState, DemoActionType } from "./model";
import { REQUEST, FAILURE, SUCCESS } from "../../shared/constants";

const initialState: IMovieState = {
  movie: { Title: '' },
  loading: false
};

export const demoReducer: Reducer<IMovieState> = (
  state: IMovieState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case REQUEST(DemoActionType.FETCH_TODOS):
      return { ...state, loading: true };
    case FAILURE(DemoActionType.FETCH_TODOS):
      return { ...state, loading: false };
    case SUCCESS(DemoActionType.FETCH_TODOS):
      return { movie: payload.data, loading: false };
    default:
      return state;
  }
};
