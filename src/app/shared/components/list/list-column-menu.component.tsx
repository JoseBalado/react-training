import * as React from 'react';
import { IListColumn } from '../../../models';
import { IconButton, Menu, MenuItem, Checkbox } from '@material-ui/core';
import { ViewColumnOutlined } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';

export interface IListColumnMenuProps {
  columns: IListColumn[];
  handleColumnsChanged: (value: any) => void;
  iconStyle?: string;
}

export interface IListColumnMenuState {
  columnEl: null | HTMLElement;
}

export class ListColumnMenu extends React.Component<
  IListColumnMenuProps,
  IListColumnMenuState
> {
  state = { columnEl: null };

  handleColumnMenuOpen = (event: any) => {
    this.setState({ columnEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ columnEl: null });
  };

  render() {
    const { columns, handleColumnsChanged, iconStyle } = this.props;
    const { columnEl } = this.state;
    const isColumnMenuOpen = Boolean(columnEl);
    return (
      <div className="ListColumnMenu">
        <IconButton
          className={iconStyle ? iconStyle : ''}
          onClick={this.handleColumnMenuOpen}
        >
          <ViewColumnOutlined />
        </IconButton>
        <Menu
          anchorEl={columnEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isColumnMenuOpen}
          onClose={this.handleMenuClose}
        >
          {columns &&
            columns.map((item: IListColumn) => (
              <MenuItem
                key={item.id}
                onClick={() => handleColumnsChanged(item.id)}
              >
                <Checkbox checked={!item.hidden} value={item.label} />
                <FormattedMessage id={item.label} />
              </MenuItem>
            ))}
        </Menu>
      </div>
    );
  }
}
