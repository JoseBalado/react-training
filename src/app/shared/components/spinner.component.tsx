import * as React from "react";
import { WithStyles, Theme, createStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "20px",
      margin: "auto",
      zIndex: 10
    },
    circle: {
      width: "18px",
      height: "18px",
      backgroundColor: `${theme.palette.primary.main}`,
      borderRadius: "100%",
      display: "inline-block",
      animation: `bounce 1.4s infinite ${theme.transitions.easing.easeInOut} both`
    },
    circleOne: {
      animationDelay: "-0.32s"
    },
    circleTwo: {
      animationDelay: "-0.16s"
    },
    message: {
      padding: theme.spacing(4),
      letterSpacing: "1px",
      fontSize: theme.spacing(3)
    },
    "@keyframes bounce": {
      "0%": {
        transform: "scale(0)"
      },
      "40%": {
        transform: "scale(1)"
      },
      "80%": {
        transform: "scale(0)"
      },
      "100%": {
        transform: "scale(0)"
      }
    }
  });

interface ISpinnerProps extends WithStyles<typeof styles> {}

export const SpinnerSFC: React.SFC<ISpinnerProps> = ({
  children,
  classes: { root, circle, message, circleOne, circleTwo }
}) => (
  <div className={root}>
    <div className={`${circle} ${circleOne}`} />
    <div className={`${circle} ${circleTwo}`} />
    <div className={circle} />

    {children && <div className={message}>{children}</div>}
  </div>
);

export const SpinnerComponent = withStyles(styles)(SpinnerSFC);
