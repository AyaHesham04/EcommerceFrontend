import React, { createContext, useReducer, useContext } from 'react';

const CartStateCtx = createContext();
const CartDispatchCtx = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return;
    case 'REMOVE_ITEM':
      return;
    case 'CLEAR':
      return [];
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchCtx.Provider value={dispatch}>
      <CartStateCtx.Provider value={state}>
        {children}
      </CartStateCtx.Provider>
    </CartDispatchCtx.Provider>
  );
}

export const useCart = () => useContext(CartStateCtx);
export const useCartDispatch = () => useContext(CartDispatchCtx);
