import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
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
    if (!talleSeleccionado) {
      return;
    }
    setTalleSeleccionado(null);
    setIsCarritoOpen(true);
    setIsOpen(false); // Cierra el dialog
  };

  return (
    <Dialog.Root
      size={{ base: "md", lg: "lg", "2xl": "xl" }}
      placement={"center"}
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpen(true)} size={{ base: "xs", xl: "sm" }}>
          Agregar al carrito
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body
              className="!pt-4"
              bg={{ base: "white", _dark: "#242424" }}
            >
              <Box
                className="flex gap-4"
                flexDir={{ base: "column", md: "row" }}
              >
                <Box width={{ base: "100%", md: "50%" }}>
                  <Image src={producto.imagen} alt={producto.nombre} />
                </Box>
                <Box
                  className="flex flex-col gap-3"
                  width={{ base: "100%", md: "50%" }}
                >
                  <Text
                    className="!font-bold"
                    fontSize={{ base: "sm", xl: "lg", "2xl": "2xl" }}
                  >
                    {producto.nombre}
                  </Text>
                  <Text
                    className=" !font-semibold text-gray-600"
                    fontSize={{ base: "sm", xl: "md", "2xl": "lg" }}
                  >
                    {producto.descripcion}
                  </Text>
                  <Text
                    className="!text-lg !font-semibold"
                    fontSize={{ base: "sm", xl: "lg", "2xl": "2xl" }}
                  >
                    $ {producto.precio}
                  </Text>
                  <div className="!bg-gray-400 h-[1px] w-full"></div>
                  <span>Talle seleccionado: {talleSeleccionado ?? "-"}</span>
                  <div className="grid grid-cols-5 gap-2">
                    {tallesUnicos.map((talle) => (
                      <Button
                        size={{ base: "xs", lg: "sm", xl: "md" }}
                        key={talle}
                        onClick={() => setTalleSeleccionado(talle)}
                        variant={
                          talle === talleSeleccionado ? "solid" : "subtle"
                        }
                      >
                        {talle}
                      </Button>
                    ))}
                  </div>
                  <div className="!bg-gray-400 h-[1px] w-full"></div>
                  <Text className="!font-semibold" fontSize={{ base: "xs", xl: "sm", "2xl": "md" }}>
                    Marca: {producto.marca}
                  </Text>
                  <Text className="!font-semibold" fontSize={{ base: "xs", xl: "sm", "2xl": "md" }}>
                    Color: {producto.color}
                  </Text>
                  <Text className="!font-semibold" fontSize={{ base: "xs", xl: "sm", "2xl": "md" }}>
                    Género: {producto.genero}
                  </Text>
                </Box>
              </Box>
            </Dialog.Body>
            <Dialog.Footer bg={{ base: "white", _dark: "#242424" }}>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant={"outline"}
                  size={{ base: "xs", lg: "sm", xl: "md" }}
                >
                  Seguir comprando
                </Button>
              </Dialog.ActionTrigger>

              <Button
                size={{ base: "xs", lg: "sm", xl: "md" }}
                onClick={handleAgregar}
                disabled={!talleSeleccionado ? true : false}
              >
                {talleSeleccionado ? "Agregar al carrito" : "Seleccionar talle"}
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
