import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { useDetalleVenta } from "@/hooks/useDetalleVenta";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

export default function DetalleVenta({ ventaId }) {
  const { detalleVenta, loading, error } = useDetalleVenta(ventaId);
  if (error) return toast.error(error.message);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root
      size={"lg"}
      placement={"center"}
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>
        <Button variant={'ghost'} size={'xs'} onClick={() => setIsOpen(true)}>
          <FaEye /> Ver productos
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body className="!pt-4">
              <h1 className="!font-semibold !text-lg">Detalle venta #{ventaId}</h1>
              <div className="flex gap-4">
                <div className="w-full flex flex-col gap-2 relative top-6">
                  {detalleVenta.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between !border !p-4 rounded-sm"
                    >
                      <div className="flex gap-2">
                        <Image
                          objectFit="cover"
                          maxW="90px"
                          src={item.Productos.imagen}
                          alt={item.Productos.nombre}
                          rounded="lg"
                        />
                        <div>
                          <span className="!font-semibold">
                            {item.Productos.nombre}
                          </span>
                          <p className="!text-sm">
                            Descripcion: {item.Productos.descripcion}
                          </p>
                          <p className="!text-sm">
                            Cantidad: {item.cantidad}
                          </p>
                          <p className="!text-sm">
                            Precio unitario: ${item.precio_unitario}
                          </p>
                        </div>
                      </div>

                      <p className="!text-sm !font-semibold">
                        $ {item.cantidad * item.precio_unitario}
                      </p>
                    </div>
                  ))}
                  
                  {/* Total de la venta */}
                  <div className="flex justify-between !py-2 !mt-4">
                    <span className="!font-bold">Total:</span>
                    <span className="!font-bold">
                      $ {detalleVenta.reduce((sum, item) => sum + (item.cantidad * item.precio_unitario), 0)}
                    </span>
                  </div>
                </div>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cerrar
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
