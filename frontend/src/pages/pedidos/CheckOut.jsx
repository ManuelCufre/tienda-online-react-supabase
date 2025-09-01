import { useCart } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import { Image, IconButton, Button } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";
import { Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function CheckOut() {
  const {
    items,
    totalPrecio,
    eliminarDelCarrito,
    aumentarCantidadCarrito,
    decrementarCantidadCarrito,
  } = useCart();
  return (
    <div className="flex flex-col items-center">
      <Header />

      <div className="w-[65vw] flex gap-4  justify-between relative top-20">
        <div className="flex flex-col w-[65%] relative bottom-10">
          <Link to="/productos">
          <Button variant={"ghost"} className="self-start relative bottom-6">
            <MdOutlineKeyboardBackspace />
            Seguir comprando
          </Button>
          </Link>
          <div className="flex ">
            <span className="!text-sm w-[35%] text-gray-600 text-center !font-semibold">
              Producto
            </span>
            <span className="!text-sm w-[20%] text-gray-600 text-center !font-semibold">
              Precio
            </span>
            <span className="!text-sm w-[20%] text-gray-600 text-center !font-semibold">
              Cantidad
            </span>
            <span className="!text-sm w-[20%] text-gray-600 text-center !font-semibold">
              Sub Total
            </span>
            <span className="!text-sm w-[10%] text-gray-600 text-center !font-semibold">
              Eliminar
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div className="flex justify-around items-center gap-8 !border rounded-lg !p-4">
                <Image
                  objectFit="cover"
                  maxW="100px"
                  src={item.imagen}
                  alt="Caffe Latte"
                  rounded="lg"
                />
                <span className="w-[25%] !text-sm !font-semibold">
                  {item.nombre}
                </span>
                <span className="w-[20%] !text-sm !font-semibold">
                  $ {item.precio}
                </span>
                <div className="w-[20%]">
                  <div className="flex items-center gap-2 w-24 !border border-gray-400 rounded-3xl !px-1">
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
                <span className="w-[20%] !text-sm !font-semibold">
                  $ {item.precio * item.cantidad}
                </span>
                <div className="flex w-[5%]">
                  <IconButton
                    size="xs"
                    onClick={() => eliminarDelCarrito(item.id)}
                    variant="ghost"
                  >
                    <RiDeleteBin6Line />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col w-[35%] relative top-5">
          <div className="!border !w-full rounded-lg">
            <div className="!p-6">
              <h3 className="text-center !text-lg !font-semibold">
                Resumen de la compra
              </h3>
            </div>
            <hr />
            <div className="!p-4 flex items-center gap-2">
              <FaTruck />
              <span className="!text-sm text-center !font-semibold">
                Calcular tiempos y costos de envío
              </span>
            </div>
            <div className="flex gap-2 !p-4">
              <Input placeholder="Codigo postal" />
              <Button variant={"subtle"}>Calcular</Button>
            </div>
            <hr />
            <div className="flex justify-between gap-2 !p-4">
              <span className="!font-bold">Total</span>
              <span className="!font-bold">$ {totalPrecio}</span>
            </div>
            <hr />
            <div className="flex flex-col justify-between gap-2 !p-4">
              <Button>Iniciar pago</Button>
              <Link to="/productos">
                <Button variant={"ghost"} className="w-full">
                  Seguir comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
