import { Button, Card, Image, Text, Center, Spinner, Box, Grid } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import AgregarCarrito from "./AgregarCarrito";
import { useProductos } from "@/hooks/useProductos";
import Footer from "@/components/layout/Footer";


export default function Productos() {
  const { productos, loading, error, productosActivos } = useProductos();
  const { agregarAlCarrito } = useCart();

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  if (loading)
    return (
      <Center h="100vh" flexDirection="column" gap={4}>
        <Spinner size="md" />
        <Text fontSize="sm">Cargando productos...</Text>
      </Center>
    );

  if (error)
    return (
      <Center h="100vh" flexDirection="column" gap={4}>
        <span>{error}</span>
      </Center>
    );

  return (
    <Box className="flex flex-col items-center max-w-[100vw] gap-48" bg="white" _dark={{ bg: "#1A1A1A" }}>
      <Header />
      <Box className=" flex  justify-center relative top-34" maxW={{base:'90vw', lg:'65vw'}}>
        <Grid className="grid gap-4 " templateColumns={{ base : "repeat(1)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}}>
          {productosActivos.map((producto) => (
            <Card.Root maxW="xs" overflow="hidden" key={producto.id} bg={{ base: "white", _dark: "#242424" }}>
              <Image
                src={producto.imagen}
                alt="Green double couch with wooden legs"
              />
              <Card.Body gap="2">
                <Card.Title fontSize={{  xl: "lg"}}>{producto.nombre}</Card.Title>
                <Card.Description fontSize={{  xl: "sm"}}>{producto.descripcion}</Card.Description>
                <Text
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                  fontSize={ "lg"}
                >
                  ${producto.precio}
                </Text>
              </Card.Body>
              <Card.Footer gap="2">
                <Toaster />
               <AgregarCarrito producto={producto}/>
              </Card.Footer>
            </Card.Root>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
