// app/page.tsx ou ./Home.tsx
import { ProductType } from "./types/ProductType";
import { getAllProducts } from "./libs/stripeUtil";
import ProductSection from "./components/ProductSection";

export default async function Home() {
  let products: ProductType[] = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Falha ao carregar produtos:", error);
  }

  return (
    <div className="max-w-7xl mx-auto md:pt-8 md:px-8 pt-1 px-0 xl:px-0">
      <ProductSection products={products} />
    </div>
  );
}
