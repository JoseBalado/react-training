import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Routes } from './routes';
import { AlertPortal, ConfirmationPortal } from './shared/containers';

export const App: React.SFC = () => (
  <div className="App">
    <CssBaseline />
    <Routes />
    <AlertPortal />
    <ConfirmationPortal />
  </div>
);
