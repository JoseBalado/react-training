import * as React from "react";
import { IFileUploadProps, FileUploadComponent } from "./file-upload.component";
import { IFieldProps } from "../../models";
import { WithStyles, Theme, createStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    imageContainer: {
      background: (theme.palette.primary as any)["200"],
      width: "100%",
      height: `${200 + theme.spacing(3)}px`,
      alignItems: "center",
      justifyContent: "center",
      display: "flex"
    },
    image: {
      maxHeight: "200px",
      maxWidth: "200px",
      alignmentBaseline: "middle",
      margin: theme.spacing(3)
    }
  });

export interface IImageUploadProps extends IFileUploadProps, IFieldProps {}

export interface IImageUploadState {
  openDialog: boolean;
}

export class ImageUpload extends React.Component<
  IImageUploadProps & WithStyles<typeof styles>,
  IImageUploadState
> {
  state = {
    openDialog: false
  };

  onClose = () => {
    this.setState({ openDialog: false });
  };

  onUpload = (files: File[]) => {
    this.setState({ openDialog: false });
    this.props.onUpload(files);
  };

  render() {
    const {
      classes: { imageContainer, image },
      input: { value },
      onUpload
    } = this.props;

    return value ? (
      <>
        <FileUploadComponent
          open={this.state.openDialog}
          dialog={true}
          onUpload={this.onUpload}
          onClose={this.onClose}
        />
        <div className={imageContainer} onClick={this.imageClicked}>
          <img
            className={image}
            alt="image"
            src={`/dynamic-contents/${value}`}
          />
        </div>
      </>
    ) : (
      <FileUploadComponent onUpload={onUpload} />
    );
  }

  imageClicked = () => {
    this.setState({ openDialog: true });
  };
}

export const ImageUploadComponent = withStyles(styles)(ImageUpload);
