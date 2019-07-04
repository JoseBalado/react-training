import * as React from "react";
import {
  Select,
  MenuItem,
  ListItemText,
  InputLabel,
  FormControl,
  Checkbox,
  FilledInput,
  FormHelperText,
  Typography,
  Input,
  Theme,
  WithStyles,
  createStyles,
  withStyles,
  InputAdornment
} from "@material-ui/core";

import { IFieldProps } from "../../../../models";
import { FormattedMessage } from "react-intl";
import { find as _find, uniq as _uniq } from "lodash";
import { renderFieldError } from "../../../utils";
import classNames from "classnames";

/**
 *
 *
 * @export
 * @interface ISelectProps
 * @extends {IFieldProps}
 * @extends {WithStyles<typeof styles>}
 */
export interface ISelectProps extends IFieldProps, WithStyles<typeof styles> {
  /**
   * Icon to be displayed at the start of the component
   *
   * @type {React.ReactNode}
   * @memberof ISelectProps
   */
  startIcon?: React.ReactNode;
  /**
   *
   * To be used in single mode
   * @type {(number | string | object)}
   * @memberof ISelectProps
   */
  selection?: number | string | object;
  /**
   *
   * To be used for multi mode
   * @type {(number | string | object)}
   * @memberof ISelectProps
   */
  selections?: number | string | object;
  /**
   *
   *
   * @type {any[]}
   * @memberof ISelectProps
   */
  selectOptions?: any[];
  /**
   * Displays an empty option when true
   *
   * @type {boolean}
   * @memberof ISelectProps
   */
  emptyOption?: boolean;
  /**
   *
   *
   * @type {boolean}
   * @memberof ISelectProps
   */
  disabled?: boolean;
  /**
   * Object property to be used as unique key
   * Mandatory when an object is passed as an option
   *
   * @type {string}
   * @memberof ISelectProps
   */
  itemKey?: string;
  /**
   * Object property to be used as value
   * Mandatory when an object is passed as an option
   *
   * @type {string}
   * @memberof ISelectProps
   */
  itemValue?: string;
  /**
   * Object property to be used as display text
   * Mandatory when an object is passed as an option
   *
   * @type {string}
   * @memberof ISelectProps
   */
  itemText?: string;
  /**
   * Object property to be used as display logo
   * Mandatory when an object is passed as an option
   * & display logo instead of text as value
   *
   * @type {string}
   * @memberof ISelectProps
   */
  itemLogo?: string;
  /**
   * Allows Multiple Selection if true
   *
   * @type {boolean}
   * @memberof ISelectProps
   */
  multiple?: boolean;
  /**
   * clear variant
   *
   * @type {boolean}
   * @memberof ISelectProps
   */
  clear?: boolean;
  /**
   * Label to be displayed
   *
   * @type {string}
   * @memberof ISelectProps
   */
  label?: string;
  className?: string;
  allAsAnOption?: boolean;
  whiteBackground?: boolean;
  onChange?: (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    child: React.ReactNode
  ) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    selectComponent: {
      width: 250,
      maxWidth: 250,
      height: 40,
      border: 0,
      borderRadius: 3,
      padding: theme.spacing(3)
    },
    whiteBackgroundStyle: {
      backgroundColor: "#FFFFFF"
    },
    input: {
      border: 0
    }
  });

/**
 *
 *
 * @param {ISelectProps} {
 *   classes: { selectComponent,whiteBackgroundStyle },
 *   selectOptions,
 *   label,
 *   emptyOption = true,
 *   required,
 *   input,
 *   disabled,
 *   clear,
 *   itemKey = '',
 *   itemValue = '',
 *   itemText = '',
 *   itemLogo,
 *   multiple,
 *   meta,
 *   onChange,
 *   className,
 *   startIcon,
 * whiteBackground
 * }
 * @returns
 */
