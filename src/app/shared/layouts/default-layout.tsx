import * as React from "react";
import moment from "moment";
import { Route, RouteProps } from "react-router-dom";
import { WithStyles, createStyles, Theme, withStyles } from "@material-ui/core";
import { withErrorHandler } from "../hocs";
import { AlignedRowComponent, LabelComponent } from "../components";
import { MiniDrawer } from "./components";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
      height: "100%"
    },
    footer: {
      padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
      backgroundColor: theme.palette.background.default,
      position: "fixed",
      bottom: -theme.spacing(1),
      right: 0
    }
  });

interface IDefaultLayoutProps extends RouteProps {}

export const DefaultLayoutSFC: React.SFC<
  IDefaultLayoutProps & WithStyles<typeof styles>
> = ({ classes: { root, footer }, children, ...rest }) => {
  return (
    <Route {...rest as RouteProps}>
      <>
        <MiniDrawer>
          <div className={root}>{children}</div>
        </MiniDrawer>
        <AlignedRowComponent
          className={footer}
          rightComponents={
            <LabelComponent
              id="LABELS.COPYRIGHT"
              color="textSecondary"
              values={{ year: moment().year() }}
            />
          }
        />
      </>
    </Route>
  );
};

export const DefaultLayout = withStyles(styles)(
  withErrorHandler(DefaultLayoutSFC)
);
