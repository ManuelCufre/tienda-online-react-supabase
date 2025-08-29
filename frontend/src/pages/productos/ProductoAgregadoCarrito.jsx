import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductoAgregadoCarrito() {
  const { items, totalPrecio, eliminarDelCarrito, VaciarCarrito } = useCart();

  const handleEliminarCarrito = (producto) => {
    eliminarDelCarrito(producto.id);

    toaster.create({
      title: "❌ Producto eliminado",
      description: `El producto ${producto.nombre} ha sido eliminado del carrito`,
    });
  };

//  const precioTotal = useMemo(() => {
//    return productosAgregados.reduce(
//      (total, producto) => total + producto.precio,
//      0
//    );
//  }, [productosAgregados]);
//
  return (
    <>
      {items.map((producto) => (
        <Card.Root
          flexDirection="row"
          mt={2}
          overflow="hidden"
          maxW="md"
          maxH={"8rem"}
          key={producto.id}
        >
          <Image
            objectFit="cover"
            maxW="150px"
            src={producto.imagen}
            alt="Caffe Latte"
          />
          <Box>
            <Card.Body>
              <Card.Title mb="0">{producto.nombre}</Card.Title>
              <Card.Description>{producto.descripción}</Card.Description>
              <HStack mt="2">
                <Badge>Hot</Badge>
                <Badge>$ {producto.precio}</Badge>
                <Button
                  size="xs"
                  onClick={() => handleEliminarCarrito(producto)}
                >
                  Eliminar
                </Button>
              </HStack>
            </Card.Body>
          </Box>
        </Card.Root>
      ))}
      <h2 className="precio-total">Precio total: $ {totalPrecio}</h2>
    </>
  );
}
