import { Label, Select, Spinner, TextInput, Textarea } from 'flowbite-react'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashCreateProduct() {

    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        categoryId: '',
        regularPrice: 0,
        discountPrice: 0,
        offer: false,
        trending: true
    });
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const fileRef = useRef(null);
    const {currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('/api/category/getCategory');
            const data = await res.json();
            if (res.ok) {
                setCategories(data);
            }
        }
        fetchCategories();
    }, [setCategories]);

    const handleChange = (e) => {
        if (e.target.id === 'offer' || e.target.id === 'trending') {
            setFormData({ 
                ...formData, 
                [e.target.id]: e.target.checked
            });
        };
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        };
    };

    const handleImageChange = (e) => {
        setFiles(e.target.files);
    }
    
    useEffect(() => {
        if (files && files.length > 0) {
            handleImageSubmit();
          }
    }, [files])

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            const promises = [];
            setLoading(true);

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls)
                });
            }).catch((err) => {
                toast.error('Image upload failed (2mb max per image)');
                setLoading(false);
            })
            setLoading(false);
        } else if (files.length == 0) {
            toast.error('You must upload atleast one image');
            setLoading(false);
        } else {
            toast.error('You can only upload 6 image per listing');
            setLoading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
            (error) => {
                toast.error('Error uploading image');
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                });
            });
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter( (_,i) => i !== index ),
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (formData.imageUrls.length < 1) {
                setLoading(false);
                return toast.error('You must upload atleast one image');
            }
            if (+formData.discountPrice > +formData.regularPrice) {
                setLoading(false);
                return toast.error('Discount price must be lower than regular price');
            }
            if (formData.categoryId === '' || !formData.categoryId) {
                setLoading(false);
                toast.error('Must select category');
            }
            const res = await fetch('/api/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userId: currentUser._id
                })
            });
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            toast.success('Product created!');
            navigate(`/product/${data._id}`);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }

  return (
    <div className='max-w-3xl md:ml-5 p-3 mt-7'>
        <h1 className='text-2xl font-semibold'>Create Product</h1>
        <form className="lg:gap-10" onSubmit={handleSubmit} autoComplete='off'>
            <div className="my-8">
                <div className="flex flex-col gap-2">
                    <Label>Product Name : </Label>
                    <div className="flex gap-5 items-center">
                        <TextInput type='text' color='white' placeholder='Eg. Laptop' id='name' required onChange={handleChange} value={formData.name}/>
                        <Select onChange={(e) => setFormData({...formData, categoryId: e.target.value})} color='white'>
                            <option>Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id} className='bg-gray-50'> {category.name} </option>
                            ))}
                        </Select>
                    </div>

                    <div className="mt-7 flex flex-col gap-2">
                        <Label>Product Description : </Label>
                        <Textarea color='white' placeholder='Add a Description...' id='description' rows='3' onChange={handleChange} value={formData.description}/>
                    </div>

                    <div className="flex gap-7 items-center">
                        <div className="mt-7 flex flex-col gap-2">
                            <Label>Regular Price : </Label>
                            <input type="number" id='regularPrice' min='0' max='10000000' className='border-2 border-slate-300 rounded-lg' required onChange={handleChange} value={formData.regularPrice}/>
                        </div>
                        {formData.offer && (
                            <div className="mt-7 flex flex-col gap-2">
                                <Label>Discount Price : </Label>
                                <input type="number" id='discountPrice' min='0' max='10000000' className='border-2 border-slate-300 rounded-lg' required onChange={handleChange} value={formData.discountPrice}/>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-7 mt-5">
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" checked={formData.trending} id='trending' onChange={handleChange}/>
                            <Label htmlFor="trending" className='cursor-pointer'>Trending</Label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" checked={formData.offer} id='offer' onChange={handleChange}/>
                            <Label htmlFor="offer" className='cursor-pointer'>Offer</Label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:my-7">
                <Label>Images : The first image will be the cover photo (max 5)</Label>
                <div className="flex flex-wrap gap-1 m-2">
                    {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className="relative">
                            <img src={url} alt="product image" className="w-full h-36 object-contain rounded-lg "/>
                            <button 
                                className='absolute z-10 top-1 end-1 border rounded-full bg-white w-6 h-6 flex justify-center items-center' onClick={()=>handleRemoveImage(index)}>
                                    <RxCross2 className='font-semibold'/>
                            </button>
                        </div>

                    ))}
                        <input 
                            className='border border-gray-300 rounded-lg mt-2' 
                            type="file" id='images' 
                            accept='image/*'
                            multiple 
                            onChange={handleImageChange} 
                            hidden 
                            ref={fileRef} />
                        <div 
                            className='border-4 border-dashed p-10 bg-white flex flex-col items-center text-slate-400 cursor-pointer' 
                            onClick={()=>fileRef.current.click()}>
                                <IoCloudUploadOutline className='text-4xl'/>Upload image
                        </div>
                  </div>
                
                <button type='submit' disabled={loading} className='rounded-lg py-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] disabled:bg-[#4f62aa] font-semibold w-full mt-4'>{loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </> 
              ) : 'Create Product'
              }</button>
            </div>

        </form>
    </div>
  )
}
