import { Reducer, AnyAction } from "redux";
import { IDemo_TodoState, DemoActionType } from "./model";
import { REQUEST, FAILURE, SUCCESS } from "../../shared/constants";

const initialState: IDemo_TodoState = {
  todos: [],
  loading: false
};

export const demoReducer: Reducer<IDemo_TodoState> = (
  state: IDemo_TodoState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case REQUEST(DemoActionType.FETCH_TODOS):
      return { ...state, loading: true };
    case FAILURE(DemoActionType.FETCH_TODOS):
      return { ...state, loading: false };
    case SUCCESS(DemoActionType.FETCH_TODOS):
      return { todos: payload.data, loading: false };
    default:
      return state;
  }
};
