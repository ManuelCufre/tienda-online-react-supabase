import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import AdminProductos from "./AdminProductos";
import '../App.css';


export default function AdminMenu() {
  
  return (
    <>
      <Tabs.Root defaultValue="members">
        <Tabs.List>
          <Tabs.Trigger value="projects">
            <LuFolder />
            Productos
          </Tabs.Trigger>
          <Tabs.Trigger value="tasks">
            <LuSquareCheck />
            Pedidos
          </Tabs.Trigger>
          <Tabs.Trigger value="members">
            <LuUser />
            Usuarios
          </Tabs.Trigger>
        </Tabs.List>
        {/* content */}
      </Tabs.Root>

      <AdminProductos />
    </>
  );
}
