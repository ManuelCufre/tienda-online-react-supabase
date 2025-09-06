import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supaBaseCliente";
const ventasKeys = {
  all: ["ventas"],
  lists: () => [...ventasKeys.all, "list"],
  list: (filters) => [...ventasKeys.lists(), filters],
  details: () => [...ventasKeys.all, "detail"],
  detail: (id) => [...ventasKeys.details(), id],
};

export function useVentas() {
  const queryClient = useQueryClient();

  const ventasQuery = useQuery({
    queryKey: ventasKeys.lists(),
    queryFn: async () => {
      const { data, error } = await supabase.from("ventas").select(`
        *,
        clientes (
            *,
            direcciones (*)
        )
    `);
    if (error) throw error;
    return data;
    },
  });

  return {
    ventas: ventasQuery.data || [],
    loading: ventasQuery.isLoading,
    error: ventasQuery.error,
  };
}
