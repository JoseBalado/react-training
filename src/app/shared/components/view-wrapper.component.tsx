import * as React from 'react';
import { Grid } from '@material-ui/core';

export const ViewWrapperComponent: React.SFC = ({ children }) => (
  <Grid item={true} xs={12}>
    {children}
  </Grid>
);
