import { ProductType } from "../types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "../libs/utils";
type ProductProps = {
    product: ProductType
}



export default function Product({product}: ProductProps) {
    
    return (
     
<div className="flex  flex-col  shadow-lg w-[100px] h-[130px]  md:w-[300px] bg-white rounded-lg relative md:h-[400px] p-1 ">

  <div className="relative  w-full h-[60px] md:h-64  mt-1  object-cover flex md:justify-center">
    <ProductImage product={product}  />
  </div>
 

  <div className="flex flex-col justify-between flex-1 mx-1 md:mx-5  overflow-visible">
  
    <div className="flex justify-between font-bold my-1 text-black  text-start ml-1 line-clamp-2 hover:text-purple-500 z-20">
      {product.name}
    </div>
    
    
    <div   className="flex p-1 justify-between items-center relative">
 <div className="text-purple-600 font-bold">
        <p> {formatPrice(product.price)}</p>
      </div>
    </div>
  </div>
</div>


    );
}