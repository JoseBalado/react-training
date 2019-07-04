import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { FilterListOutlined } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';

export interface IListFilterMenuProps {
  filterList: IListFilterOption[];
  iconStyle?: string;
}

interface IListFilterMenuState {
  filterEl: null | HTMLElement;
}

export interface IListFilterOption {
  label: string;
  value?: string;
  onSelected?: (value: IListFilterOption) => void;
}

export class ListFilterMenu extends React.Component<
  IListFilterMenuProps,
  IListFilterMenuState
> {
  state = { filterEl: null };

  handleFilterMenuOpen = (event: any) => {
    this.setState({ filterEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ filterEl: null });
  };

  render() {
    const { filterList, iconStyle } = this.props;
    const { filterEl } = this.state;
    const isFilterMenuOpen = Boolean(filterEl);
    return (
      <div className="ListFilterMenu">
        <IconButton
          className={iconStyle ? iconStyle : ''}
          onClick={this.handleFilterMenuOpen}
        >
          <FilterListOutlined />
        </IconButton>
        <Menu
          anchorEl={filterEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isFilterMenuOpen}
          onClose={this.handleMenuClose}
        >
          {filterList &&
            filterList.map((item: IListFilterOption) => (
              <MenuItem
                key={item.value}
                onClick={() => item.onSelected && item.onSelected(item)}
              >
                <FormattedMessage id={item.label} />
              </MenuItem>
            ))}
        </Menu>
      </div>
    );
  }
}
