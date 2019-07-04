import {
  createStyles,
  Paper,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";
import * as React from "react";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
      borderRadius: 0
    },
    clearBackground: {
      background: theme.palette.background.default
    }
  });

export interface IPaperWrapperProps extends WithStyles<typeof styles> {
  /**
   * style classes
   *
   * @type {string}
   * @memberof IPaperWrapperProps
   */
  className?: string;
  /**
   * Clear variant of the Paper
   *
   * @type {boolean}
   * @memberof IPaperWrapperProps
   */
  clear?: boolean;
}

export const PaperWrapperSFC: React.SFC<IPaperWrapperProps> = ({
  classes: { root, clearBackground },
  clear,
  className,
  children
}) => (
  <Paper
    className={`${root} ${clear ? clearBackground : ""} ${
      className ? className : ""
    }`}
  >
    {children}
  </Paper>
);

export const PaperWrapperComponent = withStyles(styles)(PaperWrapperSFC);
