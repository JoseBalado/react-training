import { action } from "typesafe-actions";
import { IGetAllAction, IMovie } from "../../models";
import { DemoActionType } from "./model";
import Axios from "axios";

export const fetchMovie: IGetAllAction<IMovie> = () =>
  action(
    DemoActionType.FETCH_TODOS,
    Axios.get("https://www.omdbapi.com/?t=movie&apikey=2b9c4a4e")
  );
