import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Image,
  IconButton,
  Text
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useCart } from "@/context/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";

export default function ProductoAgregadoCarrito() {
  const {
    items,
    totalPrecio,
    eliminarDelCarrito,
    aumentarCantidadCarrito,
    decrementarCantidadCarrito,
    VaciarCarrito,
  } = useCart();

  const handleEliminarCarrito = (producto) => {
    eliminarDelCarrito(producto.id);
  };

  return (
    <>
      {items.map((producto) => (
        <Card.Root
        
          flexDirection="row"
          mt={2}
          overflow="hidden"
          maxW="full"
          maxH={{base: "6rem", md: '5rem', "lg": "7rem", "2xl": "8rem"}}
          key={producto.id}
          bg={{ base: "white", _dark: "#242424" }}
        >
          <Image
            objectFit="cover"
            maxW="35%"
            src={producto.imagen}
            alt="Caffe Latte"
          />
          <Box>
            <Card.Body maxW={'full'} height={'full'} paddingX={{base: "3", md: '4', "lg": "6", "2xl": "6"}} paddingY={{base: "1", md: '0', "lg": "3", "2xl": "4"}}>
              <Card.Title mb="0" fontSize={{base: "xs", md: 'xs', "lg": "sm", "2xl": "sm"}}>
                {producto.nombre}
              </Card.Title>
              <Card.Description fontSize={"xs"} fontWeight={"semibold"}>
                Talle: {producto.talle}
              </Card.Description>
              <HStack mt={{"2xl": 2}}>
                <Badge size={{base: "xs", md: 'xs', "lg": "sm", "2xl": "sm"}}>
                  $ {producto.precio}
                </Badge>

                <div className=" flex items-center gap-2 !border !border-gray-300 rounded-3xl !px-1">
                  <IconButton
                    size={{base: "2xs", md: '2xs', "lg": "xs", "2xl": "xs"}}
                    variant={"ghost"}
                    borderRadius={"2xl"}
                    onClick={() => decrementarCantidadCarrito(producto.id)}
                  >
                    <AiOutlineMinus />
                  </IconButton>
                  <span>{producto.cantidad}</span>
                  <IconButton
                    size={{base: "2xs", md: '2xs', "lg": "xs", "2xl": "xs"}}
                    variant={"ghost"}
                    borderRadius={"2xl"}
                    onClick={() => aumentarCantidadCarrito(producto.id)}
                  >
                    <IoAdd />
                  </IconButton>
                </div>

                <IconButton
                 size={{base: "2xs", md: '2xs', "lg": "xs", "2xl": "xs"}}
                  onClick={() => handleEliminarCarrito(producto)}
                  variant="subtle"
                >
                  <RiDeleteBin6Line />
                </IconButton>
              </HStack>
            </Card.Body>
          </Box>
        </Card.Root>
      ))}
    </>
  );
}
