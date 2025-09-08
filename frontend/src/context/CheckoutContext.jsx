import { createContext, useContext, useReducer } from "react";

const CheckoutContext = createContext();

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERSONAL_DATA":
      return {
        ...state,
        personalData: action.payload,
        stepsCompleted: { ...state.stepsCompleted, personalData: true }
      };
    
    case "SET_SHIPPING_DATA":
      return {
        ...state,
        shippingData: action.payload,
        stepsCompleted: { ...state.stepsCompleted, shipping: true }
      };
    
    case "SET_PAYMENT_DATA":
      return {
        ...state,
        paymentData: action.payload,
        stepsCompleted: { ...state.stepsCompleted, payment: true }
      };
    
    case "RESET_CHECKOUT":
      return {
        personalData: null,
        shippingData: null,
        paymentData: null,
        stepsCompleted: {
          personalData: false,
          shipping: false,
          payment: false
        }
      };
    
    default:
      return state;
  }
};

const initialState = {
  personalData: null,
  shippingData: null,
  paymentData: null,
  stepsCompleted: {
    personalData: false,
    shipping: false,
    payment: false
  }
};

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const setPersonalData = (data) => {
    dispatch({ type: "SET_PERSONAL_DATA", payload: data });
  };

  const setShippingData = (data) => {
    dispatch({ type: "SET_SHIPPING_DATA", payload: data });
  };

  const setPaymentData = (data) => {
    dispatch({ type: "SET_PAYMENT_DATA", payload: data });
  };

  const resetCheckout = () => {
    dispatch({ type: "RESET_CHECKOUT" });
  };

  const isAllStepsCompleted = () => {
    return Object.values(state.stepsCompleted).every(completed => completed);
  };

  const getCheckoutData = () => {
    return {
      personalData: state.personalData,
      shippingData: state.shippingData,
      paymentData: state.paymentData
    };
  };

  const value = {
    ...state,
    setPersonalData,
    setShippingData,
    setPaymentData,
    resetCheckout,
    isAllStepsCompleted,
    getCheckoutData
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout debe usarse dentro de un CheckoutProvider');
  }
  return context;
};
