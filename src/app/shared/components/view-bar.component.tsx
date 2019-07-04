import * as React from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    viewTitle: {
      flexGrow: 1,
      color: theme.palette.common.white
    }
  });

export interface IViewBarProps extends WithStyles<typeof styles> {
  title: React.ReactNode;
}

export const ViewBarSFC: React.SFC<IViewBarProps> = ({
  classes: { root, viewTitle },
  children,
  title
}) => (
  <div className={`ViewBar ${root}`}>
    <AppBar color="primary">
      <Toolbar>
        <Typography variant="h5" className={viewTitle}>
          {title}
        </Typography>
        <div>{children}</div>
      </Toolbar>
    </AppBar>
  </div>
);

export const ViewBarComponent = withStyles(styles)(ViewBarSFC);
