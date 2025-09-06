import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function Cliente({ cliente }) {
  const [isOpen, setIsOpen] = useState();
  if (cliente) {
    console.log(cliente);
  }

  const datosPersonales = [
    { atributo: "nombre", label: "Nombre" },
    { atributo: "apellido", label: "Apellido" },
    { atributo: "email", label: "Correo electronico" },
    { atributo: "dni", label: "DNI" },
    { atributo: "telefono", label: "Teléfono" },
  ];

  const datosEnvio = [
    { atributo: "provincia", label: "Provincia" },
    { atributo: "ciudad", label: "Ciudad" },
    { atributo: "calle", label: "Calle" },
    { atributo: "numero", label: "Número" },
    { atributo: "piso_departamento", label: "Piso/departamento" },
    { atributo: "nombre_receptor", label: "¿Quien recibe?" },
    { atributo: "comentario", label: "Comentarios" },
  ];

  return (
    <Dialog.Root
      placement={"center"}
      size={'lg'}
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>
        <Button 
        margin={1}
          variant={"ghost"} 
          size={"xs"} 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <FaUser />
          Ver cliente
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content >
            <Dialog.Header>
              <h2 className="!text-lg !font-semibold ">Cliente</h2>
            </Dialog.Header>
            <Dialog.Body className="!pt-2">
              <div className="flex flex-col gap-6">
                {/* Datos Personales */}
                <div className=" !p-4 rounded-lg !border border-gray-200 ">
                  <h3 className="!font-semibold !text-MD  !mb-4 flex items-center gap-2">
                    <FaUser c />
                    Datos Personales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {datosPersonales.map((dato, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="!font-semibold text-sm">{dato.label}</span>
                        <span className="!font-semibold !text-gray-600">{cliente[dato.atributo] || "No especificado"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Datos de Envío */}
                <div className="!p-4 rounded-lg !border border-gray-200">
                  <h3 className="!font-semibold !text-MD  !mb-4 flex items-center gap-2">
                    <FaUser  />
                    Datos de Envío
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {datosEnvio.map((dato, index) => (
                      <div key={index} className="flex flex-col ">
                        <span className="!font-semibold text-sm">{dato.label}</span>
                        <span className="!font-semibold !text-gray-600">
                          {cliente.direcciones?.[0]?.[dato.atributo] || "No especificado"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-700"
                >
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
