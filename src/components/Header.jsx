import { Link, useLocation } from 'react-router-dom';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaHeadphones, FaHeart, FaHome, FaShoppingCart } from "react-icons/fa";

export default function Header() {

    const path = useLocation().pathname;

  return (
    
    <Navbar className='border-b-2 shadow-lg bg-[#ede8f5]'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold '>
            <span className='font-bold text-[#3d52a0] text-xl'>Innovitron</span>
        </Link>
        <form>
            <TextInput 
                type='text' placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        <Link>
            <Button className='w-10 sm:w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>
        </Link>

        <Link to='/sign-in' className='md:order-2'>
            <button className='bg-[#3d52a0] py-2 px-3 rounded-lg text-white text-md hover:bg-[#4f62aa]'>Sign In</button>
        </Link>
        
        <Navbar.Toggle/>

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

            <Link to='/cart'>
                <Navbar.Link 
                    as={'div'} 
                    className={`text-[16px] flex items-center gap-1 ${path === '/cart'  ? 'bg-[#3d52a0]' : '' }`} 
                    active={path === '/cart'}
                >
                <span className={`${path === '/cart' ? 'md:text-[#3d52a0]' : ''} flex items-center gap-1`}><FaShoppingCart />Cart</span> 

                <span className='bg-red-500 rounded-full w-5 h-5 text-center text-white text-sm'>2</span>
                </Navbar.Link>
            </Link>

            <Link to='/wishlist'>
                <Navbar.Link 
                    as={'div'} 
                    className={`text-[16px] flex items-center gap-1 ${path === '/wishlist'  ? 'bg-[#3d52a0]' : '' }`} 
                    active={path === '/wishlist'}
                >
                    <span className={`${path === '/wishlist' ? 'md:text-[#3d52a0]' : ''} flex items-center gap-1`}><FaHeart />Wishlist</span> 

                    <span className='bg-red-500 rounded-full w-5 h-5 text-center text-white text-sm'>2</span>
                </Navbar.Link>
            </Link>

        </Navbar.Collapse>

    </Navbar>
  )
}
