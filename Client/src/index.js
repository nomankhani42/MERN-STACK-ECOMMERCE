import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import Store from "./Redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor=persistStore(Store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store} >
  <PersistGate persistor={persistor}>
  <BrowserRouter>
    <App >
       <Toaster />
    </App>
  </BrowserRouter>
  </PersistGate>
  </Provider>
);
