import { Button, CloseButton, Dialog, Portal, Image } from "@chakra-ui/react";
import useSupaBase from "@/hooks/useSupaBase";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AgregarCarrito({ producto }) {
  const { agregarAlCarrito, isCarritoOpen, setIsCarritoOpen } = useCart();
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Asegura que los talles sean únicos
  const tallesUnicos = Array.isArray(producto.talles_disponibles)
    ? [...new Set(producto.talles_disponibles)]
    : [];

  const handleAgregar = () => {
    agregarAlCarrito({ ...producto, talle: talleSeleccionado });
    setIsCarritoOpen(true);
    setIsOpen(false); // Cierra el dialog
  };

  return (
    <Dialog.Root
      size={"xl"}
      placement={"center"}
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>
        <Button variant="solid" size="sm" onClick={() => setIsOpen(true)}>
          Agregar al carrito
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body className="!pt-4">
              <div className="flex gap-4">
                <div className="w-[50%]">
                  <Image src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="w-[50%] flex flex-col gap-3">
                  <h3 className="!text-2xl !font-bold">{producto.nombre}</h3>
                  <span className="!text-lg !font-semibold text-gray-600">
                    {producto.descripcion}
                  </span>
                  <span className="!text-lg !font-semibold">
                    $ {producto.precio}
                  </span>
                  <hr />
                  <span>Talle seleccionado: {talleSeleccionado ?? "-"}</span>
                  <div className="grid grid-cols-5 gap-2">
                    {tallesUnicos.map((talle) => (
                      <Button
                        key={talle}
                        variant={
                          talle === talleSeleccionado ? "solid" : "subtle"
                        }
                        colorScheme={
                          talle === talleSeleccionado ? "blue" : "gray"
                        }
                        onClick={() => setTalleSeleccionado(talle)}
                      >
                        {talle}
                      </Button>
                    ))}
                  </div>
                  <hr />
                  <span className="!font-semibold">Marca: {producto.marca}</span>
                  <span className="!font-semibold">Color: {producto.color}</span>
                  <span className="!font-semibold">Género: {producto.genero}</span>
                </div>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Seguir comprando
                </Button>
              </Dialog.ActionTrigger>
              <Button isDisabled={!talleSeleccionado} onClick={handleAgregar}>
                Agregar al carrito
              </Button>
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
