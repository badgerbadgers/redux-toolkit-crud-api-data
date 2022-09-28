import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersReducer from "./features/UsersSlice";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = configureStore({
  reducer: {
    users: usersReducer
  }
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
