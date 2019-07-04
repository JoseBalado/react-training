import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions
} from "@material-ui/core";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { noop as _noop } from "lodash";

import { IConfirmation, IConfirmationType } from "../../../models";
import { showConfirmation } from "../../../store/confirmation";

type DispatchProps = typeof mapDispatchToProps;

interface IConfirmationDialogProps extends IConfirmation, DispatchProps {
  onCloseClick: (id: string) => void;
}

export class ConfirmationDialogComponent extends React.Component<
  IConfirmationDialogProps
> {
  handleClose = () => {
    this.props.onCloseClick(this.props.id);
  };

  handleSubmitRequest = () => {
    this.props.type === IConfirmationType.DOUBLE
      ? this.openSecondDialog()
      : this.handleSubmit();
  };

  openSecondDialog = () => {
    this.handleClose();

    const { id, action } = this.props;

    this.props.showConfirmation({
      id,
      title: <FormattedMessage id="WARNINGS.IRRIVERSABLE.TITLE" />,
      body: <FormattedMessage id="WARNINGS.IRRIVERSABLE.BODY" />,
      action,
      type: IConfirmationType.SINGLE
    });
  };

  handleSubmit = () => {
    this.props.action ? this.dispatchRequest(this.props.action) : _noop();
    this.handleClose();
  };

  dispatchRequest = (request: string) => {
    // Not Implemented
    switch (request) {
      default:
        _noop();
        break;
    }
  };

  render() {
    const { title, body, submitLabel } = this.props;
    return (
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
        open={true}
        id="confirmation-dialog"
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <div id="confirmation-dialog-description">{body}</div>
        </DialogContent>

        <DialogActions>
          <Button
            id="confirmation-dialog-cancel"
            onClick={this.handleClose}
            color="primary"
          >
            <FormattedMessage id="ACTIONS.CANCEL" />
          </Button>

          <Button
            id="confirmation-dialog-submit"
            onClick={this.handleSubmitRequest}
            color="primary"
          >
            <FormattedMessage
              id={submitLabel ? submitLabel : "ACTIONS.SUBMIT"}
            />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = {
  showConfirmation
};

export const ConfirmationDialog = connect(
  undefined,
  mapDispatchToProps
)(ConfirmationDialogComponent);
