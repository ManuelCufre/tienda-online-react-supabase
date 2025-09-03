import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useProductos } from "@/hooks/useProductos";
import { Image, IconButton, Button } from "@chakra-ui/react";

import Header from "@/components/layout/Header";
export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productoQuery, loading } = useProductos();
  const { agregarAlCarrito } = useCart();
  const [producto, setProducto] = useState(null);

  //useEffect(() => {
  //  let isMounted = true;
//
  //  const cargarProducto = async () => {
  //    if (!id) {
  //      navigate("/productos");
  //      return;
  //    }
//
//
  //    if (isMounted && productoData) {
  //      setProducto(productoData);
  //    } else if (isMounted) {
  //      navigate("/productos");
  //    }
  //  };
//
  //  cargarProducto();
//
  //  return () => {
  //    isMounted = false;
  //  };
  //}, [id, productoQuery, navigate]);

  return (
    <div className="flex flex-col gap-20 items-center">
      <Header />
       {producto && (
      <div className="w-[65vw] flex gap-4 justify-between">
       
        <div>
          <Image
            objectFit="cover"
            maxW="500px"
            src={producto.imagen}
            alt="Caffe Latte"
            rounded="lg"
          />
        </div>
        <div className="w-[45%] flex flex-col  gap-4">
          <h3 className="!font-semibold !text-lg">{producto.nombre}</h3>
          <span className="!font-semibold !text-sm text-gray-400">
            {producto.descripcion}
          </span>
          <span className="!font-bold !text-md">$ {producto.precio}</span>
        </div>
      </div>
      )}
    </div>
  );
}
