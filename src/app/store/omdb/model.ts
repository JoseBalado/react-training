import { ICommonState } from "../model";
import { IMovie } from "../../models";

export enum DemoActionType {
  FETCH_TODOS = "@@demo/FETCH_TODOS"
}

export interface IMovieState extends ICommonState {
  movie: IMovie;
}
