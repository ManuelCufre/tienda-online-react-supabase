import Productos from "./pages/productos/Productos";
import ContenedorProductos from "./pages/admin/admin-productos/ContenedorProductos";
import ContenedorVentas from "./pages/admin/admin-pedidos/ContenedorVentas";
import CheckOutSteps from "./pages/pedidos/CheckOutSteps";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import CheckOut from "./pages/pedidos/CheckOut";
import { BrowserRouter } from "react-router";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/admin/productos" element={<ContenedorProductos />} />
        <Route path="/admin/ventas" element={<ContenedorVentas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout/cart" element={<CheckOut />} />
        <Route path="/checkout/data" element={<CheckOutSteps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
