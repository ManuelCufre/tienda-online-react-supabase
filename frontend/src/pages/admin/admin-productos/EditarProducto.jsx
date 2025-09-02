import {
  Button,
  IconButton,
  Dialog,
  Portal,
  Input,
  Field,
  Text,
  Grid,
  NativeSelect,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSupaBase from "@/hooks/useSupaBase";
import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const campos = [
  { label: "Nombre", name: "nombre", type: "text", required: true },
  { label: "Descripción", name: "descripcion", type: "text", required: true },
  { label: "Precio", name: "precio", type: "number", required: true },
  { label: "Imagen", name: "imagen", type: "text", required: true },
  { label: "Color", name: "color", type: "text", required: true },
  { label: "Stock", name: "stock", type: "number", required: true },
  {
    label: "Marca",
    name: "marca",
    type: "select",
    options: [
      "Nike",
      "Adidas",
      "Puma",
      "New Balance",
      "Topper",
      "Fila",
      "Jaguar",
    ],
    required: true,
  },
  {
    label: "Talles disponibles",
    name: "talles_disponibles",
    type: "text",
    required: true,
    placeholder: "Ej: 38,39,40",
  },
  {
    label: "Género",
    name: "genero",
    type: "select",
    options: ["Unisex", "Hombre", "Mujer"],
    required: true,
  },
  { label: "Activo", name: "activo", type: "checkbox", required: false },
];

export default function EditarProducto({ producto }) {
  const [estado, setEstado] = useState(producto.activo);

  const { updateProduct, loading, error } = useSupaBase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: producto,
  });

  const handleEstadoChange = () => {
    if (estado === true) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data)
      // Aquí podrías cerrar el diálogo o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <Dialog.Root size="xl" placement={"center"}>
      <Dialog.Trigger asChild>
        <IconButton variant={"ghost"} size={"md"}>
          <FaRegEdit />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>Editar producto</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Grid templateColumns="repeat(2, 1fr)" gap="6">
                  {campos.map((campo) => (
                    <Field.Root key={campo.name}>
                      <Field.Label>{campo.label}</Field.Label>
                      {campo.type === "select" ? (
                        <NativeSelect.Root
                          size="sm"
                          width="full"
                          {...register(campo.name, {
                            required: campo.required,
                          })}
                        >
                          <NativeSelect.Field placeholder="Seleccione una opcion">
                            {campo.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      ) : campo.type === "checkbox" ? (
                        <Checkbox.Root
                          variant="solid"
                          defaultChecked={estado}
                          onCheckedChange={handleEstadoChange}
                        >
                          <Checkbox.HiddenInput {...register(campo.name)} />
                          <Checkbox.Control />
                          {estado === true ? (
                          <Checkbox.Label>Activo</Checkbox.Label>

                          ): (
                          <Checkbox.Label>Inactivo</Checkbox.Label>

                          )}
                        </Checkbox.Root>
                      ) : (
                        <Input
                          type={campo.type}
                          placeholder={campo.placeholder || campo.label}
                          {...register(campo.name, {
                            required: campo.required,
                          })}
                        />
                      )}
                      {errors[campo.name] && (
                        <Text color="red.500" fontSize="sm">
                          {errors[campo.name].message || "Campo requerido"}
                        </Text>
                      )}
                    </Field.Root>
                  ))}
                </Grid>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button type="submit" isLoading={loading}>
                  {loading ? "Guardando..." : "Aceptar"}
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
