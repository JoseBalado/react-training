import * as React from "react";
import { ITodo } from "../../../models";
import { CheckBoxRounded, Cancel } from "@material-ui/icons";

export interface ICheckCompletionProps {
  item?: ITodo;
}

export interface ICheckCompletionState {}

export class CheckCompletionComponent extends React.Component<
  ICheckCompletionProps,
  ICheckCompletionState
> {
  render() {
    const { item } = this.props;
    return item && item.completed ? (
      <CheckBoxRounded color="secondary" />
    ) : (
      <Cancel color="error" />
    );
  }
}
