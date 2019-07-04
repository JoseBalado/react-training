import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      marginBottom: theme.spacing(4)
    }
  });

export interface IFieldWrapperProps extends WithStyles<typeof styles> {}

export const FieldWrapperSFC: React.SFC<IFieldWrapperProps> = ({
  children,
  classes: { root }
}) => <div className={root}>{children}</div>;

export const FieldWrapperComponent = withStyles(styles)(FieldWrapperSFC);
