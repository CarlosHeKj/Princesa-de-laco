// components/ProductSection.tsx
"use client";

import { useState } from "react";
import { ProductType } from "../types/ProductType";
import Product from "./Product";
import ProductModal from "./ProductModal";

type Props = {
  products: ProductType[];
};

export default function ProductSection({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

const ProductsList = (categoria: string) => {
  return products
    .filter((p) => p.name.toLowerCase().includes(categoria.toLowerCase()))
    .map((p) => (
      <div key={p.id} className="flex-shrink-0">
        <Product product={p} onClick={() => setSelectedProduct(p)} />
      </div>
    ));
};

  return (
    <>
      <h1 className="font-bold text-2xl mt-20">Atacado 1</h1>
      <div className="flex overflow-x-auto space-x-6 scroll-smooth px-1 py-2 scroll-thumb-rounded">
        {ProductsList("1/Atacado")}
      </div>

      <h1 className="font-bold text-2xl mt-20">Atacado 2</h1>
      <div className="flex overflow-x-auto space-x-6 scroll-smooth px-1 py-2 scroll-thumb-rounded">
       {ProductsList("2/Atacado")}
      </div>

      <h1 className="font-bold text-2xl mt-20">Atacado 3</h1>
      <div className="flex overflow-x-auto space-x-6 scroll-smooth px-1 py-2 scroll-thumb-rounded">
        {ProductsList("3/Atacado")}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
