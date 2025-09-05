import DataTable from "react-data-table-component";
import { useProductos } from "@/hooks/useProductos";
import { IconButton } from "@chakra-ui/react";
import { Spinner, Text, Flex } from "@chakra-ui/react";
import EditarProducto from "./EditarProducto";
export default function DataTableProductos() {
  const { productos, loading, error, getProductos, crearProducto } =
    useProductos();

  const columnas = [
    { name: "Id", selector: (row) => row.id, sortable: true, maxWidth: "8px" },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
      sortable: true,
      maxWidth: "280px",
    },
    {
      name: "Marca",
      selector: (row) => row.marca,
      sortable: true,
      maxWidth: "40px",
    },
    {
      name: "Genero",
      selector: (row) => row.genero,
      sortable: true,
      maxWidth: "40px",
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
      maxWidth: "140px",
    },
    {
      name: "Talles",
      selector: (row) => row.talles_disponibles,
      sortable: true,
      maxWidth: "180px",
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      maxWidth: "40px",
    },
    {
      name: "Precio",
      selector: (row) => <span>$ {row.precio}</span>,
      sortable: true,
      maxWidth: "30px",
    },
    {
      name: "Imagen",
      selector: (row) => <img src={row.imagen} width={"30px"} />,
      maxWidth: "30px",
    },

    { name: "Estado", selector: (row) => row.activo ? 'Activo' : 'Inactivo', maxWidth: "30px" },
    {
      name: "Editar",
      selector: (row) => (
        <EditarProducto producto={row}/>
      ),
      maxWidth: "30px",
    },
  ];

  if(loading) return (
      <div className="min-w-full h-[50vh] flex items-center justify-center gap-2">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600" fontWeight={'bold'}>Cargando...</Text>
      </div>
  )

  const data = productos;
  return (
    <div className="flex justify-center">
      <div className="w-[80vw] min-h-full !border">
        <DataTable
          columns={columnas}
          data={productos}
          pagination
          paginationPerPage={15}
          dense 
          //progressPending={loading}
          //progressComponent={<MostrarLoading />}
        />
      </div>
    </div>
  );
}
