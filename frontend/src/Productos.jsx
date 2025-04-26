import {
  Button,
  Card,
  Image,
  Text,
  ProgressCircle,
  Center,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Header from "./Header";
import "./App.css";
import useSupaBase from "./useSupaBase";

export default function Productos() {
  const [productosAgregados, setProductosAgregados] = useState([]);
  const { productos, loading, error, getProductos } = useSupaBase();

  const handleAgregarCarrito = (producto) => {
    setProductosAgregados([...productosAgregados, producto]);
    toaster.create({
      title: "✅ Producto agregado",
      description: `El producto ${producto.nombre} ha sido agregado al carrito`,
    });
  };

  if (loading)
    return (
      <Center h="100vh" flexDirection="column" gap={4}>
        <ProgressCircle.Root value={null} size="sm">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
        <Text>Cargando productos...</Text>
      </Center>
    );

  return (
    <>
      <Header
        productosAgregados={productosAgregados}
        setProductosAgregados={setProductosAgregados}
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
              <Card.Description>{producto.descripción}</Card.Description>
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
