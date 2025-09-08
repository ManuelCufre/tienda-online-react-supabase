import { Children, createContext, useContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext();

// Obtener carrito desde localStorage
const getInitialCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  }
  return { items: [] };
};

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case "ADD_TO_CART":
      const existeProducto = state.items.find(
        (item) => item.id === action.payload.id && item.talle === action.payload.talle
      );

      if (existeProducto) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id && item.talle === action.payload.talle
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, cantidad: 1 }],
        };
      }
      break;

    case "REMOVE_FROM_CART":
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      break;

    case "INCREMENT_QUANTITY":
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ),
      };
      break;

    case "DECREMENT_QUANTITY":
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
            : item
        ),
      };
      break;

    case "CLEAR_CART":
      newState = {
        ...state,
        items: [],
      };
      break;

    default:
      newState = state;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(newState));
  }

  return newState;
};

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, getInitialCart());
    const [isCarritoOpen, setIsCarritoOpen] = useState(false);

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(state));
    }, [state]);

    const agregarAlCarrito = (producto) => {
        dispatch({type: 'ADD_TO_CART', payload: producto})
    }
    
    const eliminarDelCarrito = (productoId) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: productoId})
    }
    
    const aumentarCantidadCarrito = (productoId) => {
        dispatch({type: 'INCREMENT_QUANTITY', payload: productoId})
    }
    
    const decrementarCantidadCarrito = (productoId) => {
        dispatch({type: 'DECREMENT_QUANTITY', payload: productoId})
    }
    
    const vaciarCarrito = () => {
        dispatch({type: 'CLEAR_CART'})
    }

    const totalItems = state.items.reduce((sum, item) => sum + item.cantidad, 0)
    const totalPrecio = state.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    const costoEnvio = 9800
    const totalConEnvio = totalPrecio + costoEnvio


    const value = {
        items: state.items,
        agregarAlCarrito,
        eliminarDelCarrito,
        aumentarCantidadCarrito,
        decrementarCantidadCarrito,
        vaciarCarrito,
        totalItems,
        totalPrecio,
        costoEnvio,
        totalConEnvio,
        isCarritoOpen, 
        setIsCarritoOpen,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}