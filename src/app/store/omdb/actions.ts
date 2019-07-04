import { action } from "typesafe-actions";
import { IGetAllAction, IMovie } from "../../models";
import { MovieActionType } from "./model";
import Axios from "axios";

export const fetchMovie: IGetAllAction<IMovie> = () =>
  action(
    MovieActionType.FETCH_MOVIE,
    Axios.get("https://www.omdbapi.com/?t=movie&apikey=2b9c4a4e")
  );
