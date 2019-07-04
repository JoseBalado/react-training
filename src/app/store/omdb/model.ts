import { ICommonState } from "../model";
import { IMovie } from "../../models";

export enum MovieActionType {
  FETCH_MOVIE = "@@movie/FETCH_MOVIE"
}

export interface IMovieState extends ICommonState {
  movie: IMovie;
}
