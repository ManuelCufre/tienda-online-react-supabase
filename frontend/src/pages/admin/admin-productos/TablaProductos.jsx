import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBack2Fill } from "react-icons/ri";
import useSupaBase from "@/hooks/useSupaBase";
import DataTable from "react-data-table-component"

const columnas = [
  { label: "Id", key: "id" },
  { label: "Producto", key: "nombre" },
  { label: "Descripción", key: "descripcion" },
  { label: "Precio", key: "precio", render: (v) => `$ ${v}` },
  {
    label: "Imagen",
    key: "imagen",
    render: (v) => (
      <img src={v} alt="" className="w-10 h-10 object-cover rounded" />
    ),
  },
  { label: "Color", key: "color" },
  { label: "Stock", key: "stock" },
  { label: "Marca", key: "marca" },
  { label: "Género", key: "genero" },
  {
    label: "Talles",
    key: "talles_disponibles",
    render: (v) => (Array.isArray(v) ? v.join(", ") : v),
  },
  { label: "Activo", key: "activo", render: (v) => (v ? "Sí" : "No") },
];

export default function TablaProductos() {
  const { productos, loading, error, getProductos, crearProducto } =
    useSupaBase();

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm">Cargando productos...</p>
      </div>
    );

  return (
    <div className="w-screen flex justify-center p-4">
      <div class="flex justify-center p-4">
        <div class="w-[75vw] overflow-x-auto rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                {columnas.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    class="px-4 py-2 text-left text-gray-700 font-medium text-sm"
                  >
                    {col.label}
                  </th>
                ))}
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-gray-700 font-medium text-sm"
                >
                  Editar
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-gray-700 font-medium text-sm"
                >
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {productos.map((item) => (
                <tr key={item.id} class="hover:bg-gray-50">
                  {columnas.map((col) => (
                    <td
                      key={col.key}
                      class="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                    >
                      {col.render ? col.render(item[col.key]) : item[col.key]}
                    </td>
                  ))}
                  <td class="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900 p-1 rounded">
                      <CiEdit class="w-4 h-4" />
                    </button>
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <button class="text-red-600 hover:text-red-900 p-1 rounded">
                      <RiDeleteBack2Fill class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
