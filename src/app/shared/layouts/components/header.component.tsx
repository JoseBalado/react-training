import * as React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  createStyles,
  IconButton,
  Theme,
  Toolbar,
  WithStyles,
  withStyles,
  withWidth
} from "@material-ui/core";
import classNames from "classnames";
import { DRAWER_WIDTH } from "../../constants";
import { WithWidth } from "@material-ui/core/withWidth";
import { LabelComponent } from "../../components";

export interface IHeaderComponentProps {
  handleDrawerState: () => void;
  drawerOpen: boolean;
  title?: string;
}

export interface IHeaderComponentState {
  anchorEl: null | HTMLElement;
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: "linear-gradient( to left,#0072ff,#00c6ff)",
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(8) + 1,
        width: `calc(100% - ${theme.spacing(8) + 1}px)`
      },
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    }
  });

export class HeaderComponent extends React.Component<
  IHeaderComponentProps & WithStyles<typeof styles> & WithWidth,
  IHeaderComponentState
> {
  render() {
    const {
      classes: { appBar, appBarShift, menuButton },
      drawerOpen,
      handleDrawerState,
      title
    } = this.props;

    return (
      <>
        <AppBar
          position="fixed"
          className={classNames("mini-drawer", appBar, {
            [appBarShift]: drawerOpen
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerState}
              className={menuButton}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <LabelComponent
              variant="h6"
              id={title ? title : "PAGES.MAIN_TITLE"}
            />
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export const Header = withWidth()(withStyles(styles)(HeaderComponent));
