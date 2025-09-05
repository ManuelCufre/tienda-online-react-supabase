import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Field, Input, defineStyle, Grid } from "@chakra-ui/react";

export default function FormEnvio() {
  const campos = [
    { label: "Provincia", name: "provincia", type: "text", required: true },
    { label: "Ciudad", name: "ciudad", type: "text", required: true },
    {
      label: "Calle",
      name: "text",
      type: "type",
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
      { label: "Infomacion adicional", name: "comentario", type: "text",  },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
     console.log(data)
    };
  

  return (
    <div >
        <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="repeat(2, 1fr)" gap="4" padding={4}>
        {campos.map((campo) => (
          <Field.Root>
            <Box pos="relative" w="full">
              <Input
                className="peer"
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
