import { action } from "typesafe-actions";
import { IGetAllAction, ITodo } from "../../models";
import { DemoActionType } from "./model";
import Axios from "axios";

export const fetchTodos: IGetAllAction<ITodo[]> = () =>
  action(
    DemoActionType.FETCH_TODOS,
    Axios.get("https://jsonplaceholder.typicode.com/todos/")
  );
