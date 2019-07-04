import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Button as B,
  WithStyles,
  Theme,
  createStyles,
  withStyles
} from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import classNames from "classnames";

/**
 * Props for the Button Component
 *
 * @export
 * @interface IButtonProps
 * @extends {ButtonProps}
 */
export interface IButtonProps extends ButtonProps {
  /**
   *
   * optional parameter defaults to 'ACTIONS.SUBMIT'
   * @type {string} [label='ACTIONS.SUBMIT']
   * @memberof IButtonProps
   */
  label?: string;
  /**
   *
   * optional parameter icon on the left of a button
   * @type {React.ReactElement<any>} [leftIcon]
   * @memberof IButtonProps
   */
  leftIcon?: React.ReactElement<any>;
  /**
   *
   * optional parameter icon to be shown on the right of a button
   * @type {React.ReactElement<any>} [rightIcon]
   * @memberof IButtonProps
   */
  rightIcon?: React.ReactElement<any>;
  /**
   *
   *
   * @type {('primary' | 'secondary' | 'default')} [color='primary']
   * @memberof IButtonProps
   */
  color?: "primary" | "secondary" | "default";
  /**
   * To be passed as true for the clear variant of the button
   *
   * @type {boolean} [clear]
   * @memberof IButtonProps
   */
  clear?: boolean;
  /**
   * To be passed as true if rounded buttons are needed
   * by default the buttons are square
   * @type {boolean} [rounded]
   * @memberof IButtonProps
   */
  rounded?: boolean;
  /**
   * Renders a button with width of 240
   * used in list footer buttons
   * @type {boolean} [large]
   * @memberof IButtonProps
   */
  large?: boolean;
  /**
   * Renders a fullwidth button without margins
   *
   * @type {boolean} [fullWidth]
   * @memberof IButtonProps
   */
  fullWidth?: boolean;

  /**
   * Shows only Icon without text
   *
   * @type {boolean}
   * @memberof IButtonProps
   */
  onlyIcon?: boolean;

  /**
   * Buttons Without default margins
   *
   * @type {boolean}
   * @memberof IButtonProps
   */
  noMargin?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    buttonStyle: {
      borderRadius: 0
    },
    buttonMargin: {
      margin: theme.spacing(3)
    },
    leftIconStyle: {
      marginRight: theme.spacing(3)
    },
    rightIconStyle: {
      marginLeft: theme.spacing(3)
    },
    largeButton: {
      width: "240px"
    }
  });

export interface IButtonPropsWithStyle
  extends IButtonProps,
    WithStyles<typeof styles> {
  classes: any;
}

/**
 *
 *
 * @param {IButtonProps} {
 *   label,
 *   color,
 *   leftIcon,
 *   rightIcon,
 *   className,
 *   fullWidth,
 *   clear,
 *   variant,
 *   rounded,
 *   large,
 *   onlyIcon,
 *   noMargin,
 *   classes: {
 *     buttonStyle,
 *     leftIconStyle,
 *     rightIconStyle,
 *     buttonMargin,
 *     largeButton
 *   },
 *   ...props
 * }
 * @returns
 */
export class Button extends React.Component<IButtonPropsWithStyle> {
  render = () => {
    const {
      label,
      color,
      leftIcon,
      rightIcon,
      className,
      fullWidth,
      clear,
      variant = "contained",
      rounded,
      large,
      onlyIcon,
      noMargin,
      classes: {
        buttonStyle,
        leftIconStyle,
        rightIconStyle,
        buttonMargin,
        largeButton
      },
      ...props
    } = this.props;

    return (
      <B
        className={classNames(`ButtonComponent ${className}`, {
          [buttonMargin]: !fullWidth && !noMargin,
          [buttonStyle]: !rounded,
          [largeButton]: large
        })}
        fullWidth={fullWidth}
        color={color ? color : "primary"}
        variant={clear ? undefined : variant}
        {...props as ButtonProps}
      >
        {!!leftIcon &&
          React.cloneElement(leftIcon, { className: leftIconStyle })}
        {!onlyIcon && (
          <FormattedMessage id={label ? label : "ACTIONS.SUBMIT"} />
        )}
        {!!rightIcon &&
          React.cloneElement(rightIcon, { className: rightIconStyle })}
      </B>
    );
  };
}
export const ButtonComponent = withStyles(styles)(Button);
