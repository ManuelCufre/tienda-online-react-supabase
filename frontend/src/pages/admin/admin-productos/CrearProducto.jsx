import {
  Button,
  Dialog,
  Portal,
  Input,
  Stack,
  Field,
  Text,
  Grid,
  Checkbox,
  NativeSelect, // Añadir useToast para notificaciones
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useProductos } from "@/hooks/useProductos";
import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
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
  { label: "Estado", name: "activo", type: "checkbox", required: false },
];

export default function CrearProducto() {
  const { loading, error, crearProducto } = useProductos();
  const [isOpen, setIsOpen] = useState(false);
  const [estado, setEstado] = useState(true);

  if (error) return toast.error(error.message);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleEstadoChange = () => {
    if (estado === true) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  };

  const onSubmit = async (data) => {
    const processedData = {
      ...data,
      talles_disponibles: data.talles_disponibles
        .split(",")
        .map((t) => Number(t.trim())),
    };

    try {
      await crearProducto(processedData);
      setIsOpen(false);
      reset();
      toast.success("Producto creado con exito!");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return toast.error(error.message);
    }
  };

  const handleCerrar = () => {
    reset();
    setIsOpen(false);
  };
  return (
    <div className="w-full flex items-center justify-center">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="w-[80vw] flex justify-between items-center">
        <Link to="/productos">
          <Button variant={"subtle"}>
            <MdOutlineKeyboardBackspace />
            Ir a publicaciones
          </Button>
        </Link>

        {/* Botón para abrir el modal */}
        <Button onClick={() => setIsOpen(true)} variant={'subtle'}>Nuevo producto</Button>

        {/* Modal controlado por el estado isOpen */}
        <Dialog.Root
          size="xl"
          placement={"center"}
          open={isOpen}
          onOpenChange={(e) => setIsOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Dialog.Header bg={{ base: "white", _dark: "#1A1A1A" }}>
                    <Dialog.Title>Crear producto</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb="4" bg={{ base: "white", _dark: "#1A1A1A" }}>
                    <Grid templateColumns="repeat(2, 1fr)" gap="6">
                      {campos.map((campo) => (
                        <Field.Root key={campo.name}>
                          <Field.Label>{campo.label}</Field.Label>
                          {campo.type === "select" ? (
                            <NativeSelect.Root size="sm" width="full">
                              <NativeSelect.Field
                                {...register(campo.name, {
                                  required: campo.required,
                                })}
                                placeholder="Seleccione una opcion"
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
                              autoComplete="off"
                              min={0}
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
                    {/* Botón para cerrar el modal */}
                    <Button variant="outline" onClick={handleCerrar}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {loading ? "Cargando" : "Aceptar"}
                    </Button>
                  </Dialog.Footer>
                </form>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
