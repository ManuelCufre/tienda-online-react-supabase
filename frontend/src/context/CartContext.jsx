import { Children, createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existeProducto = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existeProducto) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, cantidad: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        items: items.map((item) =>
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        items: items.map((item) =>
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, {items: []})

    const agregarAlCarrito = (producto) => {
        dispatch({type: 'ADD_TO_CART', payload: producto})
    }
    const eliminarDelCarrito = (productoId) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: productoId})
    }
    const aumentarCantidadCarrito = (productoId) => {
        dispatch({type: 'INCREMENT_CART', payload: productoId})
    }
    const decrementarCantidadCarrito = (productoId) => {
        dispatch({type: 'DECREMENT_CART', payload: productoId})
    }
    const vaciarCarrito = () => {
        dispatch({type: 'CLEAR_CART'})
    }

     // Calcular totales
  const totalItems = state.items.reduce((sum, item) => sum + item.cantidad, 0)
  const totalPrecio = state.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)


    const value = {
    items: state.items,
    agregarAlCarrito,
    eliminarDelCarrito,
    aumentarCantidadCarrito,
    decrementarCantidadCarrito,
    vaciarCarrito,
    totalItems,
    totalPrecio,
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
