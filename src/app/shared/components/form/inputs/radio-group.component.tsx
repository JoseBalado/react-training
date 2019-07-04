import * as React from 'react';
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { IFieldProps } from '../../../../models';
import { renderFieldError } from '../../../utils';

/**
 *
 *
 * @export
 * @interface IRadioGroupProps
 * @extends {IFieldProps}
 */
export interface IRadioGroupProps extends IFieldProps {
  /**
   * Displays options in rows if true
   *
   * @type {boolean}
   * @memberof IRadioGroupProps
   */
  row?: boolean;
}

export const RadioGroupComponent: React.SFC<IRadioGroupProps> = ({
  input,
  meta,
  label,
  required,
  children,
  row
}) => {
  return (
    <FormControl
      component={'fieldset' as 'div'}
      className="RadioGroupComponent"
    >
      {label && (
        <FormLabel>
          <FormattedMessage id={label} />
          {required && '*'}
        </FormLabel>
      )}
      <RadioGroup {...input} row={row}>
        {children}
      </RadioGroup>
      {meta.touched && meta.error && (
        <FormHelperText>{renderFieldError(meta)}</FormHelperText>
      )}
    </FormControl>
  );
};
