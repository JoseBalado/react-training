import * as React from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  Theme,
  WithStyles,
  createStyles,
  withStyles
} from "@material-ui/core";
import { Link } from "../../components/link.component";
import { LabelComponent } from "../../components";

export interface IDrawerMenuItem {
  icon?: React.ReactElement<any>;
  title: string;
  link: string;
  externalLink?: boolean;
}
export interface IDrawerMenuListProps {
  data: IDrawerMenuItem[];
}

const styles = (theme: Theme) =>
  createStyles({
    linkStyle: {
      "& a": {
        textDecoration: "none",
        color: theme.palette.text.primary
      }
    },
    itemStyle: {
      "&:hover": {
        background: (theme.palette.secondary as any)["50"]
      }
    }
  });

export const DrawerMenuListSFC: React.SFC<
  IDrawerMenuListProps & WithStyles<typeof styles>
> = ({ data, classes: { linkStyle, itemStyle } }) => {
  return (
    <List className={linkStyle}>
      {data.map(item => {
        return (
          <Link
            to={item.link}
            key={item.title}
            externalLink={item.externalLink}
          >
            {getListItem(item, itemStyle)}
          </Link>
        );
      })}
    </List>
  );
};

export const DrawerMenuList = withStyles(styles)(DrawerMenuListSFC);

export const getListItem = (item: IDrawerMenuItem, className: string) => {
  return (
    <ListItem className={className} button={true}>
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <LabelComponent id={item.title} />
    </ListItem>
  );
};
