import { FcGoogle } from 'react-icons/fc'
import b1 from '../assets/images/b1.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';
import { Spinner } from 'flowbite-react';


export default function SignIn() {

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      } 
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-3'>
      <div className="flex bg-violet-100 p-5 shadow-xl rounded-2xl border">

        <div className="w-full hidden md:block">
          <img src={b1} alt="background" className='h-[500px] w-[460px] rounded-2xl'/>
        </div>

        <div className="sm:w-full px-2 md:px-12">

          <h3 className='text-[#3d52a0] text-2xl font-bold'>Login</h3>
          <p className='mt-5 '>Don't have an account, <Link to='/sign-up' className='text-blue-700 font-semibold hover:underline cursor-pointer whitespace-nowrap'>Register</Link></p>

          <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>   
            <input type="email" id='email' className='rounded-xl p-3 border-none shadow-md' placeholder='Enter email' onChange={handleChange}/>

            <input type="password" id='password' className='rounded-xl p-3 border-none shadow-md' placeholder='Enter password' onChange={handleChange}/>

            <button type='submit' className='rounded-xl py-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] font-semibold'>
              {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </> 
              ) : 'Login'
              }
            </button>
          </form>

          {error && <p className='mt-3 text-red-600'>{error}</p>}
          
          <div className="grid grid-cols-3 items-center mt-8 text-gray-500">
            <hr className='border-gray-500'/>
            <p className='text-center'>OR</p>
            <hr className='border-gray-500'/>
          </div>


          <button className='bg-white border p-3 w-full flex items-center justify-center gap-1 font-semibold rounded-xl mt-8 shadow-md '><FcGoogle />Continue with Google</button>
        </div>

      </div>
    </div>
  )
}
