import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Table } from 'flowbite-react';
import CartCard from '../components/CartCard';
import { removeCartItem, setCartItems, updateCartItemQuantity } from '../redux/user/cartSlice.js';
import { BsCartCheckFill } from "react-icons/bs";
import empty from '../assets/images/empty.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function Cart() {

  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/cart/${currentUser._id}`);
        const data = await res.json();

        if (data.success === false) {
          toast.error(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          dispatch(setCartItems(data));
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }

    if (currentUser) {
      fetchCart();
    } else {
      setLoading(false);
    }

  }, [dispatch, currentUser]);

  const handleDeleteItem = async (cartItemId) => {
    try {
      const result = await Swal.fire({
        title: 'Remove Item?',
        text: 'You want to remove a product!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Remove it!',
        cancelButtonText: 'Keep it!'
      });
  
      if (result.isConfirmed) {
        const res = await fetch(`/api/cart/${cartItemId}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(removeCartItem(cartItemId));
          console.log(data);
        }
      }
    } catch (error) {
        console.log(error.message);
    }
  }

  
  const incrementQuantity = async (cartItemId, currentQuantity) => {

    const newQuantity = currentQuantity + 1;
    dispatch(updateCartItemQuantity({ cartItemId: cartItemId, newQuantity }));

    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity }) 
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data); 
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const decrementQuantity = async (cartItemId, currentQuantity) => {

    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      dispatch(updateCartItemQuantity({ cartItemId: cartItemId, newQuantity }));

    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity }) 
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data); 
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

const calculatePrice = () => {
  
  let totalRegularPrice = 0;
  let totalDiscountedPrice = 0;

  if (!cartItems || !cartItems.length) {
    return { totalRegularPrice, totalAmount: 0, discount: 0 }; 
  }
      cartItems.forEach(item => {
          const regularPrice = item.productId?.regularPrice || 0;
          const discountPrice = item.productId?.discountPrice || 0;
          const quantity = item.quantity;

          totalRegularPrice += regularPrice * quantity;
          
          if (item.productId?.offer) {
              totalDiscountedPrice += discountPrice * quantity;
          } else {
              totalDiscountedPrice += regularPrice * quantity;
          }
      });
  

  const totalAmount = totalDiscountedPrice;
  const discount = totalRegularPrice - totalDiscountedPrice;

  return { totalRegularPrice, totalAmount, discount };
};

  if (loading) {
    return (
      <p className='text-3xl my-52 justify-center flex gap-2 items-center'>
        Loading...<Spinner size='lg' />
      </p>
    );
  }

  if (!currentUser || !cartItems.length) {
    return <div className='justify-center flex gap-2 items-center '>
        <img src={empty} alt="" className='w-full sm:w-[80%] md:w-[60%] lg:w-[40%]'/>
    </div>;
  }

  const { totalRegularPrice, totalAmount, discount } = calculatePrice();

  return (
    <div className='max-w-6xl mx-auto p-2 min-h-screen'>
      <h1 className='text-3xl font-semibold pb-3 border-b my-7 flex items-center gap-1'>Your Cart <BsCartCheckFill/></h1>
      
        <div className='mx-auto grid grid-cols-12 gap-7 '>
          {/* Left side */}
          <div className="  overflow-x-auto col-span-12 md:col-span-7 lg:col-span-8 "> 
            <Table hoverable className=' bg-white shadow-sm border'>
              <Table.Head>
                <Table.HeadCell>images</Table.HeadCell>
                <Table.HeadCell>Product name</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y' >
                {cartItems.map((item) => (
                  <CartCard 
                    key={item._id} 
                    item={item} 
                    onDelete = {handleDeleteItem}
                    onIncrement = {incrementQuantity}
                    onDecrement = {decrementQuantity}
                  />
                ))}
                </Table.Body>
            </Table>
          </div>

          {/* Right side */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 ">
            <div className="bg-white p-5 shadow-md border">
              <h3 className='text-2xl font-semibold border-b border-b-gray-400 pb-2 text-slate-600'>Price Details</h3>
              <div className="flex justify-between text-lg mt-5">
                <span>Price <span>({cartItems.length} items)</span></span>
                <span>₹ {totalRegularPrice.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-lg mt-5">
                  <span>Discount</span>
                  <span className='text-green-600 font-semibold'>- ₹ {discount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between text-lg mt-5 border-b border-b-gray-400 pb-2">
                <span>Delivery Charges</span>
                <span className='text-green-600 font-semibold'>Free</span>
              </div>
              <div className="flex justify-between text-xl mt-5 border-b border-b-gray-400 pb-4 font-semibold">
                <span>Total Amount</span>
                <span>₹ {totalAmount.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="text-xl mt-5 font-semibold text-green-600 text-center">
                  <span>You will save ₹ <span>{discount.toLocaleString()}</span> on this order</span>
                </div>
              )}
            </div>
          </div>

        </div>

    </div>
  )
}
