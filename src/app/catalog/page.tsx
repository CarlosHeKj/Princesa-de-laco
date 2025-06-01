'use client';

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from 'next/navigation'; 
import Product from "../components/Product";
import ProductModal from "../components/ProductModal";

// Define o tipo dos produtos
type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  currency: string;
};

// Função para buscar os produtos da API
async function getProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data;
}

export default function Catalog() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null); // 👈 Adicionado
  const searchParams = useSearchParams(); 
  const searchTerm = searchParams?.get("search") || ''; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.includes("Todos") ||
        selectedFilters.some((filter) =>
          product.description.toLowerCase().includes(filter.toLowerCase())
        );

      return matchesSearch && matchesFilters;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedFilters]);

 

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="max-w-7xl mx-auto pt-8 px-1 xl:px-0">
      <h1 className="font-bold text-2xl mt-20">Produtos</h1>

      

      <div className="grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)}>
              <Product product={product} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">Produto não encontrado.</p>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
