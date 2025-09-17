import HeaderAdmin from "@/components/layout/HeaderAdmin";
import DataTableVentas from "./DataTableVentas";
import { Box } from "@chakra-ui/react";

export default function ContenedorVentas() {
  return (
    <Box className="flex flex-col w-screen gap-8 min-h-[100vh]" bg="white" _dark={{ bg: "#242424" }} >
      <HeaderAdmin />
      <div className="flex flex-col w-full gap-3">
        <DataTableVentas />
      </div>
    </Box>
  );
}
