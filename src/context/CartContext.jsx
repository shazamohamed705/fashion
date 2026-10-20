import { createContext, useContext, useReducer, useRef, useCallback } from 'react';

/* ─── State shape ─────────────────────────────────────────────────────────
   items: [{ id, name, color, size, qty, price, img }]
   flyAnim: null | { id: string, fromRect: DOMRect }  — triggers the fly dot
─────────────────────────────────────────────────────────────────────────── */

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { product, color, size, qty = 1 } = action.payload;
      const key = `${product.id}-${color}-${size}`;
      const existing = state.items.find(i => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.key === key ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            id: product.id,
            name: product.name,
            color,
            size,
            qty,
            price: product.price,
            img: product.img,
          },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.key !== action.payload.key) };

    case 'UPDATE_QTY': {
      const { key, qty } = action.payload;
      if (qty < 1) return state;
      return {
        ...state,
        items: state.items.map(i => (i.key === key ? { ...i, qty } : i)),
      };
    }

    case 'CLEAR':
      return { ...state, items: [] };

    default:
      return state;
  }
}

const initialState = { items: [] };

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* Ref to the cart icon DOM element in the Navbar */
  const cartIconRef = useRef(null);

  /* Flying dot animation state: list of active animations */
  const flyAnims = useRef([]);
  const setFlyAnims = useRef(null); // will be set by FlyAnimLayer

  const registerSetFlyAnims = useCallback((setter) => {
    setFlyAnims.current = setter;
  }, []);

  /**
   * addToCart — dispatches ADD_ITEM and triggers the fly-dot animation.
   * @param {object} product      — product from products.js
   * @param {string} color        — selected color label
   * @param {string} size         — selected size string
   * @param {number} qty          — quantity, default 1
   * @param {DOMRect|null} fromRect — getBoundingClientRect() of the trigger button
   */
  const addToCart = useCallback((product, color, size, qty = 1, fromRect = null) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, color, size, qty } });

    if (fromRect && cartIconRef.current && setFlyAnims.current) {
      const toRect = cartIconRef.current.getBoundingClientRect();
      const animId = `fly-${Date.now()}-${Math.random()}`;
      setFlyAnims.current(prev => [
        ...prev,
        { id: animId, fromRect, toRect },
      ]);
      // Remove after animation ends (750ms)
      setTimeout(() => {
        setFlyAnims.current(prev => prev.filter(a => a.id !== animId));
      }, 800);
    }
  }, []);

  const removeItem = useCallback((key) => dispatch({ type: 'REMOVE_ITEM', payload: { key } }), []);
  const updateQty  = useCallback((key, qty) => dispatch({ type: 'UPDATE_QTY', payload: { key, qty } }), []);
  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const totalItems    = state.items.reduce((s, i) => s + i.qty, 0);
  const merchandiseTotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      merchandiseTotal,
      addToCart,
      removeItem,
      updateQty,
      clearCart,
      cartIconRef,
      registerSetFlyAnims,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
