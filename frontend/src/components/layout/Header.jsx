import {
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import Carrito from "./Carrito";
import useSupaBase from "@/hooks/useSupaBase";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import MenuDeUsuario from "./MenuDeUsuario";
export default function Header() {
  
  const { user } = useSupaBase();

  return (
    <>
      <div className="min-w-screen h-20 !shadow-sm flex items-center justify-center">
        <div className="flex items-center justify-between w-[70vw]">
        <div className="">
          <h1 className="!font-bold ">Tienda online</h1>
        </div>
        <div className="flex gap-4">
          <Carrito />
          {user ? (
            <div className="flex items-center gap-2">
              <MenuDeUsuario />
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink to="/login">
                <Button variant={"outline"}>Iniciar Sesión</Button>
              </NavLink>

              <NavLink to="/login">
                <Button>Registrarse</Button>
              </NavLink>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
