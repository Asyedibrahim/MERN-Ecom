import { Label, Spinner, Table, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function CreateCategory() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const fetchCategory = async () => {
        const res = await fetch('/api/category/getCategory');
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
        }
      }
      fetchCategory();
    } catch (error) {
      setError(error.message);
    }
  }, [setCategories])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/category/createCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.message);
      }
      if (res.ok) {
        setLoading(false);
        setError(null);
        navigate('/dashboard?tab=createProduct');
      }

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const res = await fetch(`/api/category/delete/${categoryId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      }
      if (res.ok) {
        setCategories((prev) => prev.filter((category) => category._id !== categoryId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

    const handleClick = async (categoryName, categoryId) => {

      const { value: formValue } = await Swal.fire({
        title: "Edit Category",
        input: "text",
        inputValue: categoryName,
        inputPlaceholder: "Enter Category"
      });
      if (formValue) {
        const res = await fetch(`/api/category/edit/${categoryId}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: formValue})
        });
        
        if (res.ok) {
          setCategories((prev) => prev.map((category) => category._id === categoryId ? {...category, name: formValue} : category))
        }
      }
    }
  

  return (
    <div className='mx-auto p-3 mt-7'>
        <h1 className='text-2xl font-semibold '>Create Category</h1>

      <div className="flex flex-col w-full">

        <form className='my-8 flex gap-5 items-center' onSubmit={handleSubmit} autoComplete='off'>
          <div className="flex-1">
            <Label>Product Name : </Label>
            <TextInput type='text' placeholder='Eg. Electronics' id='name' required onChange={handleChange} className='w-full'/>
          </div>
          <div className="flex-1">
            <button type='submit' disabled={loading} className='rounded-lg p-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] disabled:bg-[#4f62aa] font-semibold w-full mt-6'>
              {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Creating...</span>
                </> 
              ) : 'Create Category'
              }
            </button>

          </div>
          {error && <p className='mt-3 text-red-600'>{error}</p>}
        </form>
  
        <h2 className='text-slate-700 font-semibold text-xl mt-5'>Category Lists</h2>

        <div className='overflow-x-auto mt-5 border border-gray-300 shadow-md rounded-md'>
          <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-[#4f62aa]'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Date created</th>
              <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>Category Name</th>
              <th className='px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider' colSpan='2'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {categories.map((category) => (
              <tr key={category._id} className='hover:bg-[#ede8f5]'>
                <td className='px-6 py-4 whitespace-nowrap text-sm'>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm'>{category.name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold cursor-pointer' onClick={() => handleClick(category.name, category._id)}>Edit</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold cursor-pointer' onClick={() => handleDelete(category._id)}>Delete</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
