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

    //crear un nuevo usuario
    async function signUpNuevoUsuario(email) {
        try {
            const { data, error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: `${window.location.origin}/productos`
                }
            });
            if (error) throw error;
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
        const { data: { user } } = await supabase.auth.getUser()

    }

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

    const crearProducto = async (data) => {
        try {
            const { error } = await supabase.from("productos").insert([data]);
            if (error) throw error;
            getProductos();
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getProductos();
    }, []);

    return {productos, loading, error, getProductos, supabase, crearProducto, signUpNuevoUsuario}
    
}