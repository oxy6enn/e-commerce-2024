// rafce

import React from "react";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({item}) => { 

  // console.log(item)

  return (
    <div className="border rounded-md shadow-md p-2 w-48">
      <div>

        {
          item.images && item.images.length > 0 
          ? <img src={item.images[0].url} 
          className='rounded-md w-full h-24 object-cover hover:scale-110 duration-200'/>
          : <div className="w-full h-24 bg-gray-200 rounded-md flex items-center justify-center ">
          No Image
        </div>
        }
        
      </div>

      <div className="py-2">
        <p className="text-xl font-bold">{item.title}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold ">{item.price}</span>
        <button className="bg-blue-500 rounded-md p-2 hover:bg-blue-700 shadow-md">
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
