import { ICommonState } from "../model";
import { ITodo } from "../../models";

export enum DemoActionType {
  FETCH_TODOS = "@@demo/FETCH_TODOS"
}

export interface IDemo_TodoState extends ICommonState {
  todos: ITodo[];
}
