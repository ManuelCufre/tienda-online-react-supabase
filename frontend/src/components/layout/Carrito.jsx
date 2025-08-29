import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  EmptyState,
  VStack,
} from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import ProductoAgregadoCarrito from "@/pages/productos/ProductoAgregadoCarrito";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
export default function Carrito() {
  const { items, totalPrecio, eliminarDelCarrito, VaciarCarrito } = useCart();

  return (
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
              {items.length === 0 ? (
                <EmptyState.Root size="lg">
                  <EmptyState.Content>
                    <EmptyState.Indicator>
                      <FaShoppingBag />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                      <EmptyState.Title>El carrito esta vacío</EmptyState.Title>
                      <EmptyState.Description>
                        Explore nuestros productos y agrega artículos a tu
                        carrito
                      </EmptyState.Description>
                    </VStack>
                  </EmptyState.Content>
                </EmptyState.Root>
              ) : (
                <ProductoAgregadoCarrito/>
              )}
            </Drawer.Body>
            <Drawer.Footer>
              <Link to="/pedidos">
                <Button>Realizar pedido</Button>
              </Link>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
