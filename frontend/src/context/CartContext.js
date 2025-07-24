import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const exist = state.find(item => item._id === action.payload._id);
      if (exist) {
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case 'REMOVE_ONE':
      return state
        .map(item =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload);
    
    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}


export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