export const SelectComponentSFC: React.SFC<ISelectProps> = ({
  classes: { selectComponent, whiteBackgroundStyle },
  selectOptions,
  label,
  emptyOption = true,
  required,
  input,
  disabled,
  clear,
  itemKey = "",
  itemValue = "",
  itemText = "",
  itemLogo,
  multiple,
  meta,
  onChange,
  className,
  startIcon,
  allAsAnOption,
  whiteBackground
}) => {
  if (itemValue && Array.isArray(input.value)) {
    if (input.value.includes("all")) {
      input.value = ["all"];
    } else {
      input.value = _uniq(
        input.value.map(item => {
          return typeof item === "string" ? item : (item as any)[itemValue];
        })
      );
    }
  }
  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    child: React.ReactNode
  ) => {
    event.preventDefault();
    onChange ? onChange(event, child) : input.onChange(event);
  };

  const getItem = (option: string | number) => {
    return (
      <MenuItem key={option} value={option}>
        {multiple && (
          <Checkbox
            checked={input.value.indexOf((option as any)[itemValue]) > -1}
          />
        )}
        <ListItemText primary={option} />
      </MenuItem>
    );
  };

  const getObjectItem = (option: object) => {
    return (
      <MenuItem
        key={(option as any)[itemKey]}
        value={(option as any)[itemValue]}
      >
        {multiple && (
          <Checkbox
            checked={
              input.value.includes("all") ||
              input.value.indexOf((option as any)[itemValue]) > -1
            }
          />
        )}
        {itemLogo && (option as any)[itemLogo]}
        <ListItemText primary={(option as any)[itemText]} />
      </MenuItem>
    );
  };
  const renderMultiple = (inputValue: any) => {
    return input.value.includes("all")
      ? "ALL"
      : _uniq(
          inputValue.map((item: object) => {
            if (itemValue) {
              const obj = {};
              (obj as any)[itemValue] = item;
              const option = _find(selectOptions, obj);
              return option && (option as any)[itemText];
            } else {
              return (item as any)[itemText];
            }
          })
        ).join(", ");
  };

  const renderValue = (inputValue: any) => {
    const obj = {};
    (obj as any)[itemValue] = inputValue;
    const option = _find(selectOptions, obj);
    return option && itemLogo && (option as any)[itemLogo];
  };

  const getAllAsAnOption = (option: any) => {
    switch (typeof option) {
      case "number":
      case "string":
        return getItem("All");
      default:
        const obj = {};
        (obj as any)[itemKey] = "all";
        (obj as any)[itemText] = "ALL";
        (obj as any)[itemValue] = "all";
        return getObjectItem(obj);
    }
  };

  const valueProp =
    multiple || itemLogo
      ? { renderValue: itemLogo ? renderValue : renderMultiple }
      : { value: input && input.value };
  return (
    <FormControl
      variant={clear ? undefined : "filled"}
      className={`SelectComponent ${className ? className : ""}`}
    >
      {label && (
        <InputLabel htmlFor="select-component">
          <Typography
            color={
              meta.touched && (meta.error && meta.error.length > 0)
                ? "error"
                : "initial"
            }
          >
            <FormattedMessage id={label} />
            {required ? "*" : ""}
          </Typography>
        </InputLabel>
      )}

      <Select
        {...input}
        multiple={multiple}
        {...valueProp}
        onChange={handleChange}
        input={
          clear ? (
            <Input
              {...{
                startAdornment: startIcon && (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
                disableUnderline: true
              }}
            />
          ) : (
            <FilledInput
              {...{
                startAdornment: startIcon && (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
                disableUnderline: true
              }}
            />
          )
        }
        error={meta && meta.touched && (meta.error && meta.error.length > 0)}
        autoWidth={false}
        disabled={disabled}
        required={required}
        className={classNames({
          [whiteBackgroundStyle]: itemLogo || whiteBackground,
          [selectComponent]: itemLogo
        })}
      >
        {emptyOption && (
          <MenuItem value="">
            <em>
              <FormattedMessage id="LABELS.NONE" />
            </em>
          </MenuItem>
        )}
        {multiple &&
          allAsAnOption &&
          getAllAsAnOption(selectOptions ? selectOptions[0] : "all")}
        {selectOptions &&
          selectOptions.map((option: number | string | object) => {
            switch (typeof option) {
              case "number":
                return getItem(option.toString());
              case "string":
                return getItem(option);
              default:
                return getObjectItem(option);
            }
          })}
      </Select>
      {meta && meta.touched && (meta.error && meta.error.length > 0) && (
        <FormHelperText>{renderFieldError(meta)}</FormHelperText>
      )}
    </FormControl>
  );
};

export const SelectComponent = withStyles(styles)(SelectComponentSFC);
