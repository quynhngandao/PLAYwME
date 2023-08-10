import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';

import App from "./components/App/App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
