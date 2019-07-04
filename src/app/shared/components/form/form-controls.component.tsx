import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
    },
    requiredFileds: {
      margin: 0,
      fontStyle: "italic",
      flex: 1
    },
    buttons: {
      "&:not(:last-child)": {
        marginRight: theme.spacing(4)
      }
    }
  });

interface IFormControlsProps extends WithStyles<typeof styles> {
  displayRequiredField: boolean;
}

export const FormControlsSFC: React.SFC<IFormControlsProps> = ({
  displayRequiredField,
  children,
  classes: { root, requiredFileds, buttons }
}) => (
  <div className={root}>
    {displayRequiredField && (
      <Typography color="initial" className={requiredFileds}>
        <FormattedMessage id="MESSAGES.DENOTES_REQUIRED_FIELDS" />
      </Typography>
    )}

    <div className={buttons}>{children}</div>
  </div>
);

export const FormControlsComponent = withStyles(styles)(FormControlsSFC);
