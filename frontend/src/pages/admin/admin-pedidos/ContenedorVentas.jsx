import HeaderAdmin from "@/components/layout/HeaderAdmin";
import DataTableVentas from "./DataTableVentas";
export default function ContenedorVentas() {
  return (
    <div className="flex flex-col w-screen gap-8 ">
      <HeaderAdmin />
      <div className="flex flex-col w-full gap-3">
        <DataTableVentas />
      </div>
    </div>
  );
}
