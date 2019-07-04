import * as React from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  Grid
} from '@material-ui/core';

import { EmptyPropertyComponent } from './empty-property.component';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex'
    },
    container: {
      flex: '1 1 auto',
      minWidth: '0px'
    }
  });

type IPropertyItemChildrenProps = {
  heading: React.ReactNode;
  value: any;
};

export interface IPropertyItemProps extends WithStyles<typeof styles> {
  children: IPropertyItemChildrenProps;
  fullWidth?: boolean;
}

export const PropertyItemSFC: React.SFC<IPropertyItemProps> = ({
  classes: { root, container },
  children: { heading, value },
  fullWidth = false
}) => (
  <Grid item={true} xs={12} sm={fullWidth ? 12 : 6} md={fullWidth ? 12 : 3}>
    <div className={root}>
      <div className={`property-item ${container}`}>
        <Typography variant="subtitle1">{heading}</Typography>
        {value ? (
          <Typography color="textSecondary">{value}</Typography>
        ) : (
          <EmptyPropertyComponent />
        )}
      </div>
    </div>
  </Grid>
);

export const PropertyItemComponent = withStyles(styles)(PropertyItemSFC);
