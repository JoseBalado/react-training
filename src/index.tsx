import React from "react";
import ReactDOM from "react-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import * as en from "react-intl/locale-data/en";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core";

import { App } from "./app/app";
import * as serviceWorker from "./serviceWorker";
import { locale, messages } from "./i18n/locale";
import { configureStore } from "./app/store/store";
import { setupAxiosInterceptor } from "./app/config";
import { ThemeProvider } from "@material-ui/styles";

// App Config
const store = configureStore();
setupAxiosInterceptor();
addLocaleData([...en]);
const theme = createMuiTheme({
  typography: {
    fontFamily: "Exo 2"
  },
  palette: {
    secondary: { main: "#00c6ff", contrastText: "#FFF" },
    primary: { main: "#0072ff", contrastText: "#FFF" }
  },
  spacing: 8
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
