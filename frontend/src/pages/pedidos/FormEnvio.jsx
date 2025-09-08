import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Field, Input, defineStyle, Grid, Button } from "@chakra-ui/react";
import { useCheckout } from "@/context/CheckoutContext";

export default function FormEnvio() {
  const [enviado, setEnviado] = useState(false);
  const { setShippingData } = useCheckout();
  
  const campos = [
    { label: "Provincia", name: "provincia", type: "text", required: true },
    { label: "Ciudad", name: "ciudad", type: "text", required: true },
    {
      label: "Calle",
      name: "calle",
      type: "text",
      required: true,
    },
    {
      label: "Número",
      name: "numero",
      type: "number",
      required: true,
    },
    { label: "Piso/Departamento", name: "piso_departamento", type: "text", },
     { label: "¿Quien recibe el producto?", name: "recibe", type: "text", required: true },
      { label: "Información adicional", name: "comentario", type: "text",  },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setShippingData(data);
    setEnviado(true);
  };
  

  return (
    <div className="!pt-8 !px-4 !pb-16 !border rounded-md relative top-8">
      <h2 className="!font-semibold">Datos de envío</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-4 items-center relative top-6 ">

        <Grid templateColumns="repeat(2, 1fr)" gap="4" width={'full'} >
          {campos.map((campo, index) => (
            <Field.Root key={index}>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  type={campo.type}
                  {...register(campo.name, {
                    required: campo.required,
                  })}
                />
                <Field.Label fontSize={"xs"} css={floatingStyles}>
                  {campo.label}
                </Field.Label>
              </Box>
            </Field.Root>
          ))}
        </Grid>
        
          <Button 
            type="submit" 
            disabled={enviado}
            width="200px"
          >
            {enviado ? "Datos guardados" : "Confirmar envío"}
          </Button>
        </div>
      </form>
    </div>
  );
}

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});
