import { 
    Tabs, 
    Button,
    CloseButton, 
    Drawer, 
    Portal,
    EmptyState,
    VStack
} from "@chakra-ui/react"
import { FaShoppingBag } from "react-icons/fa";
import ProductoAgregadoCarrito from "./ProductoAgregadoCarrito";

export default function Header({productosAgregados, setProductosAgregados}) {
    return (
      <>
       <div className="header">
         <Tabs.Root defaultValue="members" variant="plain">
         <Tabs.List bg="bg.muted" rounded="l3" p="1">
           <Tabs.Trigger value="members">
             Members
           </Tabs.Trigger>
           <Tabs.Trigger value="projects">
             Projects
           </Tabs.Trigger>
           <a href="http://localhost:5173/admin/productos">
           <Tabs.Trigger value="tasks">
             Admin
           </Tabs.Trigger>
           </a>
           <Tabs.Indicator rounded="l2" />
         </Tabs.List>
        </Tabs.Root>
        
        <div>
            <Drawer.Root size= "sm">
                <Drawer.Trigger asChild>
                  <Button variant="outline" size="sm">
                  <FaShoppingBag/>
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
                                <FaShoppingBag/>
                              </EmptyState.Indicator>
                              <VStack textAlign="center">
                                <EmptyState.Title>El carrito esta vacío</EmptyState.Title>
                                <EmptyState.Description>
                                  Explore nuestros productos y agrega artículos a tu carrito
                                </EmptyState.Description>
                              </VStack>
                            </EmptyState.Content>
                          </EmptyState.Root>
                        ) : (
                          <ProductoAgregadoCarrito productosAgregados = {productosAgregados} setProductosAgregados={setProductosAgregados}/>
                        )}
                      </Drawer.Body>
                      <Drawer.Footer>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save</Button>
                      </Drawer.Footer>
                      <Drawer.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Drawer.CloseTrigger>
                    </Drawer.Content>
                  </Drawer.Positioner>
               </Portal>
             </Drawer.Root>
        </div>
       </div>
      </>
       
       
    )
 }