import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function getProducts() {
  try {
    let allProducts: Stripe.Product[] = [];
    let hasMore = true;
    let startingAfter: string | undefined = undefined;

    // Buscar produtos em lotes de 100, expandindo o default_price
    while (hasMore) {
      const response: Stripe.ApiList<Stripe.Product> = await stripe.products.list({
        limit: 100,
        starting_after: startingAfter,
        expand: ["data.default_price"],
      });

      allProducts.push(...response.data);
      hasMore = response.has_more;
      startingAfter =
        response.data.length > 0 ? response.data[response.data.length - 1].id : undefined;
    }

    // Formatar produtos, extraindo o preço do default_price expandido
    const formattedProducts = allProducts.map((product) => {
      const price = product.default_price as Stripe.Price | null;

      return {
        id: product.id,
        name: product.name,
        price: price?.unit_amount || 0,
        description: product.description || "",
        image: product.images[0] || "",
        category: product.metadata.category || "general",
        currency: price?.currency || "usd",
      };
    });

    return formattedProducts;
  } catch (error) {
    console.error("Erro ao carregar os produtos do Stripe:", error);
    throw new Error("Erro ao carregar os produtos");
  }
}
