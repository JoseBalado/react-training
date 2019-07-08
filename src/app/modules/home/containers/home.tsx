import * as React from "react";
import {
  PaperWrapperComponent,
  LabelComponent
} from "../../../shared/components";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ConfirmationDemoComponent } from "../components/confirmation-demo.component";
import { AlertDemoComponent } from "../components/alert-demo.component";
import { APIDemoComponent } from "../components/api-demo.component";
import { OMDbAPIComponent } from "../components/omdb/omdb-api.component";
const styles = (theme: Theme) =>
  createStyles({
    linkStyle: {
      "& a": {
        textDecoration: "none",
        color: (theme.palette.primary as any)["700"]
      }
    }
  });

export interface IHomeProps extends RouteComponentProps<{ type: string }> {}

export interface IHomeState {}

export class HomeComponent extends React.Component<
  IHomeProps & WithStyles<typeof styles>,
  IHomeState
> {
  render() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    return (
      <>
        {!type && (
          <PaperWrapperComponent>
            <LabelComponent id="LABELS.WELCOME" />
          </PaperWrapperComponent>
        )}
        {type === "confirm" && <ConfirmationDemoComponent />}
        {type === "alert" && <AlertDemoComponent />}
        {type === "api" && <APIDemoComponent />}
        {type === "omdb" && <OMDbAPIComponent />}
      </>
    );
  }
}

export const Home = withRouter(withStyles(styles)(HomeComponent));
