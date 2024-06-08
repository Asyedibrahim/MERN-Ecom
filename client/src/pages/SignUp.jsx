import { useState } from 'react';
import b1 from '../assets/images/b1.jpeg';
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'flowbite-react';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(null);
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        return;
      } 
      if (res.ok) {
        setLoading(null);
        toast.success('Registration successful!');
        navigate('/sign-in');
      }

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-3'>
      <div className="flex bg-violet-100 p-5 shadow-xl rounded-2xl border">

        <div className="sm:w-full px-2 md:px-12">

          <h3 className='text-[#3d52a0] text-2xl font-bold'>Register</h3>
          <p className='mt-5 '>if you already have an account, <Link to='/sign-in' className='text-blue-700 font-semibold hover:underline cursor-pointer whitespace-nowrap'>Login</Link></p>

          <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit} autoComplete='off'>
            <input type="email" id='email' className='rounded-xl p-3 border-none shadow-md' placeholder='Enter email' onChange={handleChange}/>

            <input type="password" id='password' className='rounded-xl p-3 border-none shadow-md' placeholder='Enter password' onChange={handleChange}/>

            <button type='submit' disabled={loading} className='rounded-xl py-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] font-semibold disabled:bg-[#4f62aa]'>
            {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </> 
              ) : 'Register'
              }
            </button>
          </form>
          <div className="grid grid-cols-3 items-center mt-8 text-gray-500">
            <hr className='border-gray-500'/>
            <p className='text-center'>OR</p>
            <hr className='border-gray-500'/>
          </div>

          <OAuth/>

        </div>

        <div className="w-full hidden md:block">
          <img src={b1} alt="background" className='h-[500px] w-[460px] rounded-2xl'/>
        </div>

      </div>
    </div>
  )
}
