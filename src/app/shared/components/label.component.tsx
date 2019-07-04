import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';

export interface ILabelProps extends TypographyProps {
  id: string;
  values?: any;
}

export interface ILabelState {}

export class LabelComponent extends React.Component<ILabelProps, ILabelState> {
  render = () => {
    const { id, values, variant, color } = this.props;
    return (
      <Typography variant={variant} color={color}>
        <FormattedMessage id={id} values={values} />
      </Typography>
    );
  };
}
