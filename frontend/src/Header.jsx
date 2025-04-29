import {
  Tabs,
  Button,
  CloseButton,
  Drawer,
  Portal,
  EmptyState,
  VStack,
  Popover,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import { FaShoppingBag } from "react-icons/fa";
import ProductoAgregadoCarrito from "./ProductoAgregadoCarrito";
import useSupaBase from "./useSupaBase";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Header({ productosAgregados, setProductosAgregados }) {
  const { cerrarSesion, user } = useSupaBase();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="header">
        <Tabs.Root defaultValue="members" variant="plain">
          <Tabs.List bg="bg.muted" rounded="l3" p="1">
            <Tabs.Trigger value="members">Members</Tabs.Trigger>
            <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
            <a href="http://localhost:5173/admin/productos">
              <Tabs.Trigger value="tasks">Admin</Tabs.Trigger>
            </a>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
        </Tabs.Root>

        <div className="flex gap-4">
          <Drawer.Root size="sm">
            <Drawer.Trigger asChild>
              <Button variant="outline" size="sm">
                <FaShoppingBag />
              </Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Carrito</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    {productosAgregados.length === 0 ? (
                      <EmptyState.Root size="lg">
                        <EmptyState.Content>
                          <EmptyState.Indicator>
                            <FaShoppingBag />
                          </EmptyState.Indicator>
                          <VStack textAlign="center">
                            <EmptyState.Title>
                              El carrito esta vacío
                            </EmptyState.Title>
                            <EmptyState.Description>
                              Explore nuestros productos y agrega artículos a tu
                              carrito
                            </EmptyState.Description>
                          </VStack>
                        </EmptyState.Content>
                      </EmptyState.Root>
                    ) : (
                      <ProductoAgregadoCarrito
                        productosAgregados={productosAgregados}
                        setProductosAgregados={setProductosAgregados}
                      />
                    )}
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Button>Realizar pedido</Button>
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
          {user ? (
            <div className="flex items-center gap-2">
             

              <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Popover.Trigger asChild>
                  <FaUserCircle className="w-6 h-6" />
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content>
                      <Popover.Arrow />
                      <Popover.Body className="flex flex-col gap-2 p-4">
                      <span>{user.email}</span>
                      <Button onClick={() => cerrarSesion()}>Cerrar Sesión</Button>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>
            </div>
          ) : (
            <div>
              <NavLink to="/login">
                <Button variant={"outline"}>Iniciar Sesión</Button>
              </NavLink>

              <NavLink to="/login">
                <Button>Registrarse</Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
