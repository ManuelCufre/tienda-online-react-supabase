import Productos from "./Productos";
import AdminMenu from "./admin/AdminMenu";
import Signup from "./login/Signup";
import Login from "./login/Login";
import Pedidos from "./pedidos/Pedidos";
import { BrowserRouter } from "react-router";
import useSupaBase from "./useSupaBase";
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