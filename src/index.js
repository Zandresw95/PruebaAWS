import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import { store } from "./reduxStore/store/store";
import { PopupProvider } from "./context/PopupContext";
import { ConfirmProvider } from "./context/ConfirmContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <Provider store={store}>
    <PopupProvider>
      <ConfirmProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ConfirmProvider>
    </PopupProvider>
  </Provider>,
  document.getElementById("root")
);