import { useEffect, useState } from 'react';
import banner from '../assets/images/banner.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const res = await fetch('/api/product/getProducts');
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        }
      }
      fetchProducts();
    } catch (error) {
      console.log(error.message);
    };
  }, [setProducts]);


  const getRandomOfferProducts = () => {
    const offerProducts = products.filter(product => product.offer);

    const shuffledProducts = offerProducts.sort(() => Math.random() - 0.5);

    return shuffledProducts.slice(0, 8);
  }

  const getRandomTrendingProducts = () => {
    const trendingProducts = products.filter(product => product.trending);

    const shuffledProducts = trendingProducts.sort(() => Math.random() - 0.5);

    return shuffledProducts.slice(0, 8);
  }

  const handleProductPage = (productId) => {
    navigate(`/product/${productId}`)
}

  return (
    <div>
      <div className='relative'>
        <img src={banner} alt="" className='h-[500px] w-full object-right sm:object-center object-cover '/>
        <div className='absolute top-40 start-10 sm:start-[20rem] md:start-[30rem] lg:start-[40rem] xl:start-[50rem]'>
          <p className='text-3xl font-bold text-white'>Discover endless possibilities. <br/> Explore the future.</p>
            <Link to={'/products'}>
              <button className='bg-black text-white font-semibold px-5 py-2 rounded-md mt-6 hover:bg-gray-800'>View Products</button>
            </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-2">
        <div className='text-center mt-10'>
          <h6 className='uppercase font-bold text-sm'>Top sale on this month</h6>
          <h1 className='text-3xl font-semibold mt-2 text-[#3d52a0] font-serif'>Trending Products</h1>
          <p className='text-sm text-slate-500 mt-3'>Unlock the latest trends. <br/> Elevate your lifestyle with our top-selling products of the month.</p>
        </div>

        <div className='flex flex-wrap gap-5 mt-10 '>

          {getRandomTrendingProducts().map((product) => (

            <div key={product._id} className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[140px] sm:w-[250px]' onClick={() => handleProductPage(product._id)}>
              <img src={product.imageUrls[0]} alt="" className='h-[200px] sm:h-[250px] w-[200px] sm:w-[250px] object-cover hover:scale-105 transition-scale duration-300'/>
              <div className='p-3 flex flex-col gap-2 w-full mt-3'>
                <h3 className='text-sm sm:text-lg font-semibold text-slate-700 line-clamp-1'>{product.name}</h3>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                {product.offer ? (
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
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

        <div className='text-center mt-16 border-t pt-10'>
          <h6 className='uppercase font-bold text-sm'>Unbeatable deals awaits</h6>
          <h1 className='text-3xl font-semibold mt-2 text-[#3d52a0] font-serif'>Offer Products</h1>
          <p className='text-sm text-slate-500 mt-3'>Dive into our limited-time offers and elevate your shopping experience.</p>
        </div>
        <div className='flex flex-wrap gap-5 mt-10'>

          {getRandomOfferProducts().map((product) => (

            <div key={product._id} className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[140px] sm:w-[250px]' onClick={() => handleProductPage(product._id)}>
              <img src={product.imageUrls[0]} alt="" className='h-[200px] sm:h-[250px] w-[200px] sm:w-[250px] object-cover hover:scale-105 transition-scale duration-300'/>
              <div className='p-3 flex flex-col gap-2 w-full mt-3'>
                <h3 className='text-sm sm:text-lg font-semibold text-slate-700 line-clamp-1'>{product.name}</h3>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                {product.offer ? (
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
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
      

    </div>
  )
}
