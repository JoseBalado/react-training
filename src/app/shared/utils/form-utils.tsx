import * as React from "react";
import { WrappedFieldMetaProps } from "redux-form";
import WarningIcon from "@material-ui/icons/Warning";
import { FormattedMessage } from "react-intl";
import { Grid, Typography } from "@material-ui/core";
import { noop as _noop } from "lodash";

export const getFormControlClass = ({
  touched,
  error
}: WrappedFieldMetaProps): string => {
  return `form-control ${touched && error ? "is-invalid" : ""}`;
};

export const getFileUploadClass = ({
  touched,
  error
}: WrappedFieldMetaProps): string => {
  return `custom-file-input ${touched && error ? "is-invalid" : ""}`;
};

export const getSelectClass = (props: WrappedFieldMetaProps): string => {
  return `${props.touched && props.error ? "is-invalid" : ""}`;
};

export const renderFieldError = ({ touched, error }: WrappedFieldMetaProps) => {
  return touched
    ? error && (
        <Grid component={"span"} container={true} className="field-error">
          <Grid component={"span"} item={true}>
            <Typography component={"span"} variant="caption" color="error">
              <FormattedMessage id={error} />
            </Typography>
          </Grid>
        </Grid>
      )
    : null;
};

export const renderFileUploadWarnings = ({ error }: WrappedFieldMetaProps) => {
  return (
    error && (
      <div>
        {error && (
          <React.Fragment>
            <WarningIcon />
            <FormattedMessage id={error} />
          </React.Fragment>
        )}
      </div>
    )
  );
};

export const overrideEventDefaults = (
  event: Event | React.DragEvent<HTMLDivElement>
) => {
  event.preventDefault();
  event.stopPropagation();
};

export const getFileListNames = (fileList: FileList): string => {
  return fileList.length > 1
    ? Array.from(fileList)
        .map(file => file.name)
        .join(", ")
    : fileList[0].name;
};

export const preventSubmit = (event: any) =>
  event.which === 13 ? event.preventDefault() : _noop();
