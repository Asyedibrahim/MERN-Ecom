import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function ProductLists() {

  const [products, setProducts] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const res = await fetch('/api/product/getProducts');
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
          setLoading(false)
        }
      }
      fetchProducts();
    } catch (error) {
      console.log(error.message);
    };
  }, [setProducts]);

  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this product!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete it!',
        cancelButtonText: 'Keep it!'
      });
  
    if (result.isConfirmed) {
      const res = await fetch(`/api/product/deleteProduct/${currentUser._id}/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== productId));
        toast.success('Product has been deleted!')
      } 
    }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleProductPage = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 min-h-screen'>
      <h1 className='text-3xl font-semibold my-7'>Product Lists</h1>
      {loading ? (
        <div className=" my-52 flex justify-center">
          <p className='text-3xl'>Loading...<Spinner size='lg'/></p>
        </div>
       ) : 
      currentUser.isAdmin && products.length > 0 && !loading ? (
        <div className='border shadow-md rounded-lg'>
        <table className='divide-y divide-gray-200 overflow-x-auto '>
            <thead className='bg-[#4f62aa]'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>No</th>
                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>created</th>
                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Product Name</th>
                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Category</th>
                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Trending</th>
                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Offer</th>
                <th className='px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider' colSpan='2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {products.map((product, index) => (
                <tr key={product._id} className='hover:bg-[#ede8f5]' >
                  
                  <td className='px-6 py-4 whitespace-nowrap text-sm' onClick={() => handleProductPage(product._id)}>{index + 1}.</td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm' onClick={() => handleProductPage(product._id)}>{new Date(product.createdAt).toLocaleDateString()}</td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm line-clamp-1 !w-56' onClick={() => handleProductPage(product._id)}>{product.name}</td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm' onClick={() => handleProductPage(product._id)}>{product.categoryId?.name || 'Uncategorized'}</td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm' align='center' onClick={() => handleProductPage(product._id)}>{product.trending ? <FaCheck className='text-green-500 '/> :<ImCross className='text-red-500'/> }</td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm' align='center' onClick={() => handleProductPage(product._id)}>{product.offer ? <FaCheck className='text-green-500 '/> :<ImCross className='text-red-500'/> }</td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold cursor-pointer'>
                    <Link to={`/dashboard?tab=editProduct/${product._id}`}>
                      Edit
                    </Link>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold cursor-pointer' onClick={() => handleDelete(product._id)}>Delete</td>

                </tr>
              ))}
            </tbody>
        </table>
          
        </div>
      ) : (
        <p className='text-2xl font-semibold'>You have no products yet...!</p>
      )}
    </div>
  )
}
