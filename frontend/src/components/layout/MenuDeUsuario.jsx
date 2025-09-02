import { Button, Portal, Popover, Dialog } from "@chakra-ui/react";
import useSupaBase from "@/hooks/useSupaBase";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function MenuDeUsuario() {
  const { cerrarSesion, user, getPerfil } = useSupaBase();
  const [rol, setRol] = useState(null);
  const [open, setOpen] = useState(false);

  //useEffect(() => {
  //  const fetchPerfil = async () => {
  //    if (user) {
  //      const data = await getPerfil(user.id);
  //      setRol(data?.rol);
  //    }
  //  };
  //  fetchPerfil();
  //}, [user]);

  return (
    <>
      <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Popover.Trigger asChild>
          <FaUserCircle className="w-6 h-6" />
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Body className="flex flex-col gap-2 p-4">
                <Dialog.Root size={"sm"} placement="center">
                  {user && (
                    <div className="flex flex-col gap-4">
                      <span>{user.email}</span>
                      <Link to = '../admin/productos'>
                      <Button variant={'subtle'}className="w-[100%]">
                        Panel administrador
                      </Button>
                      </Link>
                    </div>
                  )}
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
                          <Button size="sm" onClick={() => cerrarSesion()}>
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
    </>
  );
}
