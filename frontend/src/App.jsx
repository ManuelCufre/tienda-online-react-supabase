import Productos from "./pages/productos/Productos";
import AdminMenu from "./pages/admin/AdminMenu";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Pedidos from "./pages/pedidos/Pedidos";
import { BrowserRouter } from "react-router";
import useSupaBase from "./hooks/useSupaBase";
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css';


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/admin/productos" element={<AdminMenu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pedidos" element={<Pedidos />} />

      </Routes>
    </BrowserRouter>
  );
  
  
}

export default App;