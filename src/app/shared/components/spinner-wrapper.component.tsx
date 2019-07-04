import * as React from 'react';

import { SpinnerComponent } from './spinner.component';

export interface SpinnerWrapperProps {
  loading: boolean;
}

export const SpinnerWrapperComponent: React.SFC<SpinnerWrapperProps> = ({
  loading,
  children
}) => (
  <div className="SpinnerWrapperComponent">
    {!loading && children}
    {loading && <SpinnerComponent />}
  </div>
);
