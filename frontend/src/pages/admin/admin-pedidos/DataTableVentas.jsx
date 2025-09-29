import DataTable from "react-data-table-component";
import { useVentas } from "@/hooks/useVentas";
import { IconButton } from "@chakra-ui/react";
import { Spinner, Text, Flex, Button } from "@chakra-ui/react";
import DetalleVenta from "./DetalleVenta";
import Cliente from "./Cliente";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { useColorMode } from "@/components/ui/color-mode";
export default function DataTableVentas() {
  const { ventas, loading, error, getVentas, crearVenta } = useVentas();

  const columnas = [
    { name: "Id", selector: (row) => row.id, sortable: true, maxWidth: "80px" },
    {
      name: "Nombre",
      selector: (row) => row.clientes.nombre,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Apellido",
      selector: (row) => row.clientes.apellido,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.clientes.email,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Metodo de pago",
      selector: (row) => row.metodo_pago,
      sortable: true,
      maxWidth: "280px",
    },
    {
      name: "N° comprobante",
      selector: (row) => row.numero_comprobante,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Fecha",
  selector: (row) => new Date(row.fecha).toLocaleDateString("es-AR"), // o "en-CA" para formato YYYY-MM-DD
      sortable: true,
      maxWidth: "140px",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      maxWidth: "140px",
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
      maxWidth: "140px",
    },
    {
      name: "Cliente",
      selector: (row) => <Cliente cliente={row.clientes} />,
    },
    {
      name: "Detalle",
      selector: (row) => <DetalleVenta ventaId={row.id} />,
    },
  ];

  if (loading)
    return (
      <div className="min-w-full h-[50vh] flex items-center justify-center gap-2">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600" fontWeight={"bold"}>
          Cargando...
        </Text>
      </div>
    );

  const { colorMode } = useColorMode();

  const customStyles = {
    table: {
      style: {
        backgroundColor: colorMode === "dark" ? "#000" : "#fff",
      },
    },
    headRow: {
      style: {
        backgroundColor: colorMode === "dark" ? "#1A1A1A" : "#fff",
        color: colorMode === "dark" ? "#FFF" : "#000",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: colorMode === "dark" ? "#292929" : "#fff",
        color: colorMode === "dark" ? "#fff" : "#2d3748",
      },
    },
    pagination: {
      style: {
        backgroundColor: colorMode === "dark" ? "#242424" : "#fff",
        color: colorMode === "dark" ? "#fff" : "#2d3748",
      },
    },
  };

  const data = ventas;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-3">
        <Link to="/productos">
          <Button variant={"subtle"}>
            <MdOutlineKeyboardBackspace />
            Ir a publicaciones
          </Button>
        </Link>
        <div className="w-[80vw]  !border">
          <DataTable
            columns={columnas}
            data={data}
            pagination
            paginationPerPage={15}
            customStyles={customStyles}
            dense
          />
        </div>
      </div>
    </div>
  );
}
