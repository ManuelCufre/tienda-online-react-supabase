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
import { useProductos } from "@/hooks/useProductos";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

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
  const [isOpen, setIsOpen] = useState(false);
  const { modificarProducto, loading, error } = useProductos();

  if (error) return toast.error(error.message);

  const {
    register,
    handleSubmit,
    watch,
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
      let tallesArray;

      if (typeof data.talles_disponibles === "string") {
        tallesArray = data.talles_disponibles
          .split(",")
          .map((t) => Number(t.trim()))
          .filter((t) => !isNaN(t));
      } else if (Array.isArray(data.talles_disponibles)) {
        tallesArray = data.talles_disponibles;
      } else {
        tallesArray = [];
      }

      const { id, ...datosSinId } = data;
      const datosActualizados = {
        ...datosSinId,
        talles_disponibles: tallesArray,
        activo: estado,
      };

      await modificarProducto({ id, datosActualizados });
      toast.success("Producto modificado con éxito!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error(error.message);
    }
  };

  const handleCerrar = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog.Root
      size="xl"
      placement={"center"}
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      <Dialog.Trigger asChild>
        <IconButton size={"xs"} margin={1}>
          <FaRegEdit />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header bg={{ base: "white", _dark: "#1A1A1A" }}>
                <Dialog.Title>Editar producto</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4" bg={{ base: "white", _dark: "#1A1A1A" }}>
                <Grid templateColumns="repeat(2, 1fr)" gap="6">
                  {campos.map((campo) => (
                    <Field.Root key={campo.name}>
                      <Field.Label>{campo.label}</Field.Label>
                      {campo.type === "select" ? (
                        <NativeSelect.Root
                          size="sm"
                          width="full"
                          value={
                            watch(campo.name) || producto[campo.name] || ""
                          }
                          onValueChange={(e) => {
                            setValue(campo.name, e.value);
                          }}
                        >
                          <NativeSelect.Field
                            placeholder="Seleccione una opcion"
                            {...register(campo.name, {
                              required: campo.required,
                            })}
                          >
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
                          ) : (
                            <Checkbox.Label>Inactivo</Checkbox.Label>
                          )}
                        </Checkbox.Root>
                      ) : (
                        <Input
                          type={campo.type}
                          min={0}
                          autoComplete="off"
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
              <Dialog.Footer bg={{ base: "white", _dark: "#1A1A1A" }}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={handleCerrar}>
                    Cancelar
                  </Button>
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
