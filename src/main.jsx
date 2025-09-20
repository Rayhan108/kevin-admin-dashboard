import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import router from "./router/router.jsx";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
