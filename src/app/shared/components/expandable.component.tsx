import * as React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';

const styles = (theme: Theme) =>
  createStyles({
    expandTitle: {
      marginLeft: theme.spacing(3),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  });

export interface IExpandableComponentProps extends WithStyles<typeof styles> {
  titleIcon?: React.ReactNode;
  title: string;
  expanded?: boolean;
}

export interface IExpandableComponentState {}

class Expandable extends React.Component<
  IExpandableComponentProps,
  IExpandableComponentState
> {
  render() {
    const {
      classes: { expandTitle },
      titleIcon,
      title,
      children,
      expanded
    } = this.props;

    return (
      <ExpansionPanel defaultExpanded={expanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          {!!titleIcon && titleIcon}
          <Typography color="primary" className={expandTitle}>
            <FormattedMessage id={title} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export const ExpandableComponent = withStyles(styles)(Expandable);
