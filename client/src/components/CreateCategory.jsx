import { Alert, Label, Spinner, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateCategory() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full mt-7'>
        <h1 className='text-2xl font-semibold'>Create Category</h1>

        <form className='my-8 w-full md:w-[300px]' onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 ">
            <Label>Product Name : </Label>
            <TextInput type='text' placeholder='Eg. Electronics' id='name' required onChange={handleChange}/>
          </div>
          <div className="mt-7 flex flex-col gap-2">
            <Label>Category Description : </Label>
            <Textarea placeholder='Add a Description...' rows='3' id='description' onChange={handleChange}/>
          </div>
          <button type='submit' disabled={loading} className='rounded-lg py-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] disabled:bg-[#4f62aa] font-semibold w-full mt-5'>
          {loading ? (
            <>
              <Spinner size='sm'/>
              <span className='pl-3'>Creating...</span>
            </> 
          ) : 'Create Product'
          }
            </button>
        </form>
        {error && <p className='mt-3 text-red-600'>{error}</p>}
    </div>
  )
}
