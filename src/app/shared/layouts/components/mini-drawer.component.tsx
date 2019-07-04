import React from "react";
import classNames from "classnames";

import {
  createStyles,
  Drawer,
  Grid,
  Theme,
  WithStyles,
  withStyles,
  withWidth
} from "@material-ui/core";
import { DrawerMenu } from "./mini-drawer-menu.component";
import { DRAWER_WIDTH } from "../../constants";
import { Header } from "./header.component";
import { Link } from "../../components";
import { WithWidth } from "@material-ui/core/withWidth";
import logo from "../../../../assets/images/logo.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    logoimg: {
      height: theme.spacing(6) + 2
    },
    logoContainer: {
      maxHeight: theme.spacing(6) + 2,
      margin: theme.spacing(1),
      textAlign: "center"
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      whiteSpace: "nowrap",
      zIndex: theme.zIndex["modal"]
    },
    drawerOpen: {
      width: DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(6) + 9,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8) + 1
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: `0px ${theme.spacing(1)}px`,
      ...theme.mixins.toolbar
    },
    content: {
      margin: `${theme.spacing(10)}px ${theme.spacing(1)}px ${theme.spacing(
        2
      )}px 0px`,
      overflowX: "hidden"
    }
  });

export interface IMiniDrawerProps
  extends ITitleProps,
    WithStyles<typeof styles> {
  hideContainer?: boolean;
}

export interface ITitleProps {
  pageTitle?: string;
}

interface IMiniDrawerState {
  open: boolean;
}

export class MiniDrawerComponent extends React.Component<
  IMiniDrawerProps & WithWidth,
  IMiniDrawerState
> {
  state = {
    open: false
  };

  handleDrawerState = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { hideContainer } = this.props;
    return !hideContainer ? this.getViewWithDrawer() : this.props.children;
  }

  getViewWithDrawer = () => {
    const {
      classes: {
        root,
        content,
        drawer,
        drawerClose,
        drawerOpen,
        logoimg,
        logoContainer,
        toolbar
      },
      pageTitle,
      width
    } = this.props;
    const { open } = this.state;
    return (
      <div className={`'mini-drawer' ${root}`}>
        <Header
          handleDrawerState={this.handleDrawerState}
          drawerOpen={open}
          title={pageTitle}
        />
        <Drawer
          variant={width === "xs" || width === "sm" ? "temporary" : "permanent"}
          className={classNames(drawer, {
            [drawerOpen]: this.state.open,
            [drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [drawerOpen]: this.state.open,
              [drawerClose]: !this.state.open
            })
          }}
          open={open}
          onClose={this.handleDrawerState}
        >
          <div className={logoContainer}>
            <Link to="/home">
              <img className={logoimg} src={logo} />
            </Link>
          </div>
          <DrawerMenu />
        </Drawer>
        <Grid container={true} className={content} spacing={2}>
          <div className={toolbar} />
          {this.props.children}
        </Grid>
      </div>
    );
  };
}

export const MiniDrawer = withWidth()(withStyles(styles)(MiniDrawerComponent));
