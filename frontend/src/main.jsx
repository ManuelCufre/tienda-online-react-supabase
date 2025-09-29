import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Provider from "/src/components/ui/provider";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ← Cambia esta línea
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <CartProvider>
            <Provider>
              <App />
            </Provider>
          </CartProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
