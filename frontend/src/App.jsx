import Productos from "./Productos";
import AdminMenu from "./admin/AdminMenu";
import Login from "./login/Login";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";

import './App.css';


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/admin/productos" element={<AdminMenu />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;