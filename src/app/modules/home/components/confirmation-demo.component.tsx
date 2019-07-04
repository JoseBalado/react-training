import * as React from "react";
import { ButtonComponent, LabelComponent } from "../../../shared/components";
import { IRootState } from "../../../store/model";
import { showConfirmation } from "../../../store/confirmation";
import { connect } from "react-redux";
import { IConfirmationType } from "../../../models";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IConfirmationDemoProps extends StateProps, DispatchProps {}

export interface IConfirmationDemoState {}

export class ConfirmationDemo extends React.Component<
  IConfirmationDemoProps,
  IConfirmationDemoState
> {
  showSingleConfirmation = () => {
    this.props.showConfirmation({
      id: "id",
      title: <LabelComponent id="DEMO.SINGLE_CONFIRMATION.TITLE" />,
      body: <LabelComponent id="DEMO.SINGLE_CONFIRMATION.BODY" />,
      type: IConfirmationType.SINGLE
    });
  };

  showDoubleConfirmation = () => {
    this.props.showConfirmation({
      id: "id",
      title: <LabelComponent id="DEMO.DOUBLE_CONFIRMATION.TITLE" />,
      body: <LabelComponent id="DEMO.DOUBLE_CONFIRMATION.BODY" />,
      type: IConfirmationType.DOUBLE
    });
  };

  render() {
    return (
      <>
        <ButtonComponent
          label="DEMO.SINGLE_CONFIRMATION.TITLE"
          onClick={this.showSingleConfirmation}
          color="secondary"
        />
        <ButtonComponent
          label="DEMO.DOUBLE_CONFIRMATION.TITLE"
          onClick={this.showDoubleConfirmation}
        />
      </>
    );
  }
}

const mapStateToProps = ({ confirmation }: IRootState) => ({
  confirmation
});

const mapDispatchToProps = {
  showConfirmation
};

export const ConfirmationDemoComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationDemo);
