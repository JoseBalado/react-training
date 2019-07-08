import { ICommonState } from "../model";
import { IMovie } from "../../models";

export enum MovieActionType {
  FETCH_REDUX_MOVIE = "@@redux_movie/FETCH_REDUX_MOVIE"
}

export interface IReduxMovieState extends ICommonState {
  movie: IMovie;
}
