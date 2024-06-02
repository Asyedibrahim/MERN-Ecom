import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link, useLocation } from 'react-router-dom';
import { AiFillProduct } from "react-icons/ai";
import { Sidebar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFailure, deleteStart, deleteSuccess, signOutSuccess } from '../redux/user/userSlice.js';


export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState('');
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);


    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'POST'
            });
    
            const data = await res.json();
            if (res.ok) {
                dispatch(signOutSuccess(data));
            } else {
                console.log(data.message);
            }
            
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteStart());
            const res = await fetch(`/api/user/deleteUser/${currentUser._id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteFailure(data.message));
                return;
            } else {
                dispatch(deleteSuccess(data));
            }
        } catch (error) {
            dispatch(deleteFailure(error.message))
        }
    };

  return (
    <Sidebar className='w-full md:w-60 border' color='red'>
        <Sidebar.Items>
            {currentUser.isAdmin && (
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Sidebar.Item icon={AiFillProduct} className='cursor-text hover:bg-transparent font-semibold text-xl text-[#3d52a0]'>
                        Products
                    </Sidebar.Item>

                    <Link to={'/dashboard?tab=createProduct'} >
                        <Sidebar.Item active={tab === 'createProduct'} as={'div'} className={`${tab === 'createProduct' && 'bg-[#3d52a0] text-white hover:bg-[#4f62aa]' } font-semibold`}>
                            Create Product
                        </Sidebar.Item>
                    </Link>
                    <Link to={'/dashboard?tab=createCategory'} >
                        <Sidebar.Item  active={tab === 'createCategory'} as={'div'} className={`${tab === 'createCategory' && 'bg-[#3d52a0] text-white hover:bg-[#3d52a0]'} font-semibold`}>
                            Category
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
            )}
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Sidebar.Item icon={HiUser} className='cursor-text hover:bg-transparent font-semibold text-xl text-[#3d52a0]'>
                    Account Settings 
                </Sidebar.Item>

                <Link to={'/dashboard?tab=profile'} >
                    <Sidebar.Item active={tab === 'profile'} label={`${currentUser.isAdmin ? 'Admin' : 'User'}`} labelColor='dark' as={'div'} className={`${tab === 'profile' && 'bg-[#3d52a0] text-white hover:bg-[#4f62aa]' } font-semibold`}>
                        Profile
                    </Sidebar.Item>
                </Link>
                <Link to={'/dashboard?tab=address'} >
                    <Sidebar.Item  active={tab === 'address'} as={'div'} className={`${tab === 'address' && 'bg-[#3d52a0] text-white hover:bg-[#3d52a0]'} font-semibold`}>
                       Manage Address
                    </Sidebar.Item>
                </Link>
            </Sidebar.ItemGroup>

            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Sidebar.Item  icon={TiDeleteOutline} className="cursor-pointer" onClick={handleDelete}>
                Delete account 
                </Sidebar.Item>

                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                Sign out 
                </Sidebar.Item>
            </Sidebar.ItemGroup>

        </Sidebar.Items>
    </Sidebar>
  )
}
