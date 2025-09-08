import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Field, Input, defineStyle, Grid, Button } from "@chakra-ui/react";
import { useCheckout } from "@/context/CheckoutContext";

export default function FormDatosPersonales() {
  const [enviado, setEnviado] = useState(false)
  const { setPersonalData, stepsCompleted } = useCheckout();
  
  const campos = [
    { label: "Nombre", name: "nombre", type: "text", required: true },
    { label: "Apellido", name: "apellido", type: "text", required: true },
    {
      label: "Correo electronico",
      name: "email",
      type: "email",
      required: true,
    },
    {
      label: "D.N.I (sin puntos ni espacios)",
      name: "dni",
      type: "number",
      required: true,
    },
    { label: "Teléfono", name: "telefono", type: "number", required: true },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Datos personales:", data);
    setPersonalData(data);
    setEnviado(true);
  };

  return (
    <div className="!pt-8 !px-4 !pb-16 !border rounded-md relative top-8">
      <h2 className="!font-semibold">Datos personales</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="w-full flex flex-col gap-4 items-center relative top-6 ">
          <Grid templateColumns="repeat(2, 1fr)" gap="4" width={'full'}>
            {campos.map((campo) => (
              <Field.Root>
                <Box pos="relative" w="full">
                  <Input
                    className="peer"
                    autoComplete="off"
                    type={campo.type}
                    min={0}
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
          <Button width={60} type="submit" disabled={enviado ? true : false}>Enviar</Button>
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
