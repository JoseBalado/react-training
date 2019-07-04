import * as React from "react";

import {
  Grid,
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from "@material-ui/core";
import { GridSpacing } from "@material-ui/core/Grid";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface FullWidthWrapperProps extends WithStyles<typeof styles> {
  spacing: GridSpacing;
}

export const FullWidthWrapperSFC: React.SFC<FullWidthWrapperProps> = ({
  classes: { root },
  spacing,
  children
}) => (
  <div className={root}>
    <Grid container={true} spacing={spacing}>
      <Grid item={true} xs={12}>
        {children}
      </Grid>
    </Grid>
  </div>
);

export const FullWidthWrapperComponent = withStyles(styles)(
  FullWidthWrapperSFC
);
