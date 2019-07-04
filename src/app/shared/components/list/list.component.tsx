import * as React from "react";
import {
  Table,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";

import { IPaginationState, IListColumn, IListOrder } from "../../../models";
import { ListHeadComponent } from "./list-head.component";
import { ListFooterComponent } from "./list-footer.component";
import { ListToolbarComponent } from "./list-toolbar.component";
import { ListBodyComponent } from "./list-body.component";
import { find as _find, orderBy as _orderBy } from "lodash";
import { preventSubmit } from "../../utils";
import { IListFilterOption } from "./list-filter-menu.component";
import { DEFAULT_ITEMS_PER_PAGE } from "../../constants";
import { GridListComponent } from "../grid-list.component";

const styles = (theme: Theme) =>
  createStyles({
    table: {
      minWidth: 500,
      background: "white",
      boxShadow: theme.shadows[1]
    },
    tableWrapper: {
      overflowX: "auto",
      padding: theme.spacing(1)
    }
  });

type IListChildrenProps = {
  body?: React.ReactNode;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 *
 *
 * @export
 * @interface IListProps
 * @extends {WithStyles<typeof styles>}
 */
export interface IListProps extends WithStyles<typeof styles> {
  /**
   *
   *
   * @type {IPaginationState}
   * @memberof IListProps
   */
  pagination?: IPaginationState;
  /**
   *
   *
   * @type {number}
   * @memberof IListProps
   */
  totalItems: number;
  /**
   * called when the table pagination state changed
   *
   * @memberof IListProps
   */
  tableChange?: (state: IPaginationState) => void;
  /**
   * list
   *
   * @type {IListColumn[]}
   * @memberof IListProps
   */
  columns: IListColumn[];
  /**
   *
   *
   * @type {any[]}
   * @memberof IListProps
   */
  data: any[];
  /**
   *
   *
   * @type {boolean}
   * @memberof IListProps
   */
  loading: boolean;
  /**
   *
   * The child roe object
   * @type {string}
   * @memberof IListProps
   */
  childRowKey?: string;
  /**
   * Columns for child items
   *
   * @type {IListColumn[]}
   * @memberof IListProps
   */
  childColumns?: IListColumn[];
  /**
   * Hides the Toolbar if true
   *
   * @type {boolean}
   * @memberof IListProps
   */
  hideToolbar?: boolean;
  /**
   *
   *
   * @type {boolean}
   * @memberof IListProps
   */
  hideFilters?: boolean;
  /**
   * Hides the Title if true
   *
   * @type {boolean}
   * @memberof IListProps
   */
  hideTitle?: boolean;
  /**
   * If Pagination not require the Title also changes
   *
   * @type {boolean}
   * @memberof IListProps
   */
  hidePagination?: boolean;
  /**
   * Custom title without pagination and changes only item name with pagination
   *
   * @type {string}
   * @memberof IListProps
   */
  title?: string;
  /**
   *
   *
   * @type {IListChildrenProps}
   * @memberof IListProps
   */
  children?: IListChildrenProps;
  /**
   * Options to be shown when filters are clicked
   *
   * @type {IListFilterOption[]}
   * @memberof IListProps
   */
  filterList?: IListFilterOption[];
  /**
   * Function to be called when searching in list component
   *
   * @memberof IListProps
   */
  searchSubmit?: (value: any) => void;

  /**
   * The component handles pagination and search internally if true
   *
   * @type {boolean}
   * @memberof IListProps
   */
  handlePagination?: boolean;

  /**
   * The first column stick on the left if true
   *
   * @type {boolean}
   * @memberof IListProps
   */
  stickyColumn?: boolean;
}

export interface IListState {
  columns: IListColumn[];
  internalData?: any[];
  pagination: IPaginationState;
  showGrid: boolean;
}

export class List extends React.Component<IListProps, IListState> {
  initialPaginationState = {
    limit: DEFAULT_ITEMS_PER_PAGE,
    offset: 0,
    sort: this.props.columns[0].id,
    order: IListOrder.ASC,
    page: 0
  };

  state = {
    columns: this.props.columns,
    internalData: [],
    pagination: this.props.pagination || this.initialPaginationState,
    showGrid: false
  };

  componentDidMount = () => {
    if (this.props.handlePagination) {
      this.handleTableChanged(this.initialPaginationState);
    }
  };

  /**
   * Called when Header of the columns clicked
   *
   * @memberof List
   */
  handleSortClick = (sort: string) => {
    const { tableChange, handlePagination } = this.props;
    const pagination = this.state.pagination;

    const order: IListOrder =
      pagination.sort === sort && pagination.order === IListOrder.ASC
        ? IListOrder.DESC
        : IListOrder.ASC;

    if (handlePagination) {
      this.handleTableChanged({ ...this.initialPaginationState, sort, order });
    } else if (tableChange) {
      tableChange({ ...this.initialPaginationState, sort, order });
    }
  };

  handleTableChanged = (pagination: IPaginationState) => {
    const { data } = this.props;

    this.setState({
      pagination: pagination,
      internalData: _orderBy(data, [pagination.sort], [pagination.order]).slice(
        pagination.offset,
        pagination.offset + DEFAULT_ITEMS_PER_PAGE
      )
    });
  };

  /**
   * Called when user selects or deselects to see a column
   *
   * @memberof List
   */
  handleColumnsChanged = (id: string) => {
    const columns = this.state.columns.map((item: IListColumn) => {
      if (item.id === id) {
        item.hidden = !item.hidden;
      }
      return item;
    });

    this.setState({ columns: columns });
  };

  componentDidUpdate = (prevProps: IListProps) => {
    const { data, pagination, handlePagination } = this.props;
    if (data !== prevProps.data && handlePagination) {
      this.handleTableChanged(this.state.pagination);
    }

    if (
      pagination &&
      pagination !== prevProps.pagination &&
      !handlePagination
    ) {
      this.setState({ pagination });
    }
  };

  handleShowGrid = () => {
    this.setState({ showGrid: !this.state.showGrid });
  };

  render = () => {
    const {
      totalItems,
      tableChange,
      classes: { table, tableWrapper },
      children,
      childColumns,
      childRowKey,
      searchSubmit = preventSubmit,
      data,
      loading,
      hideToolbar,
      hideFilters,
      hideTitle,
      hidePagination,
      filterList,
      title = "HEADERS.LIST",
      handlePagination,
      stickyColumn
    } = this.props;

    const { columns, internalData, pagination, showGrid } = this.state;
    const { body, toolbar, footer } = children
      ? children
      : ({} as IListChildrenProps);

    return (
      <div className="ListComponent">
        <div className={tableWrapper}>
          {toolbar
            ? toolbar
            : !hideToolbar && (
                <ListToolbarComponent
                  showGrid={showGrid}
                  handleShowGrid={this.handleShowGrid}
                  state={pagination}
                  title={title}
                  totalItems={totalItems}
                  searchSubmit={searchSubmit}
                  hideFilters={hideFilters}
                  hideTitle={hideTitle}
                  hidePagination={hidePagination}
                  columns={columns}
                  filterList={filterList}
                  handleColumnsChanged={this.handleColumnsChanged}
                />
              )}
          {showGrid ? (
            <GridListComponent
              data={handlePagination ? internalData : data}
              loading={loading}
              itemDetails={columns}
            />
          ) : (
            <Table className={table}>
              <ListHeadComponent
                columns={columns}
                sortClick={this.handleSortClick}
                sort={pagination.sort}
                order={pagination.order}
                sticky={stickyColumn}
              />
              {body ? (
                body
              ) : (
                <ListBodyComponent
                  loading={loading}
                  data={handlePagination ? internalData : data}
                  limit={pagination.limit}
                  columns={columns}
                  childColumns={childColumns}
                  childRowKey={childRowKey}
                  sticky={stickyColumn}
                />
              )}
            </Table>
          )}
          <ListFooterComponent
            components={footer}
            pagination={pagination}
            totalItems={totalItems}
            paginationChange={
              tableChange ? tableChange : this.handleTableChanged
            }
            hidePagination={hidePagination}
          />
        </div>
      </div>
    );
  };
}

export const ListComponent = withStyles(styles)(List);
