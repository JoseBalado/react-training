import { action } from "typesafe-actions";
import { ReduxMovieActionType } from "./model";
import Axios from "axios";

export const fetchMovie = (name: string) =>
  action(
    ReduxMovieActionType.FETCH_REDUX_MOVIE,
    Axios.get(`https://www.omdbapi.com/?t=${name}&apikey=2b9c4a4e`)
  );
