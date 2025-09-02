import { Button } from "@chakra-ui/react";
export default function HeaderAdmin() {
  return (
    <div className="w-screen !shadow-sm h-16 flex items-center justify-center">
      <div className="flex w-[80vw] justify-between items-center">
        <h1 className="!font-semibold">Panel administrador</h1>
        <div className="flex gap-2">
          <Button variant={'ghost'}>Productos</Button>
          <Button variant={'ghost'}>Pedidos</Button>
          <Button variant={'ghost'}>Usuarios</Button>
        </div>
      </div>
    </div>
  );
}
