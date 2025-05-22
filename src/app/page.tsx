import { ProductType } from "./types/ProductType";
import Product from "./components/Product";
import { getProducts } from "./libs/stripeUtil";

// Componente principal
export default async function Home() {
  console.log("Iniciando requisição...");
  let products: ProductType[] = [];  // Tipando explicitamente como ProductType[]
  
  try {
    products = await getProducts();  // A função getProducts agora retorna ProductType[]
  } catch (error) {
    console.error('Falha ao carregar produtos:', error);
  }

  function ProductsList(min: number, max: number) {
    const productElements = [];
    for (let i = 0; i < products.length; i++) {
      const productPrice = products[i].price / 100; // Convertendo de centavos para reais
      if (productPrice > min && productPrice <= max) {
        productElements.push(<Product key={products[i].id} product={products[i]} />);
      }
    }
    return productElements;
  }

  return (
    <div>
     

      <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 ">
        <h1 className="font-bold text-2xl mt-20">Vestidos de princesas</h1>
  <div className="flex overflow-x-auto space-x-6 scroll-smooth px-4 py-2 scroll-thumb-rounded">
  {ProductsList(0, 50000).map((product, index) => (
    <div key={index} className="min-w-[250px] flex-shrink-0">
      {product}
    </div>
  ))}
</div>

        
      </div>
    </div>
  );
}