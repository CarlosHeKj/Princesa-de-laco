import Stripe from "stripe";
import { ProductType } from "../types/ProductType";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function getAllProducts(): Promise<ProductType[]> {
  const productList = await stripe.products.list({ active: true });
  const priceList = await stripe.prices.list({ active: true });

  const allProducts: ProductType[] = productList.data.map((product) => {
     const price = priceList.data.find((p) => p.product === product.id && p.unit_amount != null);

    return {
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      image: product.images?.[0] ?? "",
      price: price?.unit_amount ? price.unit_amount / 1: 0,
      currency: price?.currency ?? "BRL",
      category: product.metadata.category ?? "Sem categoria",
    };
  });

  return allProducts;
}
