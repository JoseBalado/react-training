import { action } from "typesafe-actions";
import { ReduxMovieActionType } from "./model";
import Axios from "axios";

export const fetchMovie = (Title: string) =>
  action(
    ReduxMovieActionType.FETCH_REDUX_MOVIE,
    Axios.get(`https://www.omdbapi.com/?t=${Title}&apikey=2b9c4a4e`)
  );
