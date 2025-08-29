import { Button, Card, Image, Text, Center, Spinner } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Header from "@/components/layout/Header";
import useSupaBase from "@/hooks/useSupaBase";
import { useCart } from "@/context/CartContext";

export default function Productos() {
  const { productos, loading, error, getProductos } = useSupaBase();
  const { agregarAlCarrito } = useCart();

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
    toaster.create({
      title: "✅ Producto agregado",
      description: `El producto ${producto.nombre} ha sido agregado al carrito`,
    });
  };

  if (loading)
    return (
      <Center h="100vh" flexDirection="column" gap={4}>
        <Spinner size="md" />
        <Text fontSize="sm">Cargando productos...</Text>
      </Center>
    );

  return (
    <>
      <Header
      />
      <div className="productos-container">
        {productos.map((producto) => (
          <Card.Root maxW="xs" overflow="hidden" key={producto.id}>
            <Image
              src={producto.imagen}
              alt="Green double couch with wooden legs"
            />
            <Card.Body gap="2">
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Description>{producto.descripcion}</Card.Description>
              <Text
                textStyle="2xl"
                fontWeight="medium"
                letterSpacing="tight"
                mt="2"
              >
                ${producto.precio}
              </Text>
            </Card.Body>
            <Card.Footer gap="2">
              <Toaster />
              <Button
                variant="solid"
                onClick={() => handleAgregarCarrito(producto)}
              >
                Agregar al carrito
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
    </>
  );
}
