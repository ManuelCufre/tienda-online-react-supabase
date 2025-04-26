import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_KEY deben estar definidas");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default function useSupaBase() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProductos = async () => {
        try {
            const { data, error } = await supabase.from("productos").select();
            if (error) throw error;
            setProductos(data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductos();
    }, []);

    return (
        {productos, loading, error, getProductos}
    )
}