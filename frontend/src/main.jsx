import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Provider from "/src/components/ui/provider";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ← Cambia esta línea
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Provider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);
