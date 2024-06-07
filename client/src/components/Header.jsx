import { Link, useLocation } from 'react-router-dom';
import { Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaHeadphones, FaHeart, FaHome, FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle, MdDashboardCustomize } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCartItems } from '../redux/user/cartSlice';
import { deleteFailure, deleteStart, deleteSuccess, signOutSuccess } from '../redux/user/userSlice';
import { TiDeleteOutline } from 'react-icons/ti';
import { HiArrowSmRight } from 'react-icons/hi';


export default function Header() {

    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    
    const cartItems = useSelector((state) => state.cart.items) || []; 
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCart = async () => {
          try {
            const res = await fetch(`/api/cart/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
              console.log(data.message);
              return;
            }
            if (res.ok) {
              dispatch(setCartItems(data.items) || []);
            }
          } catch (error) {
            console.log(error.message);
          }
        }
        if (currentUser) {
          fetchCart();
        }
    
      }, [currentUser, dispatch]);

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
    
    <Navbar className='border-b-2 shadow-sm bg-[#ece4fa]'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold '>
            <span className='font-bold text-[#3d52a0] text-xl'>Innovitron</span>
        </Link>

        <Link to='/cart' className='md:hidden'>
            <button className='flex items-center gap-1'>
            <span className='hover:text-[#3d52a0]'><FaShoppingCart /></span> 

            <span className='bg-red-500 rounded-full w-5 h-5 text-center text-white text-sm'>
                {currentUser && !cartItems.length ? 0 : cartItems.length } 
            </span>
            </button>
        </Link>

        <div className="flex gap-2 md:order-2">
            {currentUser ? (
                <Dropdown 
                arrowIcon={true} 
                inline
                label={
                    <div className="flex items-center gap-1 text-xl font-semibold">
                        <MdAccountCircle className='text-2xl'/>
                        <span >User</span>
                    </div>
                }>
                    <Dropdown.Header>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    {currentUser.isAdmin && (
                        <Link to={'/dashboard?tab=productLists'}>
                            <Dropdown.Item icon={MdDashboardCustomize} className='text-blue-500 font-semibold'>
                                Dashboard
                            </Dropdown.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && <Dropdown.Divider />}
                    <Dropdown.Item onClick={handleDelete} icon={TiDeleteOutline} className='text-red-500 font-semibold'>
                        Delete account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut} icon={HiArrowSmRight} className='text-green-500 font-semibold'>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            ) : (
                <Link to='/sign-in' className='w-13'>
                    <button className='bg-[#3d52a0] py-2 px-3 rounded-lg text-white text-md hover:bg-[#4f62aa]'>Sign In</button>
                </Link>
            )}
            <Navbar.Toggle/>
        </div>

        <Navbar.Collapse>
            <Link to='/'>
                <Navbar.Link 
                    as={'div'} 
                    className={`${path === '/'  ? 'bg-[#3d52a0]' : '' }`} 
                    active={path === '/'} 
                >
                <span className={`${path === '/' ? 'md:text-[#3d52a0]' : ''} flex items-center gap-1 text-[16px]`}><FaHome /> Home</span>
                </Navbar.Link>
            </Link>

            <Link to='/products'>
                <Navbar.Link as={'div'} className={`${path === '/products'  ? 'bg-[#3d52a0]' : '' }`} active={path === '/products'}>
                <span className={`${path === '/products' ? 'md:text-[#3d52a0]' : ''} flex items-center gap-1 text-[16px]`}><FaHeadphones /> Products</span>
                </Navbar.Link>
            </Link>

            <Link to='/cart' className='hidden md:block'>
                <Navbar.Link 
                    as={'div'} 
                    className={`text-[16px] flex items-center gap-1 ${path === '/cart'  ? 'bg-[#3d52a0]' : '' }`} 
                    active={path === '/cart'}
                >
                <span className={`${path === '/cart' ? 'md:text-[#3d52a0]' : ''} flex items-center gap-1`}><FaShoppingCart />Cart</span> 

                <span className='bg-red-500 rounded-full w-5 h-5 text-center text-white text-sm'>
                   {currentUser && !cartItems.length ? 0 : cartItems.length } 
                   
                </span>
                </Navbar.Link>
            </Link>

        </Navbar.Collapse>

    </Navbar>
  )
}
