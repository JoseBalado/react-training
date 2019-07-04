import * as React from "react";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
  Tabs,
  Tab,
  withWidth,
  AppBar
} from "@material-ui/core";
import { WithWidth } from "@material-ui/core/withWidth";

import { ITab } from "../../models";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.common.white,
      margin: `${theme.spacing(3)}px 0`
    },
    scrollButtons: {
      color: theme.palette.primary.main
    }
  });

export interface ITabsProps extends WithStyles<typeof styles>, WithWidth {
  tabIndex: number;
  tabs: ITab[];
  onTabChange: (event: any, value: number) => void;
  indicatorColor?: "secondary" | "primary" | string;
  textColor?: "secondary" | "primary" | "inherit" | string;
  variant?: "standard" | "scrollable" | "fullWidth";
  scrollable?: boolean;
  ScrollButtonComponent?: React.ReactType;
  scrollButtonsType?: "auto" | "on" | "off";
}

export const TabBarSFC: React.SFC<ITabsProps> = ({
  classes: { appBar, scrollButtons },
  tabIndex,
  tabs,
  onTabChange,
  width,
  children,
  indicatorColor = "primary",
  textColor = "primary",
  variant = width === "xs" ? "scrollable" : "fullWidth",
  scrollButtonsType = "on",
  ScrollButtonComponent,
  scrollable
}) => (
  <>
    <AppBar position="static" className={appBar}>
      <Tabs
        value={tabIndex}
        onChange={onTabChange}
        indicatorColor={indicatorColor}
        textColor={textColor}
        variant={variant}
        ScrollButtonComponent={ScrollButtonComponent}
        scrollButtons={scrollButtonsType}
        classes={{ scrollButtons }}
      >
        {tabs.map(({ label, icon }, index) => (
          <Tab key={index} label={label} icon={icon ? icon : undefined} />
        ))}
      </Tabs>
    </AppBar>
    {children}
  </>
);

export const TabBarComponent = withWidth()(withStyles(styles)(TabBarSFC));
