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
        <h1 className="font-bold text-2xl mt-20">Produtos abaixo de R$50,00</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
          {ProductsList(0, 50)}
        </div>

        
      </div>
    </div>
  );
}