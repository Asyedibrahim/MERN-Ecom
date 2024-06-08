import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IoIosStar } from "react-icons/io";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Product() {

    const params = useParams();
    const [product, setProduct] = useState({ imageUrls: [] });
    const [mainImage, setMainImage] = useState(product.imageUrls[0]);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchProduct = async () => {
               const res = await fetch(`/api/product/${params.productId}`);
               const data = await res.json();
               if (res.ok) {
                setProduct(data);
               }
            }
            
            fetchProduct();
        } catch (error) {
            toast.error(error.message);
        }
    },[setProduct]);

    useEffect(() => {
        if (product.imageUrls.length > 0) {
            setMainImage(product.imageUrls[0]);
        }
    }, [product]);


    const handleAddToCart = async () => {
        try {
            const res = await fetch('/api/cart/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    productId: product._id,
                    quantity: 1
                })
            });
            const data = await res.json()
            if (data.success === false) {
                toast.error(data.message);
                return;
            }
            if (res.ok) {
                toast.success('Product added to cart')
                navigate('/cart');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

  return (
    <div className='max-w-6xl mx-auto'>
        <div className="p-3">
            <h1 className='text-3xl font-semibold pb-3 border-b'>Product Details</h1>
            <div className="flex flex-col md:flex-row gap-5 mt-5 overflow-hidden">

                <div className="flex md:flex-1 lg:flex-none flex-col sm:flex-row md:flex-col gap-2 w-full lg:w-96 sm:h-[30rem] sm:ml-9 md:ml-0 md:h-full ">

                    <div className="relative">
                        <img src={mainImage} alt='' className="w-full sm:h-[30rem] lg:w-[25rem] md:h-full sm:order-2 md:order-1 "/>
                        {product.trending && (
                            <span className="bg-orange-500 text-white font-semibold rounded-2xl text-center text-xs absolute px-2 py-1 start-3 top-3 z-10">HOT</span>
                        )}
                    </div>

                    <div className="flex sm:flex-col md:flex-row gap-1 overflow-x-auto sm:order-1 md:order-2 custom-scrollbar">
                        {product.imageUrls.map((image, index) => (
                            <img src={image} alt="product images" key={index} className="w-16 sm:w-32 lg:w-20" onClick={() => setMainImage(image)}/>
                        ))}
                    </div>

                </div>

                <div className="mt-4 flex-1 max-w-xl sm:ml-9 md:ml-0">
                    <h3 className="text-2xl font-semibold text-slate-700">{product.name}</h3>
                    {product.offer ? (
                        <div className="text-xl mt-7 flex gap-3 items-center font-semibold">
                            <p className="text-lg text-red-600 line-through mt-1">Rs. {product.regularPrice}</p>
                            <p>Rs. {product.discountPrice}</p>
                        </div>
                    ) : <p className="text-xl mt-7 font-semibold">Rs. {product.regularPrice}</p>}
                    <div className="flex gap-1 items-center mt-3">
                        <span className="text-yellow-300 text-lg"><IoIosStar /></span>
                        <span className="text-yellow-300 text-lg"><IoIosStar /></span>
                        <span className="text-yellow-300 text-lg"><IoIosStar /></span>
                        <span className="text-yellow-300 text-lg"><IoIosStar /></span>
                        <span className="text-slate-500 text-lg"><IoIosStar /></span>
                        <span>(reviews)</span>
                    </div>
                    
                    <div className="flex flex-col gap-3 mt-7 w-48 ">
                        <span className="p-2 border bg-[#3d52a0] text-white font-semibold rounded-md cursor-pointer hover:bg-[#4f62aa] flex items-center justify-center gap-1" onClick={handleAddToCart}><FaCartPlus />Add to Cart</span>
                        <span className="flex p-2 items-center mt-1 gap-2 hover:text-rose-600 cursor-pointer"><FaRegHeart/>Add to Wishlist</span>
                    </div>

                    <div className="mt-7">
                        <p className="text-lg">Product Description</p>
                        <p className="text-slate-500">{product.description}</p>                     
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
