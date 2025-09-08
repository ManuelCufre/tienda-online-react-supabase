import { useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import { supabase } from "@/libs/supaBaseCliente";

const detalleVentasKeys = {
  all: ["detalleVentas"],
  lists: () => [...detalleVentasKeys.all, "list"],
  list: (filters) => [...detalleVentasKeys.lists(), filters],
  details: () => [...detalleVentasKeys.all, "detail"],
  detail: (id) => [...detalleVentasKeys.details(), id],
};

export function useDetalleVenta(ventaId) {
  const queryClient = useQueryClient();

  const detalleVentaQuery = useQuery({
    queryKey: detalleVentasKeys.detail(ventaId), 
    queryFn: async () => {
      let { data, error } = await supabase
        .from("detalle_ventas")
        .select(`*,Productos (*)`)
        .eq("venta_id", ventaId);
      if (error) throw error;
      return data;
    },
    enabled: !!ventaId,     
  });


  return {
    detalleVenta: detalleVentaQuery.data || [],
    loading: detalleVentaQuery.isLoading,
    error: detalleVentaQuery.error,
  };
}
