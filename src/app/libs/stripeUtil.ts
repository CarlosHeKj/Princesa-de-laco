import Stripe from "stripe";

// Obtenha a chave secreta da Stripe
const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Stripe secret key is missing in environment variables");
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2025-04-30.basil",
});

// Função para listar produtos
export async function getProducts() {
  try {
    const products = await stripe.products.list();
    const formattedProducts = await Promise.all(
      products.data.map(async (product) => {
        const priceList = await stripe.prices.list({
          product: product.id,
          active: true,
        });

        const price = priceList.data[0];

        return {
          id: product.id,
          name: product.name,
          price: price?.unit_amount || 0,
          description: product.description || "",
          image: product.images[0] || "",
          category: product.metadata.category || "general",
          currency: price?.currency || "usd",
        };
      })
    );

    return formattedProducts;
  } catch (error) {
    console.error("Erro ao carregar os produtos do Stripe:", error);
    throw new Error("Erro ao carregar os produtos");
  }
}
