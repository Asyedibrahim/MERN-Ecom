import { Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'

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
    }

  return (
    <div className='max-w-5xl mx-auto p-3 w-full mt-7'>
        <h1 className='text-2xl font-semibold'>Create Product</h1>
        <form className="flex flex-col lg:flex-row lg:gap-10">
            <div className="my-8">
                <div className="flex flex-col gap-2">
                    <Label>Product Name : </Label>
                    <div className="flex gap-5 items-center">
                        <TextInput type='text' placeholder='Eg. Laptop' id='name' className='flex-1' required onChange={handleChange} value={formData.name}/>
                        <Select onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
                            <option>Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}> {category.name} </option>
                            ))}
                        </Select>
                    </div>

                    <div className="mt-7 flex flex-col gap-2">
                        <Label>Product Description : </Label>
                        <Textarea placeholder='Add a Description...' id='description' rows='3' onChange={handleChange} value={formData.description}/>
                    </div>

                    <div className="flex gap-7 items-center">
                        <div className="mt-7 flex flex-col gap-2">
                            <Label>Regular Price : </Label>
                            <input type="number" id='regularPrice' min='0' max='100000' className='border-2 border-slate-300 rounded-lg' required onChange={handleChange} value={formData.regularPrice}/>
                        </div>
                        <div className="mt-7 flex flex-col gap-2">
                            <Label>Discount Price : </Label>
                            <input type="number" id='discountPrice' min='0' max='100000' className='border-2 border-slate-300 rounded-lg' required onChange={handleChange} value={formData.discountPrice}/>
                        </div>
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
                <Label>Upload Image : </Label>
                <input className='border border-gray-300 rounded-lg w-full mt-2' type="file" id='images' accept='image/*' multiple onChange={(e) => setFiles(e.target.files)}/>

                <button className='rounded-lg py-2 bg-[#3d52a0] text-white hover:bg-[#4f62aa] disabled:bg-[#4f62aa] font-semibold w-full mt-4'>Create Product</button>
            </div>

        </form>
    </div>
  )
}
