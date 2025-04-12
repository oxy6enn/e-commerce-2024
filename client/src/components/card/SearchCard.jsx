// rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([])


//   console.log(categories);
  useEffect(() => {
    getCategory();
  }, []);



  // Step 1 Search Text
//   console.log(text);
  useEffect(() => {
    // code
    const delay = setTimeout(() => {
        if (text) {
          actionSearchFilters({ query: text });
    }else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // Step 2 Search By Category
  const handleCheck = (e) => {
    console.log(e.target.value)
    const inCheck = e.target.value // ค่าที่ถูก check
    const inState = [...categorySelected] // [] arr ว่าง
    const findCheck = inState.indexOf(inCheck) // ค่าที่ถูก check ว่ามีใน arr หรือไม่ ถ้าไม่เจอจะได้ -1
    
    if(findCheck === -1) {
        inState.push(inCheck)
    }else{
        inState.splice(findCheck,1)
    }
    setCategorySelected(inState)
    if(inState>0){
        actionSearchFilters({ category : inState})
    }else{
        getProduct()
    }
  }
  console.log(categorySelected)

  // Step 3 Search By Pricewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
      {/* Search by Text */}
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า"
        className="border rounded-md w-full mb-4 px-2"
      />
      <hr />
      {/* Search by Category  */}
      <div>
        <h1>หมวดหมู่สินค้า</h1>
        <div>
          {categories.map((item, index) => (
            <div className='flex gap-2'>
              <input 
              onChange={handleCheck}
              value={item.id}
              type="checkbox" />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
