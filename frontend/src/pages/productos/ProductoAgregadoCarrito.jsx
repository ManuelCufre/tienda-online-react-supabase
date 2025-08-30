import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";

export default function ProductoAgregadoCarrito() {
  const { items, totalPrecio, eliminarDelCarrito, aumentarCantidadCarrito, decrementarCantidadCarrito, VaciarCarrito } = useCart();

  const handleEliminarCarrito = (producto) => {
    eliminarDelCarrito(producto.id);
    console.log(producto.id);
    toaster.create({
      title: "❌ Producto eliminado",
      description: `El producto ${producto.nombre} ha sido eliminado del carrito`,
    });
  };
 
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
              <Card.Title mb="0" fontSize={"sm"}>
                {producto.nombre}
              </Card.Title>
              <Card.Description>{producto.descripción}</Card.Description>
              <HStack mt="2">
                <Badge>$ {producto.precio}</Badge>

                <div className=" flex items-center gap-2 !border border-gray-400 rounded-3xl !px-1" >
                  <IconButton size={'xs'} variant={'ghost'} borderRadius={'2xl'} onClick={()=> decrementarCantidadCarrito(producto.id)}>
                    <AiOutlineMinus />
                  </IconButton>
                  <span>{producto.cantidad}</span>
                  <IconButton size={'xs'} variant={'ghost'} borderRadius={'2xl'} onClick={()=> aumentarCantidadCarrito(producto.id)}>
                    <IoAdd />
                  </IconButton>
                </div>

                <IconButton
                  size="xs"
                  onClick={() => handleEliminarCarrito(producto)}
                  variant='subtle'
                >
                  <RiDeleteBin6Line />
                </IconButton>
              </HStack>
            </Card.Body>
          </Box>
        </Card.Root>
      ))}
      <h2 className="precio-total">Precio total: $ {totalPrecio}</h2>
    </>
  );
}
