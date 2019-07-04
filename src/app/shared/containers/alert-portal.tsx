import * as React from 'react';
import { connect } from 'react-redux';
import { Portal } from '@material-ui/core';

import { dismissAlert } from '../../store/alert';
import { IRootState } from '../../store/model';
import { AlertComponent } from '../components';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface IAlertPortalProps extends StateProps, DispatchProps {}

export const AlertPortalSFC: React.SFC<IAlertPortalProps> = ({
  alerts,
  closeAlert
}) => (
  <Portal>
    <div className="AlertPortal">
      {alerts &&
        alerts.map(alert => (
          <AlertComponent key={alert.id} {...alert} onCloseClick={closeAlert} />
        ))}
    </div>
  </Portal>
);

const mapDispatchToProps = {
  closeAlert: dismissAlert
};

const mapStateToProps = ({ alert: { data } }: IRootState) => ({
  alerts: data
});

export const AlertPortal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertPortalSFC);
