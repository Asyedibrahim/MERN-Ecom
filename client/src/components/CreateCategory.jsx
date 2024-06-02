import { Label, Spinner, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
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

  const handleClick = async (categoryName) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Category",
      html: `
        <input id="name" class="swal2-input" placeholder="Edit Category" value=${categoryName}>
      `,
      focusConfirm: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value
        ];
      }
    });
    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }

  return (
    <div className='max-w-5xl mx-auto p-3 w-full mt-7'>
        <h1 className='text-3xl font-semibold text-slate-700'>Create Category</h1>

      <div className="flex flex-col">

        <form className='my-8 w-full flex gap-5 items-center' onSubmit={handleSubmit} autoComplete='off'>
          <div className="flex-1">
            <Label>Product Name : </Label>
            <TextInput type='text' placeholder='Eg. Electronics' id='name' required onChange={handleChange}/>
          </div>
          <div className="flex-1">
            <button type='submit' disabled={loading} className='rounded-lg p-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] disabled:bg-[#4f62aa] font-semibold w-full mt-6'>
              {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Creating...</span>
                </> 
              ) : 'Create Product'
              }
            </button>

          </div>
          {error && <p className='mt-3 text-red-600'>{error}</p>}
        </form>
        

        <div className="lg:mt-5 border p-5 w-full lg:w-[500px] shadow-lg">
          <h2 className='text-slate-700 font-semibold text-xl'>Category Lists</h2>
          <ul className='p-3 mt-2'>
            {categories && categories.length > 0 ? categories.map((category) => (
              <li>
                <div className='flex justify-between border-b p-2'>
                  <span className='w-40'>{category.name}</span>
                  <span className='text-green-600 font-semibold cursor-pointer flex items-center' onClick={() => handleClick(category.name)}><AiFillEdit />&nbsp;Edit</span>
                  <span className='text-red-600 font-semibold cursor-pointer flex items-center' onClick={() => handleDelete(category._id)}><MdDelete /> Delete</span>
                </div>
            </li>
            )) : <p className='text-center text-xl mt-3 text-slate-500'> No category available!</p>}
          </ul>
        </div>

      </div>
        
    </div>
  )
}
