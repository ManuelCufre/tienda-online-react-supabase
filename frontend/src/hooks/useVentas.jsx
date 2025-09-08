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


  const crearVentaCompletaMutation = useMutation({
    mutationFn: async ({ venta, detalles }) => {
      
      // 1. Crear el cliente primero
      console.log("=== INICIANDO CREACIÓN DE VENTA ===");
      console.log("Datos del cliente:", JSON.stringify(venta.cliente, null, 2));
      
      const { data: clienteData, error: clienteError } = await supabase
        .from("clientes")
        .insert([venta.cliente])
        .select()
        .single();
      
      if (clienteError) {
        console.error("Error al crear cliente:", clienteError);
        throw clienteError;
      }
      

      // 2. Crear la dirección asociada al cliente
      const direccionConClienteId = {
        ...venta.direccion,
        cliente_id: clienteData.id
      };

      console.log("Creando dirección con datos:", direccionConClienteId);
      const { error: direccionError } = await supabase
        .from("direcciones")
        .insert([direccionConClienteId])
        .select()
        .single();
      
      if (direccionError) {
        console.error("Error al crear dirección:", direccionError);
        throw direccionError;
      }
      
      console.log("Dirección creada exitosamente");

      // 3. Crear la venta con el ID del cliente (las direcciones están relacionadas con el cliente)
      const ventaConIds = {
        cliente_id: clienteData.id,
        total: venta.total,
        estado: venta.estado,
        metodo_pago: venta.metodo_pago,
        numero_comprobante: venta.numero_comprobante,
        fecha: venta.fecha
      };

      const { data: ventaData, error: ventaError } = await supabase
        .from("ventas")
        .insert([ventaConIds])
        .select(`
          *,
          clientes (
            *,
            direcciones (*)
          )
        `)
        .single();
      
      if (ventaError) throw ventaError;

      // 4. Crear los detalles de venta con la venta_id obtenida
      const detallesConVentaId = detalles.map(detalle => ({
        ...detalle,
        venta_id: ventaData.id 
      }));

      const { data: detallesData, error: detallesError } = await supabase
        .from("detalle_ventas")
        .insert(detallesConVentaId)
        .select(`
          *,
          Productos (*)
        `);

      if (detallesError) throw detallesError;

      return {
        venta: ventaData,
        detalles: detallesData
      };
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ventasKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["detalleVentas"] });
    },
  });

  return {
    ventas: ventasQuery.data || [],
    loading: ventasQuery.isLoading,
    error: ventasQuery.error,
    crearVentaCompleta: crearVentaCompletaMutation.mutateAsync,
    isCreatingComplete: crearVentaCompletaMutation.isPending,
  };
}
