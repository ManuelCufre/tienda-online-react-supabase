import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useVentas } from "@/hooks/useVentas";
import { Image, Button, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ResumenCompra() {
  const { items, totalPrecio, costoEnvio, totalConEnvio, vaciarCarrito } =
    useCart();
  const { isAllStepsCompleted, getCheckoutData, resetCheckout } = useCheckout();
  const { crearVentaCompleta, isCreatingComplete } = useVentas();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmarCompra = async () => {
    if (!isAllStepsCompleted()) {
      toast.error(
        "Por favor completa todos los pasos antes de confirmar la compra"
      );
      return;
    }

    if (items.length === 0) {
      toast.error("No hay productos en el carrito");
      return;
    }

    setIsProcessing(true);

    try {
      const checkoutData = getCheckoutData();

      const venta = {
        cliente: {
          nombre: checkoutData.personalData?.nombre,
          apellido: checkoutData.personalData?.apellido,
          email: checkoutData.personalData?.email,
          dni: checkoutData.personalData?.dni,
          telefono: checkoutData.personalData?.telefono,
        },
        direccion: {
          provincia: checkoutData.shippingData?.provincia,
          ciudad: checkoutData.shippingData?.ciudad,
          calle: checkoutData.shippingData?.calle,
          numero: checkoutData.shippingData?.numero,
          piso_departamento: checkoutData.shippingData?.piso_departamento,
          nombre_receptor: checkoutData.shippingData?.recibe,
          comentarios: checkoutData.shippingData?.comentario,
        },
        total: totalConEnvio,
        estado: "pendiente",
        metodo_pago: "transferencia",
        numero_comprobante: checkoutData.paymentData?.numero_comprobante,
        fecha: new Date().toISOString(),
      };

      const detalles = items.map((item) => ({
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
      }));

      const resultado = await crearVentaCompleta({ venta, detalles });

      toast.success(
        `¡Compra realizada exitosamente! ID de venta: ${resultado.venta.id}`
      );

      vaciarCarrito();
      resetCheckout();

      window.location.href = "/productos";
    } catch (error) {
      console.error("Error al procesar la compra:", error);

      // Mostrar mensaje de error más detallado
      let errorMessage = "Error al procesar la compra";

      if (error.message) {
        errorMessage += `: ${error.message}`;
      }

      if (error.code) {
        errorMessage += ` (Código: ${error.code})`;
      }

      if (error.details) {
        errorMessage += ` - ${error.details}`;
      }

      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box
      className="w-[35%] relative !p-3 !border rounded-lg self-center"
      bg="white"
      _dark={{ bg: "#1A1A1A" }}
      width={{base: '95%', md: '35%'}}
      top={{base: '16',md:0}}
    >
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
          <h3 className="!text-xs !font-semibold">Sub total:</h3>
          <h3 className="!text-xs !font-semibold">$ {totalPrecio}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="!text-xs !font-semibold">Costos del envío:</h3>
          <h3 className="!text-xs !font-semibold">$ {costoEnvio}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-md !font-semibold">Total:</h3>
          <h3 className="text-md !font-semibold">$ {totalConEnvio}</h3>
        </div>
        <Button
          onClick={handleConfirmarCompra}
          disabled={
            !isAllStepsCompleted() || isProcessing || isCreatingComplete
          }
          isLoading={isProcessing || isCreatingComplete}
          loadingText="Procesando..."
          colorScheme={isAllStepsCompleted() ? "green" : "gray"}
        >
          {isAllStepsCompleted()
            ? "Confirmar compra"
            : "Completa todos los pasos"}
        </Button>

        {!isAllStepsCompleted() && (
          <Text fontSize="xs" color="red.500" textAlign="center">
            Completa todos los pasos para habilitar la compra
          </Text>
        )}

        <Link to="/checkout/cart">
          <Button variant={"ghost"} width={"full"}>
            Volver al carrito
          </Button>
        </Link>
      </div>
    </Box>
  );
}
