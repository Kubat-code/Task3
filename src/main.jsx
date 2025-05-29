import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </Provider>
  </StrictMode>
);
