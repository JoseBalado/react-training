import React from 'react';
import { Grid } from '@material-ui/core';

import { Home } from '../containers';

export const HomeView: React.SFC = () => (
  <Grid item={true} xs={12} className="HomeView">
    <Home />
  </Grid>
);
