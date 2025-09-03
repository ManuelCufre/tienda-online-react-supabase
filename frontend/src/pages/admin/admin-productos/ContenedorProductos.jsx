import HeaderAdmin from "@/components/layout/HeaderAdmin";
import CrearProducto from "./CrearProducto";
import DataTableProductos from "./DataTableProductos";
export default function ContenedorProductos() {
  return (
    <div className="flex flex-col w-screen gap-4">
      <HeaderAdmin />
      <CrearProducto />
      <DataTableProductos />
    </div>
  );
}
