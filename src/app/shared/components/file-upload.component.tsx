/**
 *  File Upload Component using material ui dropzone
 */

import * as React from "react";
import { DropzoneDialog, DropzoneArea } from "material-ui-dropzone";
import { WithStyles, Theme, createStyles, withStyles } from "@material-ui/core";
import { ButtonComponent } from "./form";
import { ArrowUpwardOutlined } from "@material-ui/icons";

const styles = (theme: Theme) =>
  createStyles({
    uploadButton: {
      marginTop: theme.spacing(3)
    }
  });

/**
 *
 *
 * @export
 * @interface IFileUploadProps
 */
export interface IFileUploadProps {
  /**
   * Number of files which can be uploaded
   *
   * @type {number} [fileLimit=1]
   * @memberof IFileUploadProps
   */
  filesLimit?: number;
  /**
   * Where to preview inside dropzone or below
   *
   * @type {('Inside' | 'Separate')}
   * @memberof IFileUploadProps
   */
  showPreview?: "Inside" | "Separate";
  /**
   * List of accepted file type
   *
   * @type {string[]}
   * @memberof IFileUploadProps
   */
  acceptedFiles?: string[];
  /**
   * Called when the user decides to save the files selected
   *
   * @memberof IFileUploadProps
   */
  onUpload: (file: File[]) => void;
  /**
   * Opens in a dialog when true
   *
   * @type {boolean}
   * @memberof IFileUploadProps
   */
  dialog?: boolean;
  /**
   *
   * shows Dialog when true
   * @type {boolean}
   * @memberof IFileUploadProps
   */
  open?: boolean;
  /**
   * called when user closes the dialog
   *
   * @memberof IFileUploadProps
   */
  onClose?: () => void;
}

export interface IFileUploadState {
  /**
   * List of files currently uploaded into the component
   *
   * @type {File[]}
   * @memberof IFileUploadState
   */
  files: File[];
}

/**
 *
 *
 * @export
 * @class FileUpload
 * @extends {(React.Component<IFileUploadProps & WithStyles<typeof styles>, IFileUploadState>)}
 */
export class FileUpload extends React.Component<
  IFileUploadProps & WithStyles<typeof styles>,
  IFileUploadState
> {
  state = {
    files: []
  };

  /**
   * called when a file is droped into the dropzone
   * @param {File[]}
   * @memberof FileUpload
   */
  onDrop = (files: File[]) => {
    this.setState({
      files: Array.isArray(files) ? files : [files]
    });
  };

  /**
   *
   *
   * @memberof FileUpload
   */
  onDelete = () => {
    this.setState({ files: [] });
  };

  /**
   * Called once user decides to save the files uploaded
   *
   * @memberof FileUpload
   */
  onUpload = () => {
    this.props.onUpload(this.state.files);
  };

  /**
   * called for a dialog dropzone
   *
   * @memberof FileUpload
   */
  onSave = (files: File[]) => {
    this.props.onUpload(files);
  };

  render() {
    const {
      classes: { uploadButton },
      acceptedFiles,
      filesLimit,
      children,
      dialog,
      showPreview,
      open = false,
      onClose
    } = this.props;
    const { files } = this.state;

    const dropZoneProps = {
      acceptedFiles: acceptedFiles ? acceptedFiles : undefined,
      showPreviewsInDropzone: showPreview && showPreview === "Inside",
      filesLimit: filesLimit ? filesLimit : 1,
      showPreviews: showPreview && showPreview === "Separate"
    };
    return dialog ? (
      <DropzoneDialog
        open={open}
        onClose={onClose}
        onSave={this.onSave}
        {...dropZoneProps}
      >
        {children}
      </DropzoneDialog>
    ) : (
      <>
        <DropzoneArea
          {...dropZoneProps}
          onDelete={this.onDelete}
          onDrop={this.onDrop}
        >
          {children}
        </DropzoneArea>
        {files && files.length > 0 && (
          <ButtonComponent
            className={uploadButton}
            variant="outlined"
            fullWidth={true}
            rounded={true}
            onClick={this.onUpload}
            label="ACTIONS.UPLOAD"
            leftIcon={<ArrowUpwardOutlined />}
          />
        )}
      </>
    );
  }
}

export const FileUploadComponent = withStyles(styles)(FileUpload);
