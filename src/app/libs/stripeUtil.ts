import Stripe from "stripe";
import { ProductType } from "../types/ProductType";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

// Função auxiliar para buscar todos os itens paginados
async function listAll<T extends { id: string }>(
  fetchFn: (params: Stripe.PaginationParams) => Promise<{ data: T[]; has_more: boolean; }>
): Promise<T[]> {
  // eslint-disable-next-line prefer-const
  let allItems: T[] = [];
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const response = await fetchFn({
      limit: 100,
      ...(startingAfter && { starting_after: startingAfter }),
    });

    allItems.push(...response.data);
    hasMore = response.has_more;

    if (response.data.length > 0) {
      startingAfter = response.data[response.data.length - 1].id;
    } else {
      break; // não continue se não há mais itens
    }
  }

  return allItems;
}


export async function getAllProducts(): Promise<ProductType[]> {
  const products = await listAll(stripe.products.list.bind(stripe.products));
  const prices = await listAll(stripe.prices.list.bind(stripe.prices));

  const allProducts: ProductType[] = products.map((product) => {
    const price = prices.find((p) => p.product === product.id && p.unit_amount != null);

    return {
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      image: product.images?.[0] ?? "",
      price: price?.unit_amount ?? 0,
      currency: price?.currency ?? "BRL",
      category: product.metadata.category ?? "Sem categoria",
    };
  });

  return allProducts;
}
