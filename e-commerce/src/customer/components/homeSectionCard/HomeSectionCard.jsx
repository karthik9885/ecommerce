import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemDetails from './ItemDetails';

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();
  const handleProduct = () => {
    console.log('Navigating to product details with product:', product.id);
    navigate(`/product/details/${product.id}`, { state: { product } })
  }
  return (
   
        <div 
          key={product.id} 
          onClick={handleProduct}
          className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border'
        >
          <div className='h-[13rem] w-[10rem]'>
            <img className='object-cover object-top w-full h-full' src={product.imageUrl} alt="" />
          </div>
          <div className='p-4'>
            <h3 className='text-lg font-medium text-gray-900'> {product.brand}</h3>
            <p className='mt-2 text-sm text-gray-500'> {product.title}</p>
          </div>     
    </div>
  );
}

export default HomeSectionCard;


  // return (
  //   <div onClick={()=>navigate(`/product/${product.id}`)} className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hiddem w-[15rem] mx-3 border'>
  //       <div className='h-[13rem] w-[10rem]'>
  //           <img className='object-cover object-top w-full h-full' src={product.imageUrl} alt=""/>
  //       </div>
  //       <div className='p-4'>
  //           <h3 className='text-lg font-medium text-gray-900'> {product.brand}</h3>
  //           <p className='mt-2 text-sm text-gary-500'> {product.title}</p>
  //       </div>
  //   </div>
  // )
// }

// export default HomeSectionCard