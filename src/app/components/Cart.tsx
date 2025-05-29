"use client";

import { useCart } from "../context/CartContext";
import { formatPrice } from "../libs/utils";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-2">Carrinho</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  {item.name} x {item.quantity}
                </div>
                <div className="flex gap-2">
                  <span>{formatPrice(item.price * item.quantity)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600">
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-semibold">Total: {formatPrice(total)}</div>
          <button
            onClick={clearCart}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Limpar Carrinho
          </button>
        </>
      )}
    </div>
  );
}
