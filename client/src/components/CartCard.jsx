import { Table } from "flowbite-react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function CartCard({ item, onDelete, onIncrement, onDecrement }) {

    const navigate = useNavigate();

    const handleProductPage = () => {
        navigate(`/product/${item.productId._id}`)
    }

  return (
    <Table.Row hover onClick={handleProductPage} className='cursor-pointer'>
            <Table.Cell className='ps-3'>
                <img src={item.productId.imageUrls[0]} alt="" className='w-full max-w-[120px] md:max-w-[200px] lg:max-w-[250px]' />
            </Table.Cell>
            <Table.Cell className='px-4 py-2 whitespace-nowrap text-sm'>
                {item.productId.name}
            </Table.Cell>
            <Table.Cell className='px-4 py-2 text-sm'>
                <div className='flex items-center gap-3'>
                    <button className='bg-[#4f62aa] p-[0.20rem] px-2 rounded-lg text-white' onClick={() => onDecrement(item._id, item.quantity)}>-</button>
                    <span className='font-semibold'>{item.quantity}</span>
                    <button className='bg-[#4f62aa] p-[0.20rem] px-2 rounded-lg text-white' onClick={() => onIncrement(item._id, item.quantity)}>+</button>
                </div>
            </Table.Cell>
            <Table.Cell className='px-4 py-2 whitespace-nowrap text-sm'>
                ₹ {item.productId.regularPrice.toLocaleString()}
            </Table.Cell>
            <Table.Cell className='px-4 py-2 whitespace-nowrap text-lg text-red-600' onClick={() => onDelete(item._id)}>
                <RiDeleteBin5Fill className="cursor-pointer"/>
            </Table.Cell>
        </Table.Row>
  );
}
