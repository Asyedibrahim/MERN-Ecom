import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function ProductLists() {

  const [products, setProducts] = useState([]);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const res = await fetch('api/product/getProducts');
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

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/product/deleteProduct/${currentUser._id}/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== productId));
      } 
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='max-w-2xl p-3'>
      <h1 className='text-2xl font-semibold mt-7'>Product Lists</h1>
      <div className='w-full mt-5 overflow-x-auto border border-gray-300 shadow-md rounded-md'>
       
      <table className='min-w-full divide-y divide-gray-200 table-fixed'>
      <thead className='bg-[#4f62aa]'>
        <tr>
          <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Date created</th>
          <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Product Name</th>
          <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Category</th>
          <th className='px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider' colSpan='2'>Actions</th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {products.map((product) => (
          <tr key={product._id} className='hover:bg-[#ede8f5]'>
            <td className='px-6 py-4 whitespace-nowrap text-sm'>{new Date(product.createdAt).toLocaleDateString()}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm'>{product.name}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm'>{product.categoryId?.name || 'Uncategorized'}</td>
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
    </div>
  )
}
