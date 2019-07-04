import * as React from "react";
import { WithStyles, createStyles, Theme, withStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    flex: {
      display: "flex",
      width: "100%",
      margin: `${theme.spacing(3)}px 0`
    }
  });

export interface AlignedRowComponentProps extends WithStyles<typeof styles> {
  leftComponents?: React.ReactNode;
  rightComponents?: React.ReactNode;
  className?: string;
}

export interface AlignedRowComponentState {}

export class AlignedRowComponentClass extends React.Component<
  AlignedRowComponentProps,
  AlignedRowComponentState
> {
  render() {
    const {
      classes: { flex, grow },
      leftComponents,
      rightComponents
    } = this.props;
    return (
      <div className={flex}>
        {leftComponents}
        <div className={grow} />
        {rightComponents}
      </div>
    );
  }
}

export const AlignedRowComponent = withStyles(styles)(AlignedRowComponentClass);
