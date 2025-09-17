import HeaderAdmin from "@/components/layout/HeaderAdmin";
import CrearProducto from "./CrearProducto";
import DataTableProductos from "./DataTableProductos";
import { Box } from "@chakra-ui/react";
export default function ContenedorProductos() {
  return (
    <Box className="flex flex-col w-screen gap-8 min-h-[100vh]" bg="white" _dark={{ bg: "#242424" }}>
      <HeaderAdmin />
      <div className="flex flex-col w-full gap-3">
        <CrearProducto />
      <DataTableProductos />
      </div>
    </Box>
  );
}
