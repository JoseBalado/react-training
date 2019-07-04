import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Switch } from "react-router";

import { history } from "./config";
import { ViewWrapperComponent } from "./shared/components";
import { DefaultLayout } from "./shared/layouts";
import { HomeView } from "./modules/home";
import { FullScreenDialog } from "./modules/common";

export const Routes: React.SFC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <DefaultLayout exact={true} path={`/home/:type?`}>
        <ViewWrapperComponent>
          <HomeView />
        </ViewWrapperComponent>
      </DefaultLayout>

      <DefaultLayout path="/error/:id">
        <ViewWrapperComponent>
          <FullScreenDialog />
        </ViewWrapperComponent>
      </DefaultLayout>
      <FullScreenDialog />
    </Switch>
  </ConnectedRouter>
);
