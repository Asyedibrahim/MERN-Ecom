import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillProduct } from "react-icons/ai";
import { Sidebar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFailure, deleteStart, deleteSuccess, signOutSuccess } from '../redux/user/userSlice.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState('');
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);


    const handleSignOut = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will be logged out of your account!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sign out!',
                cancelButtonText: 'Cancel!'
              });
          
            if (result.isConfirmed) {
                const res = await fetch('/api/auth/signout', {
                    method: 'POST'
                });
        
                const data = await res.json();
                if (res.ok) {
                    dispatch(signOutSuccess(data));
                    toast.success('Sign out successful!');
                    navigate('/sign-in');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const firstResult = await Swal.fire({
                title: 'Are you sure?',
                text: 'Your account will be deleted!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Delete it!',
                cancelButtonText: 'Cancel!'
            });
            if (firstResult.isConfirmed) {
                const secondResult = await Swal.fire({
                    title: 'Type "YES" to confirm',
                    input: 'text',
                    inputPlaceholder: 'Type "YES"',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel!',
                    preConfirm: (inputValue) => {
                        if (inputValue.toLowerCase() !== 'yes') {
                            Swal.showValidationMessage('You need to type "YES" to confirm');
                        }
                    }
                });
    
                if (secondResult.isConfirmed && secondResult.value === 'yes') {
                    dispatch(deleteStart());
                    const res = await fetch(`/api/user/deleteUser/${currentUser._id}`, {
                        method: 'DELETE'
                    });
                    const data = await res.json();
                    if (!res.ok) {
                        dispatch(deleteFailure(data.message));
                        toast.error(data.message);
                        return;
                    } else {
                        dispatch(deleteSuccess(data));
                        toast.success('Account has been deleted!');
                        navigate('/sign-in');
                    }
                }
            }
        } catch (error) {
            dispatch(deleteFailure(error.message));
            toast.error(error.message);
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
                            Manage Category
                        </Sidebar.Item>
                    </Link>
                    <Link to={'/dashboard?tab=productLists'} >
                        <Sidebar.Item  active={tab === 'productLists'} as={'div'} className={`${tab === 'productLists' && 'bg-[#3d52a0] text-white hover:bg-[#3d52a0]'} font-semibold`}>
                            Product Lists
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
            )}
            
            {currentUser.isAdmin && (
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Sidebar.Item icon={HiUser} className='cursor-text hover:bg-transparent font-semibold text-xl text-[#3d52a0]'>
                Account Settings 
                </Sidebar.Item>

                <Sidebar.Item  icon={TiDeleteOutline} className="cursor-pointer" onClick={handleDelete}>
                Delete account 
                </Sidebar.Item>

                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                Sign out 
                </Sidebar.Item>
            </Sidebar.ItemGroup>
            )}

        </Sidebar.Items>
    </Sidebar>
  )
}
