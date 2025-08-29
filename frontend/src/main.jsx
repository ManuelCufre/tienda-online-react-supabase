import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Provider from "/src/components/ui/provider";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Provider>
        <App />
      </Provider>
    </CartProvider>
  </StrictMode>
);
