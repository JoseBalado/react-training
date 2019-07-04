import * as React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { IFieldProps } from '../../../../models';
import { renderFieldError } from '../../../utils';

export interface ITextFieldProps extends IFieldProps {
  /**
   *
   *
   * @type {boolean}
   * @memberof ITextFieldComponents
   */
  multiline?: boolean;
  /**
   *
   *
   * @type {number}
   * @memberof ITextFieldComponents
   */
  rows?: number;
  /**
   *
   *
   * @type {number}
   * @memberof ITextFieldComponents
   */
  maxLength?: number;
  /**
   *
   *
   * @type {number}
   * @memberof ITextFieldComponents
   */
  minLength?: number;
  /**
   *
   *
   * @type {boolean}
   * @memberof ITextFieldComponents
   */
  shrink?: boolean;
  /**
   *
   *
   * @type {(string | number)}
   * @memberof ITextFieldComponents
   */
  min?: string | number;
  /**
   *
   *
   * @type {boolean}
   * @memberof ITextFieldComponents
   */
  disabled?: boolean;
  /**
   *
   *
   * @type {React.ReactNode}
   * @memberof ITextFieldComponents
   */
  startIcon?: React.ReactNode;
  /**
   *
   *
   * @type {(any | undefined)}
   * @memberof ITextFieldComponents
   */
  variant?: any | undefined;
  /**
   *
   *
   * @type {(string|number)}
   * @memberof ITextFieldComponents
   */
  max?: string | number;
}

export const TextFieldComponent: React.SFC<ITextFieldProps> = ({
  input,
  meta,
  type,
  label,
  shrink,
  required,
  multiline,
  maxLength,
  minLength,
  rows,
  min,
  max,
  disabled,
  startIcon,
  variant
}) =>
  label ? (
    <FormattedMessage id={label}>
      {translation => (
        <TextField
          {...input}
          type={type}
          label={`${translation}${required ? '*' : ''}`}
          InputLabelProps={{
            shrink
          }}
          inputProps={{
            maxLength,
            minLength,
            min,
            max
          }}
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
            disableUnderline: true
          }}
          error={meta.touched && (meta.error && meta.error.length > 0)}
          helperText={renderFieldError(meta)}
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          variant={variant ? variant : 'filled'}
        />
      )}
    </FormattedMessage>
  ) : (
    <TextField
      {...input}
      type={type}
      variant={variant ? variant : 'filled'}
      error={meta.touched && (meta.error && meta.error.length > 0)}
      helperText={renderFieldError(meta)}
    />
  );
