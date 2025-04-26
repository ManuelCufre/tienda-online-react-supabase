import Productos from "./Productos";
import AdminMenu from "./admin/AdminMenu";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";

import './App.css';


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/admin/productos" element={<AdminMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;