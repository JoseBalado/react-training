import * as React from "react";
import { SpinnerWrapperComponent } from "./spinner-wrapper.component";
import { IListColumn } from "../../models";
import { EmptyPropertyComponent } from "./empty-property.component";
import { formatDate, formatDateTime } from "../utils";
import { Grid } from "@material-ui/core";
import { LabelComponent } from "./label.component";
import { PaperWrapperComponent } from "./paper-wrapper.component";
import { get as _get } from "lodash";
import { Link } from "./link.component";

export interface IGridListProps {
  data: any[];
  itemDetails: IItemDetails[];
  loading?: boolean;
  fullWidth?: boolean;
}

export interface IItemDetails extends IListColumn {
  color?:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | undefined;
}

export interface IGridListState {}

export class GridListComponent extends React.Component<
  IGridListProps,
  IGridListState
> {
  render() {
    const { data, loading, fullWidth } = this.props;
    return (
      <SpinnerWrapperComponent loading={loading || false}>
        <Grid container={true} spacing={2}>
          {data &&
            data.map((item: any, index: number) => (
              <Grid
                key={
                  item.id ||
                  `${index}_${Math.floor(
                    Math.random() * 100
                  )}_${String.fromCharCode(
                    Math.floor(Math.random() * 25) + 65
                  )}`
                }
                item={true}
                xs={12}
                md={fullWidth ? 12 : 6}
                lg={fullWidth ? 12 : 4}
              >
                <PaperWrapperComponent>
                  <Grid container={true} spacing={2}>
                    {this.getItem(item)}
                  </Grid>
                </PaperWrapperComponent>
              </Grid>
            ))}
        </Grid>
      </SpinnerWrapperComponent>
    );
  }

  getItem = (item: any) => {
    const { itemDetails } = this.props;
    return itemDetails.map(
      (key: IItemDetails) =>
        !key.hidden && (
          <Grid
            key={item[key.id]}
            item={true}
            xs={12}
            md={key.isTitle ? 12 : 6}
            xl={key.isTitle ? 12 : 4}
          >
            <LabelComponent id={key.label} color={key.color || "secondary"} />
            {this.getItemData(item, key)}
          </Grid>
        )
    );
  };

  getItemData = (
    item: any,
    { id, key, type, isTitle, toBasePath, component }: IItemDetails
  ) => {
    const value = key ? _get(item, key) : item[id];

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
