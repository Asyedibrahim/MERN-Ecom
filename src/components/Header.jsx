import { Link } from 'react-router-dom';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';


export default function Header() {
  return (
    
    <Navbar className='border-b-2 shadow-md'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold '>
            <span className='font-bold text-[#3d52a0] text-xl'>Fashion_Fiesta</span>
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
            <button className='bg-[#3d52a0] py-2 px-3 rounded-lg text-white text-md hover:bg-[#455aa5]'>Sign In</button>
        </Link>
        
        <Navbar.Toggle/>

        <Navbar.Collapse>
            <Link to='/'>
                <Navbar.Link as={'div'}>
                    Home
                </Navbar.Link>
            </Link>
        </Navbar.Collapse>

    </Navbar>
  )
}
