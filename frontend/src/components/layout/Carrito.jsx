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
  const {
    items,
    totalPrecio,
    eliminarDelCarrito,
    VaciarCarrito,
    isCarritoOpen,
    setIsCarritoOpen,
  } = useCart();

  return (
    <Drawer.Root
      size="sm"
      open={isCarritoOpen}
      onOpenChange={({ open }) => setIsCarritoOpen(open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="sm" position="relative">
          <FaShoppingBag />
          {items.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                background: "#444444",
                color: "white",
                borderRadius: "50%",
                width: 18,
                height: 18,
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              {items.length}
            </span>
          )}
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
                <ProductoAgregadoCarrito />
              )}
            </Drawer.Body>
            <Drawer.Footer>
              <Link to="/checkout/cart">
                <Button>Finalizar compra</Button>
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
