import b1 from '../assets/images/b1.jpeg';
import { FcGoogle } from "react-icons/fc";


export default function SignUp() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-3'>
      <div className="flex bg-violet-100 p-5 shadow-xl rounded-2xl">

        <div className="sm:w-full px-2 md:px-12">

          <h3 className='text-[#3d52a0] text-2xl font-bold'>Register</h3>
          <p className='mt-5 '>if you already have an account, <span className='text-blue-700 font-semibold hover:underline cursor-pointer whitespace-nowrap'>Log in</span></p>

          <form className="flex flex-col gap-5 mt-5">
            <input type="text" className='rounded-xl p-3 border-none shadow-md' placeholder='Enter username'/>

            <input type="email" className='rounded-xl p-3 border-none shadow-md' placeholder='Enter email'/>

            <input type="password" className='rounded-xl p-3 border-none shadow-md' placeholder='Enter password'/>

            <button type='submit' className='rounded-xl py-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] font-semibold'>Register</button>
          </form>
          <div className="grid grid-cols-3 items-center mt-8 text-gray-500">
            <hr className='border-gray-500'/>
            <p className='text-center'>OR</p>
            <hr className='border-gray-500'/>
          </div>


          <button className='bg-white border p-3 w-full flex items-center justify-center gap-1 font-semibold rounded-xl mt-8 shadow-md '><FcGoogle />Continue with Google</button>
        </div>

        <div className="w-full hidden md:block">
          <img src={b1} alt="" className='h-[500px] w-[520px] rounded-2xl'/>
        </div>

      </div>
    </div>
  )
}
