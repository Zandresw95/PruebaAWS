import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from "react-redux";
import { store } from "./reduxStore/store/store";
import { PopupProvider } from "./context/PopupContext";
import { ConfirmProvider } from "./context/ConfirmContext";
import { UserProvider } from "./context/UserContext";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <PopupProvider>
      <ConfirmProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ConfirmProvider>
    </PopupProvider>
  </Provider>
);


