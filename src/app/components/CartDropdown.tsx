'use client';

import { useCart } from "../context/CartContext";
import { formatPrice } from "../libs/utils";
import ProductImage from "./ProductImage";

interface Props {
  open: boolean;
}

export default function CartDropdown({ open }: Props) {
  const { cart, removeFromCart } = useCart();

  if (!open) return null;

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0);

  // Número do WhatsApp (coloque o número no formato internacional, ex: 5511999999999)
  const whatsappNumber = "5521994552680";

  // Função que monta a mensagem para o WhatsApp
  function generateWhatsappMessage() {
    if (cart.length === 0) return "Olá, meu carrinho está vazio.";

    let message = "Olá, gostaria de fazer o pedido:\n\n";

    cart.forEach((item) => {
      const qty = item.quantity ?? 1;
      const priceFormatted = formatPrice(item.price * qty);
      message += `- ${item.name} (Qtd: ${qty}) - ${priceFormatted}\n`;
    });

    message += `\nTotal: ${formatPrice(total)}\n\nObrigado!`;

    return message;
  }

  // Handler do botão finalizar compra
  function handleFinalizePurchase() {
    const message = generateWhatsappMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-xl rounded-lg p-4 z-50 border">
      <h2 className="font-bold text-lg mb-2">Carrinho</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 border-b pb-2">
              <div className="w-[50px] h-[50px] relative flex-shrink-0">
                <ProductImage product={item} fill />
              </div>

              <div className="flex flex-col flex-grow text-sm">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-gray-500 text-xs">Qtd: {item.quantity ?? 1}</span>
                <span className="text-purple-600 font-bold">
                  {formatPrice(item.price * (item.quantity ?? 1))}
                </span>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-xl font-bold"
                aria-label={`Remover ${item.name} do carrinho`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <div className="mt-3 text-right font-semibold text-sm">
            Total: {formatPrice(total)}
          </div>

          <button
            onClick={handleFinalizePurchase}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          >
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
