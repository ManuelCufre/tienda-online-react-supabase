import {
  Tabs,
  Button,
  CloseButton,
  Drawer,
  Portal,
  EmptyState,
  VStack,
  Popover,
  Dialog,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import Carrito from "./Carrito";
import useSupaBase from "@/hooks/useSupaBase";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const { cerrarSesion, user } = useSupaBase();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="header">
        <Tabs.Root defaultValue="members" variant="plain">
          <Tabs.List bg="bg.muted" rounded="l3" p="1">
            <Tabs.Trigger value="members">Members</Tabs.Trigger>
            <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
            <a href="http://localhost:5173/admin/productos">
              <Tabs.Trigger value="tasks">Admin</Tabs.Trigger>
            </a>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
        </Tabs.Root>

        <div className="flex gap-4">
          <Carrito />
          {user ? (
            <div className="flex items-center gap-2">
              <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Popover.Trigger asChild>
                  <FaUserCircle className="w-6 h-6" />
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content>
                      <Popover.Arrow />
                      <Popover.Body className="flex flex-col gap-2 p-4">
                        <span>{user.email}</span>

                        <Dialog.Root size={"sm"} placement="center">
                          <Dialog.Trigger asChild>
                            <Button>Cerrar Sesión</Button>
                          </Dialog.Trigger>
                          <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                              <Dialog.Content>
                                <Dialog.Header></Dialog.Header>
                                <Dialog.Body>
                                  <p className="text-center">
                                    ¿Estás seguro de que deseas cerrar sesión?
                                  </p>
                                </Dialog.Body>
                                <Dialog.Footer>
                                  <Dialog.ActionTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      Cancelar
                                    </Button>
                                  </Dialog.ActionTrigger>
                                  <Button
                                    size="sm"
                                    onClick={() => cerrarSesion()}
                                  >
                                    Aceptar
                                  </Button>
                                </Dialog.Footer>
                              </Dialog.Content>
                            </Dialog.Positioner>
                          </Portal>
                        </Dialog.Root>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>
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
    </>
  );
}
