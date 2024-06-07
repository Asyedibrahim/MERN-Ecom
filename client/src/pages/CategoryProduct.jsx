import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function CategoryProduct() {

    const [categoryProducts, setcategoryProducts] = useState({ 
        category: {}, 
        products: [] 
    });
    const params = useParams();

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                const res = await fetch(`/api/product/productByCategory/${params.categoryId}`);
                const data = await res.json();
                if (res.ok) {
                    setcategoryProducts(data)
                }
            }
            fetchProduct();
        } catch (error) {
            console.log(error.message);
        }
        
    }, [params.categoryId]);

    const handleProductPage = (productId) => {
        navigate(`/product/${productId}`)
    }
    

  return (
    <div className='max-w-6xl mx-auto p-3 min-h-screen'>
        <h1 className='text-3xl font-semibold border-b pb-4 mt-3'>{categoryProducts.category.name}</h1>

        <div className='flex flex-wrap gap-8 mt-6'>
            {categoryProducts.products.map((product) => (
                <div  className='bg-white flex sm:flex-col shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px]' onClick={() => handleProductPage(product._id)} key={product._id}>
                  <img src={product.imageUrls[0]} alt="" className='h-[160px] sm:h-[230px] w-[150px] sm:w-[250px] object-cover hover:scale-105 transition-scale duration-300'/>
                  <div className='p-3 flex flex-col gap-2 w-full mt-3'>
                    <h3 className='text-lg font-semibold text-slate-700 line-clamp-1'>{product.name}</h3>
                    <p className='text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                    {product.offer ? (
                      <div className='flex items-center gap-2'>
                        <p className='text-red-600 line-through text-sm'>₹{product.regularPrice.toLocaleString('en-US')}</p>
                        <p className='text-green-600 font-semibold'>₹{product.discountPrice.toLocaleString('en-US')}</p>
                      </div>
                    ) : (
                        <p className='font-semibold'>₹{product.regularPrice.toLocaleString('en-US')}</p>
                    )}
                  </div>
                </div>
            ))}
        </div>
    </div>
  )
}
