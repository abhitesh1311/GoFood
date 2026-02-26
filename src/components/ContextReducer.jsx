import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {

    case "ADD": {
      const existIndex = state.findIndex(
        item => item.name === action.name && item.size === action.size
      );

      if (existIndex !== -1) {
        const updated = [...state];
        updated[existIndex] = {
          ...updated[existIndex],
          qty: updated[existIndex].qty + 1,
          price: updated[existIndex].price + action.price
        };
        return updated;
      }

      return [
        ...state,
        {
          name: action.name,
          qty: 1,
          size: action.size,
          price: action.price,
        }
      ];
    }

    case "REMOVE": {
      const existIndex = state.findIndex(
        item => item.name === action.name && item.size === action.size
      );

      if (existIndex === -1) return state;

      const updated = [...state];

      if (updated[existIndex].qty > 1) {
        updated[existIndex] = {
          ...updated[existIndex],
          qty: updated[existIndex].qty - 1,
          price: updated[existIndex].price - action.price
        };
        return updated;
      }

      updated.splice(existIndex, 1);
      return updated;
    }

    case "DROP":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);