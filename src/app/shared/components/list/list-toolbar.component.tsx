import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Typography,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  IconButton
} from "@material-ui/core";

import { IPaginationState, IListColumn } from "../../../models";
import { ListColumnMenu } from "./list-column-menu.component";
import {
  ListFilterMenu,
  IListFilterOption
} from "./list-filter-menu.component";
import { ExpandableSearchComponent } from "../expandable-search.component";
import { GridOnOutlined, GridOffOutlined } from "@material-ui/icons";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: `${theme.spacing(3)}px 0`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      left: 0
    },
    iconButton: {
      backgroundColor: "white",
      width: theme.spacing(6),
      height: theme.spacing(6),
      boxShadow: theme.shadows[1],
      borderRadius: 0,
      "&:hover": {
        background: (theme.palette.secondary as any)[50]
      }
    },
    grow: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "flex-end",
      position: "sticky",
      right: 0
    }
  });

export interface ListToolbarProps extends WithStyles<typeof styles> {
  state: IPaginationState;
  title: string;
  totalItems: number;
  hidePagination?: boolean;
  searchSubmit: (value: any) => void;
  handleColumnsChanged: (value: any) => void;
  hideTitle?: boolean;
  hideFilters?: boolean;
  columns: IListColumn[];
  filterList?: IListFilterOption[];
  showGrid: boolean;
  handleShowGrid: () => void;
}

export interface ListToolbarState {}

export class ListToolbar extends React.Component<
  ListToolbarProps,
  ListToolbarState
> {
  state = {};

  render = () => {
    const {
      state: { limit, offset, page },
      title,
      hidePagination,
      totalItems,
      hideTitle,
      hideFilters,
      filterList,
      columns,
      handleColumnsChanged,
      searchSubmit,
      showGrid,
      handleShowGrid,
      classes: { root, iconButton, grow }
    } = this.props;
    const values = hidePagination ? { total: totalItems } : {};
    return (
      <div className={root}>
        {!hideTitle && (
          <Typography variant="h5">
            {!hidePagination && (
              <FormattedMessage
                id="LABELS.PAGINATION_INFO"
                values={{
                  start: totalItems > 0 ? offset + 1 : 0,
                  end:
                    limit * (page + 1) > totalItems
                      ? totalItems
                      : limit * (page + 1),
                  total: totalItems
                }}
              />
            )}
            <FormattedMessage id={title} values={values} />
          </Typography>
        )}
        {!hideFilters && (
          <div className={grow}>
            <ExpandableSearchComponent searchSubmit={searchSubmit} />
            {filterList && (
              <ListFilterMenu filterList={filterList} iconStyle={iconButton} />
            )}
            <ListColumnMenu
              iconStyle={iconButton}
              columns={columns}
              handleColumnsChanged={handleColumnsChanged}
            />
            <IconButton className={iconButton} onClick={handleShowGrid}>
              {!showGrid ? (
                <GridOnOutlined color="default" />
              ) : (
                <GridOffOutlined color="default" />
              )}
            </IconButton>
          </div>
        )}
      </div>
    );
  };
}

export const ListToolbarComponent = withStyles(styles)(ListToolbar);
