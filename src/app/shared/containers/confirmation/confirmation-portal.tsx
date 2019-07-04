import * as React from "react";
import { connect } from "react-redux";
import { Portal } from "@material-ui/core";

import { dismissConfirmation } from "../../../store/confirmation";
import { IRootState } from "../../../store/model";
import { ConfirmationDialog } from "./confirmation-dialog";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface IConfirmationPortalProps extends StateProps, DispatchProps {}

export const ConfirmationPortalSFC: React.SFC<IConfirmationPortalProps> = ({
  confirmations,
  closeConfirmation
}) => (
  <Portal>
    <div className="ConfirmationPortal">
      {confirmations &&
        confirmations.map(confirmation => (
          <ConfirmationDialog
            key={confirmation.id}
            {...confirmation}
            onCloseClick={closeConfirmation}
          />
        ))}
    </div>
  </Portal>
);

const mapDispatchToProps = {
  closeConfirmation: dismissConfirmation
};

const mapStateToProps = ({ confirmation: { data } }: IRootState) => ({
  confirmations: data
});

export const ConfirmationPortal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationPortalSFC);
