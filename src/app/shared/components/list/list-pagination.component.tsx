import * as React from "react";
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
  IconButton
} from "@material-ui/core";
import { range as _range } from "lodash";
import { DEFAULT_ITEMS_PER_PAGE } from "../../constants";
import { IPaginationState } from "../../../models";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { SelectComponent, ISelectProps } from "../form";
import { FormattedMessage } from "react-intl";

const styles = (theme: Theme) =>
  createStyles({
    selectStyle: {
      height: theme.spacing(6),
      width: theme.spacing(6)
    },
    root: {
      display: "flex",
      alignItems: "center"
    }
  });

export interface IListPaginationProps {
  pagination: IPaginationState;
  totalItems: number;
  paginationChange: (state: IPaginationState) => void;
}

export interface IListPaginationState {}

export class ListPagination extends React.Component<
  IListPaginationProps & WithStyles<typeof styles>
> {
  handleChangePage = (page: number) => {
    const { paginationChange, pagination } = this.props;
    paginationChange({
      ...pagination,
      page,
      offset: page * pagination.limit
    });
  };

  handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.handleChangePage(this.props.pagination.page - 1);
  };

  handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.handleChangePage(this.props.pagination.page + 1);
  };

  handlePageSelect = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    child: React.ReactNode
  ) => {
    event.preventDefault();
    this.handleChangePage(parseInt(event.target.value as string, 10) - 1);
  };

  getPageOptions = () => {
    const { totalItems } = this.props;
    const numberOfPages = Math.ceil(totalItems / DEFAULT_ITEMS_PER_PAGE) + 1;
    return _range(1, numberOfPages);
  };
  render() {
    const {
      totalItems,
      pagination: { page },
      classes: { root, selectStyle }
    } = this.props;
    const pages = Math.ceil(totalItems / DEFAULT_ITEMS_PER_PAGE);
    return (
      <div className={root}>
        <IconButton
          className="prevButton"
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
        >
          <ArrowLeft />
        </IconButton>
        <SelectComponent
          className={selectStyle}
          {...{
            clear: true,
            selection: page + 1,
            selectOptions: this.getPageOptions(),
            emptyOption: false,
            input: {
              value: page + 1
            }
          } as ISelectProps}
          onChange={this.handlePageSelect}
        />
        <FormattedMessage
          id="LABELS.PAGINATION_FOOTER"
          values={{
            pages: pages
          }}
        />
        <IconButton
          className="nextButton"
          onClick={this.handleNextButtonClick}
          disabled={page >= totalItems / DEFAULT_ITEMS_PER_PAGE - 1}
        >
          <ArrowRight />
        </IconButton>
      </div>
    );
  }
}

export const ListPaginationComponent = withStyles(styles)(ListPagination);
