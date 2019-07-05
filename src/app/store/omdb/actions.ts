import { action } from "typesafe-actions";
import { MovieActionType } from "./model";
import Axios from "axios";

export const fetchMovie = (Title: string) =>
  action(
    MovieActionType.FETCH_MOVIE,
    Axios.get(`https://www.omdbapi.com/?t=${Title}&apikey=2b9c4a4e`)
  );
