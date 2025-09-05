import HeaderAdmin from "@/components/layout/HeaderAdmin";
import CrearProducto from "./CrearProducto";
import DataTableProductos from "./DataTableProductos";
export default function ContenedorProductos() {
  return (
    <div className="flex flex-col w-screen gap-8 ">
      <HeaderAdmin />
      <div className="flex flex-col w-full gap-3">
        <CrearProducto />
      <DataTableProductos />
      </div>
    </div>
  );
}
