import Productos from "./pages/productos/Productos";
import ContenedorProductos from "./pages/admin/admin-productos/ContenedorProductos";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import CheckOut from "./pages/pedidos/CheckOut";
import { BrowserRouter } from "react-router";
import { Routes, Route, useNavigate } from "react-router-dom";
import DetalleProducto from "./pages/productos/DetalleProducto";

import './App.css';


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/admin/productos" element={<ContenedorProductos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pedidos" element={<CheckOut />} />

      </Routes>
    </BrowserRouter>
  );
  
  
}

export default App;