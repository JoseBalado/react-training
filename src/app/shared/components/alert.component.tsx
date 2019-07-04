import * as React from "react";
import {
  Snackbar,
  SnackbarContent,
  IconButton,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import { noop as _noop } from "lodash";

import { IAlert } from "../../models";
import { FormattedMessage } from "react-intl";

const styles = (theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.dark
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(3)
    },
    body: {
      display: "flex",
      alignItems: "center"
    },
    snackbar: {
      margin: theme.spacing(3)
    },
    strong: {
      marginRight: theme.spacing(3)
    },
    detail: { marginTop: theme.spacing(3), color: "white" }
  });

interface IAlertProps extends IAlert, WithStyles<typeof styles> {
  onCloseClick: (id: string) => void;
  validationErrors?: object;
}

export const AlertSFC: React.SFC<IAlertProps> = ({
  id,
  variant,
  dismissible,
  title,
  message,
  timeout,
  classes,
  classes: { iconVariant, snackbar, strong, icon, detail, body },
  onCloseClick,
  validationErrors
}) => {
  const handleClose = () => {
    onCloseClick(id);
  };

  const handleOnClickAway = () => {
    _noop();
  };

  const getIcon = (value: string) => {
    switch (value) {
      case "warning":
        return <WarningIcon className={iconVariant} />;
      case "error":
        return <ErrorIcon className={iconVariant} />;
      case "success":
        return <CheckCircleIcon className={iconVariant} />;
      default:
        return <InfoIcon className={iconVariant} />;
    }
  };
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={timeout ? timeout : 5000}
      onClose={handleClose}
      className={`Snackbar ${snackbar}`}
      ClickAwayListenerProps={{ onClickAway: handleOnClickAway }}
    >
      {validationErrors ? (
        <SnackbarContent
          className={classes[variant]}
          message={
            <>
              <span className={body}>
                {getIcon(variant)}
                {title && (
                  <strong className={strong}>
                    <FormattedMessage id={title} />
                  </strong>
                )}
              </span>
              <ul>
                {Object.keys(validationErrors).map((key: string) => (
                  <li key={key}>{`${key} ${
                    (validationErrors as any)[key][0]
                  }`}</li>
                ))}
              </ul>
            </>
          }
          action={
            dismissible && (
              <IconButton onClick={handleClose}>
                <CloseIcon className={icon} />
              </IconButton>
            )
          }
        />
      ) : (
        <SnackbarContent
          className={classes[variant]}
          message={
            <>
              <span className={body}>
                {getIcon(variant)}
                {title && (
                  <strong className={strong}>
                    <FormattedMessage id={title} />
                  </strong>
                )}
              </span>
              {message && (
                <Typography className={detail}>
                  <FormattedMessage id={message} />
                </Typography>
              )}
            </>
          }
          action={
            dismissible && (
              <IconButton onClick={handleClose}>
                <CloseIcon className={icon} />
              </IconButton>
            )
          }
        />
      )}
    </Snackbar>
  );
};

export const AlertComponent = withStyles(styles)(AlertSFC);
