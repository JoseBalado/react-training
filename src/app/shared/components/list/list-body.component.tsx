import * as React from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  WithStyles,
  Theme,
  createStyles,
  withStyles
} from "@material-ui/core";
import _ from "lodash";
import classNames from "classnames";
import { Link } from "..";
import {
  ListSpinnerComponent,
  EmptyPropertyComponent,
  ListEmptyComponent
} from "..";
import { IListColumn } from "../../../models";
import { formatDate, formatDateTime } from "../../utils";
import { SubdirectoryArrowRightOutlined } from "@material-ui/icons";
import { DEFAULT_ITEMS_PER_PAGE } from "../../constants";

const styles = (theme: Theme) =>
  createStyles({
    tableRow: {
      "&:hover": {
        background: theme.palette.grey[200]
      }
    },
    tableCell: {
      "& a": {
        textDecoration: "none",
        color: theme.palette.text.primary
      },
      height: "48px",
      border: "0"
    },
    tableRowStriped: {
      background: theme.palette.primary[100] || theme.palette.grey[200]
    },
    stickyCol: {
      position: "sticky",
      background: theme.palette.background.paper,
      left: -theme.spacing(3),
      "&:hover": {
        background: theme.palette.secondary[50] || theme.palette.grey[200]
      },
      zIndex: 99,
      boxShadow: "2px 6px 5px 1px rgba(224,224,224,1)"
    }
  });
export interface IListBodyProps extends WithStyles<typeof styles> {
  data: any[];
  loading: boolean;
  limit: number;
  columns: IListColumn[];
  childRowKey?: string;
  childColumns?: IListColumn[];
  sticky?: boolean;
}

export class ListBody extends React.Component<IListBodyProps> {
  render = () => {
    const { data, loading, columns, childRowKey, childColumns } = this.props;
    const limit = this.props.limit || DEFAULT_ITEMS_PER_PAGE;
    return (
      <ListSpinnerComponent
        loading={loading}
        limit={limit}
        columns={columns.length}
      >
        <TableBody className="ListBodyComponent">
          {data &&
            data.map((item, index) => [
              this.getRow(item, index, columns),
              childRowKey &&
                childColumns &&
                item[childRowKey] &&
                item[childRowKey].map((childItem: any) =>
                  this.getRow(childItem, index, childColumns, true)
                )
            ])}
          {!data.length && (
            <ListEmptyComponent limit={limit} columns={columns.length} />
          )}
        </TableBody>
      </ListSpinnerComponent>
    );
  };

  getRow = (
    item: any,
    index: number,
    columns: IListColumn[],
    child?: boolean
  ) => {
    const {
      classes: { tableCell, tableRow, tableRowStriped, stickyCol },
      sticky
    } = this.props;

    return (
      <TableRow
        className={classNames(tableRow, {
          [tableRowStriped]: index % 2 !== 0
        })}
        key={
          item.id ||
          `${index}_${Math.floor(Math.random() * 100)}_${String.fromCharCode(
            Math.floor(Math.random() * 25) + 65
          )}`
        }
      >
        {columns.map(
          (property, colIndex) =>
            !property.hidden && (
              <TableCell
                className={classNames(tableCell, {
                  [tableRowStriped]:
                    sticky && colIndex === 0 && index % 2 !== 0,
                  [stickyCol]: sticky && colIndex === 0
                })}
                key={property.id}
              >
                {child && colIndex === 0 && <SubdirectoryArrowRightOutlined />}
                {item[property.id] || property.component ? (
                  this.getItem(item, property)
                ) : (
                  <EmptyPropertyComponent />
                )}
              </TableCell>
            )
        )}
      </TableRow>
    );
  };

  getItem = (
    item: any,
    { id, key, type, isTitle, toBasePath, component }: IListColumn
  ) => {
    const value = key ? _.get(item, key) : item[id];

    if (component) {
      return React.cloneElement(component, { item });
    }

    if (isTitle && toBasePath) {
      return <Link to={`${toBasePath}/${item.id || item._id}`}>{value}</Link>;
    }
    switch (type) {
      case "string":
        return typeof value === "string" ? value : <EmptyPropertyComponent />;
      case "date":
        return formatDate(value);
      case "date-time":
        return formatDateTime(value);
      case "number":
        return typeof value === "number" ? value : <EmptyPropertyComponent />;
      case "boolean":
        return typeof value === "boolean" ? (
          value.toString()
        ) : (
          <EmptyPropertyComponent />
        );
      default:
        return <EmptyPropertyComponent />;
    }
  };
}

export const ListBodyComponent = withStyles(styles)(ListBody);
