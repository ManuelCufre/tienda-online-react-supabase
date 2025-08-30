import { Button, CloseButton, Dialog, Portal, Image } from "@chakra-ui/react";
import useSupaBase from "@/hooks/useSupaBase";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

export default function AgregarCarrito({ producto }) {
  const { agregarAlCarrito } = useCart();

  return (
    <Dialog.Root size={"xl"} placement={'center'}>
      <Dialog.Trigger asChild>
        <Button variant="solid" size="sm">
          Agregar al carrito
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{producto.nombre}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <div className="flex gap-4">
                <div className="w-[50%]">
                  <Image
                    src={producto.imagen}
                    alt="Green double couch with wooden legs"
                  />
                </div>
                <div>
                  <h3>{producto.nombre}</h3>
                  <h3>{producto.descripcion}</h3>
                  <h3>{producto.precio}</h3>
                </div>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Agregar al carrito</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
