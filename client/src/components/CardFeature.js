import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const CardFeature = ({ image, name, price, category, loading , id }) => {
  // console.log(name);
  const dispatch = useDispatch();
  const handleAddCartProduct = (e)=>{
    e.stopPropagation();
    dispatch(addCartItem({
      _id:id,name,price,category , image
    }));
  }
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white drop-shadow-lg hover:shodow-lg py-3 px-4 cursor-pointer mb-2">
      {image ? (
        <>
          <Link to={`/menu/${id}`} onClick={()=>{window.scrollTo({top:"0" , behavior:"smooth"})}}>
            <div className=" h-28 flex justify-center">
              <img src={image} className="h-full" alt="vegetable" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500 font-medium capitalize">{category}</p>
            <p className="font-bold ">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
            <button className="bg-orange-400 w-full text-md text-white border-2 rounded-md mt-3 hover:text-orange-400 hover:bg-white hover:border-orange-400" onClick={handleAddCartProduct}>
              Add Cart
            </button>
        </>
      ) : (
        <div className=" min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
