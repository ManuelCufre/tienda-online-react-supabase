import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { set } from "react-hook-form";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_KEY deben estar definidas"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default function useSupaBase() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verficarSesion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    verficarSesion();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            setUser(session?.user || null);
        }
        if (event === 'SIGNED_OUT') {
            setUser(null);
        }
    });

    return () => subscription.unsubscribe();
}, []);

  //crear un nuevo usuario mail y contraseña
  async function crearUsuario(userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.contraseña,
        options: {
          emailRedirectTo: `${window.location.origin}/productos`,
        },
      });
      console.log('Usuario creado '+data);
      if (error) throw error;
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  //Iniciar sesion con email y contraseña
  async function iniciarSesionUsuario(userData) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password: userData.contraseña,
            options: {
              emailRedirectTo: `${window.location.origin}/productos`,
            },
          });
        console.log('Usuario logeado ');
        console.log(data.user.email);
        if (error) throw error;
        return data;
    }catch (error) {
        setError(error.message);
        throw error;    
    }
  }

  async function cerrarSesion() {
    try {
        const { error } = await supabase.auth.signOut();
        console.log('Cerraste la sesion ');
        if (error) throw error;
    }catch (error) {
        setError(error.message);
        throw error;    
    }
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
  };

  const crearProducto = async (data) => {
    try {
      const { error } = await supabase.from("productos").insert([data]);
      if (error) throw error;
      getProductos();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    getProductos,
    supabase,
    crearProducto,
    crearUsuario,
    iniciarSesionUsuario,
    user,
    cerrarSesion,
  };
}
