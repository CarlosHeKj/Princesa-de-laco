"use client";

import { ProductType } from "../types/ProductType";
import { formatPrice } from "../libs/utils";
import ProductImage from "./ProductImage";
import { useCart } from "../context/CartContext";

type ModalProps = {
  product: ProductType | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ModalProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="w-full h-full flex justify-center items-center mb-4">
          <ProductImage product={product} />
        </div>

        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2 text-gray-700">{product.description}</p>
        <p className="mt-4 text-purple-600 font-semibold text-lg">
          {formatPrice(product.price)}
        </p>

      
        <button
          onClick={() => {
            addToCart(product);
            onClose();
          }}
          className="mt-6 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 w-full"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
