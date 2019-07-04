import React from "react";
import ErrorOutlineSharp from "@material-ui/icons/ErrorOutlineSharp";
import { FormattedMessage } from "react-intl";
import { goBack } from "connected-react-router";
import { connect } from "react-redux";
import classNames from "classnames";

import {
  Avatar,
  createStyles,
  CssBaseline,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative"
    },
    flex: {
      flex: 1
    },
    main: {
      width: "100%",
      display: "block" // Fix IE 11 issue.
    },
    paper: {
      width: "auto",
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      padding: `${theme.spacing(4)}px ${theme.spacing(3)}px ${theme.spacing(
        3
      )}px`
    },
    avatar: {
      margin: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main
    }
  });

type DispatchProps = typeof mapDispatchToProps;

export interface IFullScreenDialogProps
  extends DispatchProps,
    WithStyles<typeof styles> {}

export class FullScreenDialogComponent extends React.Component<
  IFullScreenDialogProps
> {
  state = {
    open: true
  };

  handleClose = () => {
    this.props.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classNames(classes.main, "full-screen-error")}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ErrorOutlineSharp />
          </Avatar>
          <Typography component="h1" variant="h5">
            <FormattedMessage id="ERRORS.UNAUTHORISED.TITLE" />
          </Typography>
          <FormattedMessage id="ERRORS.UNAUTHORISED.BODY" />
        </Paper>
      </main>
    );
  }
}

const mapDispatchToProps = {
  goBack
};
export const FullScreenDialog = connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(FullScreenDialogComponent));
