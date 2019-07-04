import * as React from 'react';
import {
  TableRow,
  TableCell,
  WithStyles,
  Theme,
  createStyles,
  withStyles
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 489,
      width: '100%',
      display: 'table'
    }
  });

export interface IListEmptyProps extends WithStyles<typeof styles> {
  limit: number;
  columns: number;
}

export const ListEmptySFC: React.SFC<IListEmptyProps> = ({
  limit,
  columns,
  classes: { root }
}) => {
  return (
    <TableRow style={{ height: 49 * limit }}>
      <TableCell colSpan={columns} align="center">
        <FormattedMessage id="MESSAGES.NO_DATA_AVAILABLE" />
      </TableCell>
    </TableRow>
  );
};

export const ListEmptyComponent = withStyles(styles)(ListEmptySFC);
