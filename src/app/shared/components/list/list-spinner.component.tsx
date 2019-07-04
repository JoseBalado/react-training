import * as React from 'react';
import { TableRow, TableBody, TableCell } from '@material-ui/core';

import { SpinnerComponent } from '../spinner.component';

export interface ListSpinnerProps {
  loading: boolean;
  limit: number;
  columns: number;
}

export const ListSpinnerComponent: React.SFC<ListSpinnerProps> = ({
  loading,
  children,
  limit,
  columns
}) => (
  <React.Fragment>
    {!loading && children}
    {loading && (
      <TableBody>
        <TableRow style={{ height: 49 * limit }}>
          <TableCell colSpan={columns} style={{ position: 'relative' }}>
            <SpinnerComponent />
          </TableCell>
        </TableRow>
      </TableBody>
    )}
  </React.Fragment>
);
