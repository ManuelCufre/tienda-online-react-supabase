import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supaBaseCliente.jsx";
// Queries
const productosKeys = {
  all: ["productos"],
  lists: () => [...productosKeys.all, "list"],
  list: (filters) => [...productosKeys.lists(), filters],
  details: () => [...productosKeys.all, "detail"],
  detail: (id) => [...productosKeys.details(), id],
  activos: () => [...productosKeys.all, "activos"], 

};

export function useProductos() {
  const queryClient = useQueryClient();

  // Obtener todos los productos
  const productosQuery = useQuery({
    queryKey: productosKeys.lists(),
    queryFn: async () => {
      const { data, error } = await supabase.from("Productos").select();
      if (error) throw error;
      return data;
    },
  });

  const productosFiltradosQuery = useQuery({
    queryKey: productosKeys.activos(),
    queryFn: async () => {
      const { data, error } = await supabase.from("Productos").select('*').eq('activo', true);
      if (error) throw error;
      return data;
    },
  });

  // Crear producto
  const crearProductoMutation = useMutation({
    mutationFn: async (nuevoProducto) => {
      const { data, error } = await supabase
        .from("Productos")
        .insert([nuevoProducto])
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productosKeys.lists() });
    },
  });

  // Modificar producto
  const modificarProductoMutation = useMutation({
    mutationFn: async ({ id, datosActualizados }) => {
      const { data, error } = await supabase
        .from("Productos")
        .update(datosActualizados) 
        .eq("id", id)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: productosKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: productosKeys.detail(variables.id),
      });

      queryClient.setQueryData(productosKeys.detail(variables.id), data[0]);
    },
  });

  return {
    productos: productosQuery.data || [],
    productosActivos: productosFiltradosQuery.data || [],
    loading: productosQuery.isLoading,
    error: productosQuery.error,
    crearProducto: crearProductoMutation.mutateAsync,
    modificarProducto: modificarProductoMutation.mutateAsync,
    isCreating: crearProductoMutation.isPending,
  };
}
