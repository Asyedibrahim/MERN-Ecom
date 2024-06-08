import React, { useEffect, useState } from 'react';
import { FaHeadphones } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const [productByCategory, setProductByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category/getCategory');
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productsByCategory = {};
        await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(`/api/product/productByCategory/${category._id}`);
            const data = await res.json();
            if (res.ok) {
              productsByCategory[category._id] = data;
            }
          })
        );
        setProductByCategory(productsByCategory);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (categories.length > 0) {
      fetchProductsByCategory();
    }
  }, [categories]);

  // console.log(productByCategory);

  const handleProductPage = (productId) => {
    navigate(`/product/${productId}`)
}

const getRandomProducts = (products, count) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

  return (
  <div className='max-w-6xl mx-auto p-3 min-h-screen'>
    <h1 className='text-3xl font-semibold border-b pb-4 flex items-center gap-1 mt-3'>Products <FaHeadphones /></h1>

    {Object.keys(productByCategory).map((categoryId) => {
      const categoryData = productByCategory[categoryId];
      const randomProducts = getRandomProducts(categoryData.products, 4);
      
      return (
        <div key={categoryData.category._id} className='flex flex-col gap-5 mt-6'>
          <div>
            <h2 className='text-2xl font-semibold'>{categoryData.category.name}</h2>
            <Link to={`/categoryProducts/${categoryData.category._id}`} className='text-blue-600 hover:underline font-semibold text-sm'>View all products</Link>
          </div>
          
          <div className='flex flex-wrap gap-5'>

            {randomProducts.map((product) => (

              <div key={product._id} className='bg-white flex sm:flex-col shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px]' onClick={() => handleProductPage(product._id)}>
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
      );
    })}
  </div>
  )
}
