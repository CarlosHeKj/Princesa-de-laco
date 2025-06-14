import { NextResponse } from "next/server";
import { getAllProducts } from "@/app/libs/stripeUtil";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      { message: "Erro ao carregar os produtos" },
      { status: 500 }
    );
  }
}