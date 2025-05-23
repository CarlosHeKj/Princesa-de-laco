'use client'
import Image from "next/image";
import { useState } from "react";
import { ProductType } from "../types/ProductType";

type ProductImageProps = {
    product: ProductType;
    fill?: boolean;
}

export default function ProductImage({product, fill}: ProductImageProps){

   const [loading, setLoading] = useState(true); 
return fill ? (
    <Image src={product.image}
    fill
    alt={product.name}
    className={`object-cover  ${loading ? 'scale-0  grayscale' : 'blur-0 grayscale-0'}`}
    onLoad={() => setLoading(false)}
 />
) : (
    <Image src={product.image}
    width={250}
    height={250}
    alt={product.name}
    className={`object-cover ${loading ? 'scale-110 blur-3xl grayscale' : ' blur-0 grayscale-0'}`}
    onLoadingComplete={() => setLoading(false)}
 />
)
}