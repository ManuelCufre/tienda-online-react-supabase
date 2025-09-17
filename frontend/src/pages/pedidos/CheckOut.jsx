import { useCart } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import { Image, IconButton, Button, Flex, Box } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";
import { Input, } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useState } from "react";
export default function CheckOut() {
  const {
    items,
    totalPrecio,
    eliminarDelCarrito,
    aumentarCantidadCarrito,
    decrementarCantidadCarrito,
  } = useCart();

  const [costoEnvio, setCostoEnvio] = useState(0);

  const handleCalcular = () => {
    setCostoEnvio(9800);
  };
  return (
    <Flex className="flex flex-col items-center" bg="white" _dark={{ bg: "#0D0D0D" }} minH={'100vh'}>
      <Header />
      <div className="w-[65vw] flex gap-4  justify-between relative top-44 ">
        <div className="flex flex-col w-[65%] relative bottom-10">
          <Link to="/productos">
            <Button variant={"ghost"} className="self-start relative bottom-6">
              <MdOutlineKeyboardBackspace />
              Seguir comprando
            </Button>
          </Link>
          <div className="flex w-full justify-between ">
            <span className="!text-sm w-[35%]  text-center !font-semibold">
              Producto
            </span>
            <span className="!text-sm w-[15%]  text-center !font-semibold">
              Precio
            </span>
            <span className="!text-sm w-[20%]  text-center !font-semibold">
              Cantidad
            </span>
            <span className="!text-sm w-[15%]  text-center !font-semibold">
              Sub Total
            </span>
            <span className="!text-sm w-[15%]  text-center !font-semibold">
              Eliminar
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <Flex className="flex justify-around items-center !border !border-gray-300 rounded-lg !p-3 " bg="white" _dark={{ bg: "#242424", border: "#242424"
              }}
             >
                <div className="w-[35%] flex gap-4 items-center ">
                  <Image
                    objectFit="cover"
                    maxW="100px"
                    src={item.imagen}
                    alt="Caffe Latte"
                    rounded="lg"
                  />
                  <div className="flex flex-col ">
                    <span className="w-full !text-sm !font-semibold">
                      {item.nombre}
                    </span>

                    <span className="w-full !text-sm !font-semibold">
                      Talle: {item.talle}
                    </span>
                    <span className="w-full !text-sm !font-semibold">
                      Color: {item.color}
                    </span>
                  </div>
                </div>
                <span className="w-[15%] !text-sm !font-semibold text-center">
                  $ {item.precio}
                </span>
                <div className="w-[20%] flex items-center justify-center">
                  <div className="flex items-center justify-center gap-2 w-24 !border border-gray-400 rounded-3xl !px-1">
                    <IconButton
                      size={"xs"}
                      variant={"ghost"}
                      borderRadius={"2xl"}
                      onClick={() => decrementarCantidadCarrito(item.id)}
                    >
                      <AiOutlineMinus size={20} />
                    </IconButton>
                    <span className="!font-semibold !text-xs">
                      {item.cantidad}
                    </span>
                    <IconButton
                      size={"xs"}
                      variant={"ghost"}
                      borderRadius={"2xl"}
                      onClick={() => aumentarCantidadCarrito(item.id)}
                    >
                      <IoAdd />
                    </IconButton>
                  </div>
                </div>
                <span className="w-[15%] text-center !text-sm !font-semibold">
                  $ {item.precio * item.cantidad}
                </span>
                <div className="flex w-[13%] justify-center">
                  <IconButton
                    size="xs"
                    onClick={() => eliminarDelCarrito(item.id)}
                    variant="ghost"
                  >
                    <RiDeleteBin6Line />
                  </IconButton>
                </div>
              </Flex>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-[35%] relative top-5">
          <Box className="!border !border-gray-300 !w-full rounded-lg" bg="white" _dark={{ bg: "#242424", border: "#242424"
              }}>
            <div className="!p-6">
              <h3 className="text-center !text-md !font-semibold">
                Costos de la compra
              </h3>
            </div>
            <div className="!bg-gray-300 h-[1px] w-full"></div>
            <div className="!p-4 flex items-center gap-2">
              <FaTruck />
              <span className="!text-sm text-center !font-semibold">
                Calcular tiempos y costos de envío
              </span>
            </div>
            <div className="flex flex-col gap-2 !p-4">
              <div className="flex gap-2">
                <Input placeholder="Codigo postal" color={"gray.100"} />
                <Button variant={"subtle"} onClick={handleCalcular}>
                  Calcular
                </Button>
              </div>
              <div className="flex w-full justify-between">
                <span className="self-end !font-semibold !text-sm">
                  Costo del envío:
                </span>
                <span className="self-end !font-semibold !text-sm">
                  $ {costoEnvio}
                </span>
              </div>
            </div>
            <div className="!bg-gray-300 h-[1px] w-full"></div>
            <div className="flex justify-between gap-2 !p-4">
              <span className="!font-bold">Total</span>
              <span className="!font-bold">$ {totalPrecio + costoEnvio}</span>
            </div>
            <div className="!bg-gray-300 h-[1px] w-full"></div>
            <div className="flex flex-col justify-between gap-2 !p-4">
              <Link to="/checkout/data">
                <Button variant={'solid'} width={'full'}>
                  Iniciar pago
                </Button>
              </Link>
              <Link to="/productos">
                <Button variant={'subtle'} width={'full'}>
                  Seguir comprando
                </Button>
              </Link>
            </div>
          </Box>
        </div>
      </div>
    </Flex>
  );
}
