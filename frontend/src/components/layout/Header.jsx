import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router";
import Carrito from "./Carrito";
import { useAuth } from "@/hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import MenuDeUsuario from "./MenuDeUsuario";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, Box } from "@chakra-ui/react";
export default function Header() {
  const { user } = useAuth();

  return (
    <Flex className="w-full h-20 !shadow-sm flex items-center justify-center fixed z-1000 " bg={{ base: "white", _dark: "#121212" }}>
      <Box className="flex items-center justify-between  z-1000" width={{base: '95%', md: '75vw', lg: '75vw', xl: '70vw', "2xl": '65vw'}}>
        <div className="">
          <h1 className="!font-bold ">Tienda online</h1>
        </div>
        <div className="flex gap-4">
          <ColorModeButton />

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

              <NavLink to="/signup">
                <Button>Registrarse</Button>
              </NavLink>
            </div>
          )}
        </div>
      </Box>
    </Flex>
  );
}
