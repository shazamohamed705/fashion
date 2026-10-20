import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

/**
 * Renders flying "pill" dots that animate from the Add-to-cart button
 * to the cart icon in the Navbar.  Mount this once inside CartProvider,
 * at the very root of the React tree (inside Layout).
 */
export default function FlyAnimLayer() {
  const { registerSetFlyAnims } = useCart();
  const [anims, setAnims] = useState([]);

  useEffect(() => {
    registerSetFlyAnims(setAnims);
  }, [registerSetFlyAnims]);

  if (anims.length === 0) return null;

  return (
    <>
      {anims.map(({ id, fromRect, toRect }) => (
        <FlyDot key={id} fromRect={fromRect} toRect={toRect} />
      ))}
    </>
  );
}

function FlyDot({ fromRect, toRect }) {
  /* Start position: center of the trigger element */
  const startX = fromRect.left + fromRect.width  / 2;
  const startY = fromRect.top  + fromRect.height / 2;

  /* End position: center of the cart icon */
  const endX = toRect.left + toRect.width  / 2;
  const endY = toRect.top  + toRect.height / 2;

  const dx = endX - startX;
  const dy = endY - startY;

  /* CSS custom props drive the keyframe animation defined in index.css */
  return (
    <span
      aria-hidden="true"
      className="fly-dot"
      style={{
        position: 'fixed',
        left: startX - 10,
        top:  startY - 10,
        '--fly-dx': `${dx}px`,
        '--fly-dy': `${dy}px`,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
