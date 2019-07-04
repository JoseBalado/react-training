import { WrappedFieldProps } from "redux-form";

export interface IFieldProps extends WrappedFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}
