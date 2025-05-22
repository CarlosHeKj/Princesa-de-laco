import { ProductType } from "../types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "../libs/utils";
type ProductProps = {
    product: ProductType
}



export default function Product({product}: ProductProps) {
    
    return (
     
<div className="flex flex-row flex-col h-auto shadow-lg  w-[300px] bg-white rounded-lg relative h-[400px] ">

  <div className="relative h-32 w-24 w-full h-64 mt-20 mt-1  object-cover flex justify-center">
    <ProductImage product={product}  />
  </div>
 

  <div className="flex flex-col justify-between flex-1 overflow-hidden overflow-visible">
  
    <div className="flex justify-between font-bold my-3 text-black p-5 p-0 text-start ml-1 line-clamp-2 hover:text-purple-500 z-20">
      {product.name}
    </div>
    
    
    <div   className="flex p-5 justify-between items-center relative">
 <div className="text-purple-600 font-bold">
        <p> {formatPrice(product.price)}</p>
      </div>
    </div>
  </div>
</div>


    );
}