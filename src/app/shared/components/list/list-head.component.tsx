import * as React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';

import { IListColumn, IListOrder } from '../../../models';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

export interface IListHeadProps {
  columns: IListColumn[];
  sortClick: (column: string) => void;
  sort: string;
  order: IListOrder;
  sticky?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    stickyCol: {
      position: 'sticky',
      background: theme.palette.background.paper,
      left: -theme.spacing(3),
      zIndex: 99,
      boxShadow: '2px 6px 5px 1px rgba(224,224,224,1)'
    }
  });

export const ListHeadSFC: React.FC<
  IListHeadProps & WithStyles<typeof styles>
> = ({ columns, sortClick, sort, order, sticky, classes: { stickyCol } }) => (
  <TableHead className="ListHeadComponent">
    <TableRow>
      {columns.map(
        ({ id, numeric, label, hidden }, index) =>
          !hidden && (
            <TableCell
              key={id}
              align={numeric ? 'right' : 'inherit'}
              padding="default"
              onClick={() => sortClick(id)}
              sortDirection={sort === id ? order : false}
              className={classNames({
                [stickyCol]: sticky && index === 0
              })}
            >
              <FormattedMessage id="ACTIONS.SORT">
                {placeholder => (
                  <Tooltip
                    title={placeholder}
                    placement={numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel active={sort === id} direction={order}>
                      <FormattedMessage id={label} />
                    </TableSortLabel>
                  </Tooltip>
                )}
              </FormattedMessage>
            </TableCell>
          )
      )}
    </TableRow>
  </TableHead>
);

export const ListHeadComponent = withStyles(styles)(ListHeadSFC);
