import { Table } from "flowbite-react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { TiMinus, TiPlus } from "react-icons/ti";

export default function CartCard({ item, onDelete, onIncrement, onDecrement }) {

    const navigate = useNavigate();

    const handleProductPage = () => {
        navigate(`/product/${item.productId._id}`)
    }

    const imageUrl = item.productId?.imageUrls?.[0] || '/placeholder.jpg'; 
    const productName = item.productId?.name || 'Product Unavailable';
    const regularPrice = item.productId?.regularPrice || 0;

  return (
    
        <Table.Row className='cursor-pointer' key={item._id}>
            <Table.Cell className='ps-3' onClick={handleProductPage}>
                <img src={imageUrl} alt="" className='w-16 h-16 object-cover bg-gray-500' />
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap text-sm' style={{ maxWidth: '200px' }} onClick={handleProductPage}>
            <div className='truncate'>
                {productName}
            </div>
        </Table.Cell>
            <Table.Cell className='text-sm'>
                <div className='flex items-center gap-3'>
                    <button className='text-lg' onClick={() => onDecrement(item._id, item.quantity)}><TiMinus /></button>
                    <span className='font-semibold'>{item.quantity}</span>
                    <button className='text-lg' onClick={() => onIncrement(item._id, item.quantity)}><TiPlus/></button>
                </div>
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap text-sm' onClick={handleProductPage}>
                ₹ {regularPrice.toLocaleString()}
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap text-lg text-red-600' onClick={() => onDelete(item._id)}>
                <RiDeleteBin5Fill className="cursor-pointer"/>
            </Table.Cell>
        </Table.Row>
    
  );
}
