import * as React from "react";
import { ButtonComponent } from "../../../shared/components";
import { IRootState } from "../../../store/model";
import { showAlert } from "../../../store/alert";
import { connect } from "react-redux";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IAlertDemoProps extends StateProps, DispatchProps {}

export interface IAlertDemoState {}

export class AlertDemo extends React.Component<
  IAlertDemoProps,
  IAlertDemoState
> {
  showAlert = (variant: "info" | "success" | "warning" | "error") => {
    this.props.showAlert({
      id: "id",
      variant,
      title: "DEMO.ALERT.TITLE",
      message: "DEMO.ALERT.BODY",
      dismissible: true
    });
  };

  render() {
    return (
      <>
        <ButtonComponent
          label="DEMO.ALERT.TITLE"
          color="primary"
          onClick={() => this.showAlert("info")}
        />
        <ButtonComponent
          label="DEMO.ALERT.TITLE"
          color="secondary"
          onClick={() => this.showAlert("success")}
        />
        <ButtonComponent
          label="DEMO.ALERT.TITLE"
          color="default"
          onClick={() => this.showAlert("warning")}
        />
        <ButtonComponent
          label="DEMO.ALERT.TITLE"
          color="primary"
          onClick={() => this.showAlert("error")}
        />
      </>
    );
  }
}

const mapStateToProps = ({ confirmation }: IRootState) => ({
  confirmation
});

const mapDispatchToProps = {
  showAlert
};

export const AlertDemoComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertDemo);
