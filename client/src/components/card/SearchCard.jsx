// rafce
import React,{ useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store';

const SearchCard = () => {

    const getProduct = useEcomStore((state) => state.getProduct);
    const products = useEcomStore((state) => state.products);
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

    const [ text, setText ] = useState('')

    // Step 1 Search Text   
    console.log(text)
    useEffect(()=>{
        // code 
        const delay = setTimeout(()=>{
            actionSearchFilters({ query:text })
            if(!text){
                getProduct()
            }
        },300)
        
        return () => clearTimeout(delay)
    },[text])

    // Step 2 Search By Category 
   

    // Step 3 Search By Price

  return (
    <div>
        <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>
        {/* Search by Text */}
        <input 
        onChange={(e)=>setText(e.target.value)}
        type='text'
        placeholder='ค้นหาสินค้า'
        className='border rounded-md w-full mb-4 px-2' 
        />
        <hr />
        {/* Search by Category  */}
        <div>
            <h1>หมวดหมู่สินค้า</h1>
            <div>
                
            </div>
        </div>
        </div>
  )
}

export default SearchCard