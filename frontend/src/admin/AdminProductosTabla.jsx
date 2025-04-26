import { Table, Button, Dialog, Portal, Input, Stack, Field } from "@chakra-ui/react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBack2Fill } from "react-icons/ri";
import "../App.css";
import { useForm } from "react-hook-form"
import useSupaBase from "../useSupaBase";


export default function AdminProductosTabla() {
  const [nuevoProducto, setNuevoProducto] = useState([]);
  const { register, handleSubmit, formState : {errors} } = useForm()
  const { productos, loading, error, getProductos } = useSupaBase();

  const onSubmit = (data) => console.log(data)

  if (loading) return <div>Cargando...</div>;
  return (
    <div>
      <div>
      <Dialog.Root size='lg'>
      <Dialog.Trigger asChild>
        <Button >Nuevo producto</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Header>
              <Dialog.Title>Crear producto</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">

             
             <Stack gap="4">
                <Field.Root>
                  <Field.Label>Nombre</Field.Label>
                  <Input placeholder="Nombre" {...register("nombre", {required: {value: true, message: "Campo requerido",}})}/>
                  {errors.nombre && (
                    <Field.ErrorText>{errors.nombre.message}</Field.ErrorText>
                  )}
                </Field.Root>
                <Field.Root>
                  <Field.Label>Descripción</Field.Label>
                  <Input placeholder="Descripción" {...register("descripción")}/>
                </Field.Root>
                <div className="flex gap-4">
                <Field.Root>
                  <Field.Label>Precio</Field.Label>
                  <Input placeholder="Precio" type="number" {...register("precio")}/>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Imagen</Field.Label>
                  <Input placeholder="Imagen" {...register("imagen")}/>
                </Field.Root>
                </div>
              </Stack>
             
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button type="submit">Aceptar</Button>
            </Dialog.Footer>
            
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
      </div>
      <div className="tabla-productos">
        <Table.Root size="md" variant="outline" maxWidth={"80vw"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>Producto</Table.ColumnHeader>
              <Table.ColumnHeader>Descripción</Table.ColumnHeader>
              <Table.ColumnHeader>Precio</Table.ColumnHeader>
              <Table.ColumnHeader>Imagen</Table.ColumnHeader>
              <Table.ColumnHeader className="w-10">Editar</Table.ColumnHeader>
              <Table.ColumnHeader className="w-10">Eliminar</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {productos.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.nombre}</Table.Cell>
                <Table.Cell>{item.descripción}</Table.Cell>
                <Table.Cell>$ {item.precio}</Table.Cell>
                <Table.Cell>
                  <img src={item.imagen} alt="" className="w-10"/>
                </Table.Cell>
                <Table.Cell>
                  <Button size="xs">
                    <CiEdit />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button size="xs" colorPalette="red">
                    <RiDeleteBack2Fill />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
