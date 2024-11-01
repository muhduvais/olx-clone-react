import React from 'react';
import favorite_icon from '../assets/favorite.svg';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, title, price, category, description, image }) => {
  const navigate = useNavigate();

  return (
    <div 
      className='border-gray-400 border-[1.5px] p-3 pb-2 rounded text-start relative cursor-pointer'
      onClick={() => navigate(`/details/${id}`)}
    >
      <img src={image} alt={title} className='h-40 w-full object-cover rounded' />
      <div className="favorite bg-white p-2 absolute top-3 right-3 rounded-full cursor-pointer">
        <img src={favorite_icon} alt="Favorite" className='favorite-icon w-5'/>
      </div>
      <div className="details p-2 flex flex-col">
        <p className='text-black text-lg font-bold'>₹ {price}</p>
        <p className='text-md text-gray-600 truncate'>{title}</p>
        <div className="place-date flex items-center justify-between pt-1">
          <p className='text-xs text-gray-400 truncate'>NOIDA-GREATER NOIDA LINK RD, NOIDA</p>
          <p className='text-xs text-gray-400'>OCT 12</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;