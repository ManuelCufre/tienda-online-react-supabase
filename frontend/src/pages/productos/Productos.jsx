import { Button, Card, Image, Text, Center, Spinner } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Header from "@/components/layout/Header";
import useSupaBase from "@/hooks/useSupaBase";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import AgregarCarrito from "./AgregarCarrito";

export default function Productos() {
  const { productos, loading, error, getProductos } = useSupaBase();
  const { agregarAlCarrito } = useCart();

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
   // toaster.create({
   //   title: "✅ Producto agregado",
   //   description: `El producto ${producto.nombre} ha sido agregado al carrito`,
   // });
  };

  if (loading)
    return (
      <Center h="100vh" flexDirection="column" gap={4}>
        <Spinner size="md" />
        <Text fontSize="sm">Cargando productos...</Text>
      </Center>
    );

  return (
    <div className="flex flex-col items-center max-w-[100vw] ">
      <Header />
      <div className="max-w-[65vw] flex  justify-center relative top-34">
        <div className="grid grid-cols-4 gap-4 ">
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
             <AgregarCarrito producto={producto}/>
              <Link
                to={`/producto/${producto.id}`}
                key={producto.id}
                style={{ textDecoration: "none" }}
              >
                <Button variant={"ghost"}>Mas info</Button>
              </Link>
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
      </div>
    </div>
  );
}
