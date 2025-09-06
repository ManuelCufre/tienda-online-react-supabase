import DataTable from "react-data-table-component";
import { useVentas } from "@/hooks/useVentas";
import { IconButton } from "@chakra-ui/react";
import { Spinner, Text, Flex } from "@chakra-ui/react";
import DetalleVenta from "./DetalleVenta";
import Cliente from "./Cliente";

export default function DataTableVentas() {

  const { ventas, loading, error, getVentas, crearVenta } =
    useVentas();

  const columnas = [
    { name: "Id", selector: (row) => row.id, sortable: true, maxWidth: "8px" },
    {
      name: "Nombre del cliente",
      selector: (row) => row.clientes.nombre,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Apellido del cliente",
      selector: (row) => row.clientes.apellido,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Email del cliente",
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
      name: "Numero de comprobante",
      selector: (row) => row.numero_comprobante,
      sortable: true,
      maxWidth: "40px",
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      maxWidth: "40px",
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
      selector: (row) => (
        <Cliente cliente={row.clientes}/>
      ),

    },
    {
      name: "Detalle",
      selector: (row) => (
        <DetalleVenta ventaId={row.id}/>
      ),

    },
   
  ];

  if(loading) return (
      <div className="min-w-full h-[50vh] flex items-center justify-center gap-2">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600" fontWeight={'bold'}>Cargando...</Text>
      </div>
  )

  const data = ventas;
  return (
    <div className="flex justify-center">
      <div className="w-[80vw] min-h-full !border">
        <DataTable
          columns={columnas}
          data={data}
          pagination
          paginationPerPage={15}
          dense 
        />
      </div>
    </div>
  );
}
