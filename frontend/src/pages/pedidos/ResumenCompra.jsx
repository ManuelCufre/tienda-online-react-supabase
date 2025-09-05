import { useCart } from "@/context/CartContext";
import { Image, Button } from "@chakra-ui/react";
export default function ResumenCompra() {
  const { items, totalPrecio, costoEnvio, totalConEnvio } = useCart();

  return (
    <div className="w-[35%]  !p-2 !shadow-sm ">
      <div className="w-full !py-4 flex items-center justify-center !border-b">
        <h2 className="!text-lg !font-bold mb-4">Resumen de Compra</h2>
      </div>

      {items.map((producto, index) => (
        <div key={index} className="flex justify-between !border-b !py-2">
          <div className="flex gap-2">
            <Image
              objectFit="cover"
              maxW="60px"
              src={producto.imagen}
              alt="Caffe Latte"
              rounded="lg"
            />
            <div>
              <span className="!font-semibold">{producto.nombre}</span>
              <p className="!text-xs">Talle: {producto.talle}</p>
              <p className="!text-xs">Cantidad: {producto.cantidad}</p>
            </div>
          </div>

          <p className="!text-xs !font-semibold">
            $ {producto.precio * producto.cantidad}
          </p>
        </div>
      ))}

      <div className="flex flex-col gap-2 justify-between !pt-8 ">
        <div className="flex items-center justify-between">
          <h3 className="!text-sm text-gray-700 !font-semibold">Sub total:</h3>
          <h3 className="!text-sm text-gray-700 !font-semibold">
            $ {totalPrecio}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="!text-sm text-gray-700 !font-semibold">
            Costos del envío:
          </h3>
          <h3 className="!text-sm text-gray-700 !font-semibold">
            $ {costoEnvio}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-md !font-semibold">Total:</h3>
          <h3 className="text-md !font-semibold">$ {totalConEnvio}</h3>
        </div>
        <Button>Confirmar compra</Button>
        <Button variant={"ghost"}>Volver al carrito</Button>
      </div>
    </div>
  );
}
