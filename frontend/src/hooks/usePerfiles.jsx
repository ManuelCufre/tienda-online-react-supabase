import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supaBaseCliente";

export function useProfiles() {
  const getPerfil = (userId) => useQuery({
    queryKey: ["perfil", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Perfiles")
        .select("rol")
        .eq("id", userId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  return {
    getPerfil,
  };
}