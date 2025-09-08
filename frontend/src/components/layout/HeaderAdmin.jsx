import { Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function HeaderAdmin() {
    const location = useLocation();
    const currentPath = location.pathname; // Ej: "/admin/productos"

    // Extraer el último segmento de la URL
    const currentModule = currentPath.split('/').pop(); // "productos"

    return (
        <div className="w-screen !shadow-sm h-16 flex items-center justify-center">
            <div className="flex w-[80vw] justify-between items-center">
                <h1 className="!font-semibold">Panel administrador</h1>
                <div className="flex gap-2">
                    <Link to="/admin/productos">
                        <Button variant={currentModule === 'productos' ? 'surface' : 'ghost'}>
                            Productos
                        </Button>
                    </Link>
                    <Link to="/admin/ventas">
                        <Button variant={currentModule === 'ventas' ? 'surface' : 'ghost'}>
                            Ventas
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}