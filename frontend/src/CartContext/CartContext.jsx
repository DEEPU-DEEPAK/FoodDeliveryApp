import { createContext, useContext, useCallback, useEffect, useReducer } from "react";
import axios from "axios";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {

    case "HYDRATE_CART":
      return action.payload;


    case 'ADD_ITEM': {
      const { _id, item, quantity } = action.payload;
      const exists = state.find(ci => ci._id === _id);
      if (exists) {
        return state.map(ci =>
          ci._id === _id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...state, { _id, item, quantity }];
    }

    case 'REMOVE_ITEM': {
      return state.filter(ci => ci._id !== action.payload);
    }

    case 'UPDATE_ITEM': {
      const { _id, quantity } = action.payload;
      return state.map(ci =>
        ci._id === _id ? { ...ci, quantity } : ci
      );
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
  }
};

const initializer = () => {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios.get('https://fooddeliveryapp-backend-d6ry.onrender.com/api/cart', {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => dispatch({ type: 'HYDRATE_CART', payload: res.data }))
      .catch(err => { if (err.response?.status !== 401) console.error('err') });
  }, [])

  // const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // const formatTotalItems = (num) => {
  //   if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  //   return num;
  // };



  const addToCart = useCallback(async (item, qty) => {
    const token = localStorage.getItem('authToken');
    const res = await axios.post('https://fooddeliveryapp-backend-d6ry.onrender.com/api/cart',
      {
        itemId: item._id,
        quantity: qty,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })

    dispatch({ type: 'ADD_ITEM', payload: res.data });
  }, []);

  const removeFromCart = useCallback(async _id => {
    const token = localStorage.getItem('authToken');
    await axios.delete(`https://fooddeliveryapp-backend-d6ry.onrender.com/api/cart/${_id}`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
    dispatch({ type: 'REMOVE_ITEM', payload: _id });
  }, []);

  const updateQuantity = useCallback(async (_id, qty) => {
    const token = localStorage.getItem('authToken');
    const res = await axios.put(`https://fooddeliveryapp-backend-d6ry.onrender.com/api/cart/${_id}`,
      {
        quantity: qty,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
    dispatch({ type: 'UPDATE_ITEM', payload: res.data });
  }, []);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    await axios.post('https://fooddeliveryapp-backend-d6ry.onrender.com/api/cart/clear',
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // Total quantity of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of items in cart
  const totalAmount = cartItems.reduce((sum, ci) => {
    const price = ci?.item?.price ?? 0;
    const quantity = ci?.quantity ?? 0;
    return sum + price * quantity;
  }, 0);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
