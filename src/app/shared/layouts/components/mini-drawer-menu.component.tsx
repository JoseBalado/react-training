import * as React from "react";
import { DrawerMenuList } from "./drawer-menu-list.component";
import { getNavMenu } from "../../utils";

export interface DrawerMenuListProps {}

export const DrawerMenu: React.SFC<DrawerMenuListProps> = () => (
  <div className="drawer-menu">
    <DrawerMenuList data={getNavMenu()} />
  </div>
);
