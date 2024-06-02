import { useSelector } from 'react-redux';

export default function DashProfile() {

    const {currentUser} = useSelector((state) => state.user)

  return (
    <div className='max-w-lg p-3 '>

        <form className="flex flex-col gap-5">
            <h1 className='mt-7 mb-3 font-semibold text-xl flex gap-3 items-center'>Personal Informations <span className='text-[15px] text-blue-700 hover:underline cursor-pointer'>Edit</span></h1>
            <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex flex-col gap-3 flex-1">
                    First Name : 
                    <input type="text" className='rounded-md bg-gray-100 text-slate-500 cursor-not-allowed' disabled/>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                    Last Name : 
                    <input type="text" className='rounded-md bg-gray-100 text-slate-500 cursor-not-allowed' disabled/>
                </div>
            </div>

            <h1 className='mt-7 mb-3 font-semibold text-xl flex gap-3 items-center'>Email Address <span className='text-[15px] text-blue-700 hover:underline cursor-pointer'>Edit</span></h1>
            <div className="flex"> 
                <input type="text" className='p-3 flex-1 rounded-md bg-gray-100 text-slate-500 cursor-not-allowed' value={currentUser.email} disabled/>
            </div>

            <h1 className='mt-7 mb-3 font-semibold text-xl flex gap-3 items-center'>Mobile Number <span className='text-[15px] text-blue-700 hover:underline cursor-pointer'>Edit</span></h1>
            <div className="flex">
                <input type="text" className='p-3 flex-1 rounded-md bg-gray-100 text-slate-500 cursor-not-allowed' value={'8327849024'} disabled/>
            </div>
            
        </form>


    </div>
  )
}
