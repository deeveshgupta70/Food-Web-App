import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.product);
  const dataDetails = product.filter((ele) => ele._id === params.filterby)[0];
  const dispatch = useDispatch();
  const {name , _id , image , category , price} = dataDetails;
  const handleAddCartProduct = ()=>{
    dispatch(addCartItem({
      name , _id , image , category , price
    }))

  }
  const handleBuyCartProduct = ()=>{
    dispatch(addCartItem({
      name , _id , image , category , price
    }))
    navigate("/cart");
  }
  // console.log(product);
  return (
    // <div className=" p-2 md:p-4">
    //   <div className="w-full max-w-4xl  m-auto md:flex">
    //     <div className=" max-w-lg shadow overflow-hidden flex justify-center">
    //       <img
    //         src={dataDetails.image}
    //         alt=""
    //         className="hover:scale-105 transition-all"
    //       />
    //     </div>
    //     <div className="text-left ml-2 bg-white">
    //       <h3 className="font-semibold text-slate-600  capitalize text-2xl">
    //         {dataDetails.name}
    //       </h3>
    //       <p className=" text-slate-500  font-medium capitalize">
    //         {dataDetails.category}
    //       </p>
    //       <p className=" font-bold md:text-2xl">
    //         <span className="text-red-500">₹</span>
    //         <span>{dataDetails.price}</span>
    //       </p>
    //       <div className="flex gap-3 ">
    //         <button className="bg-orange-400 w-full text-md text-white border-2 rounded-md mt-2 min-w-[100px] hover:text-orange-400 px-5 py-1 hover:bg-white hover:border-orange-400 ">
    //           Buy
    //         </button>
    //         <button className="bg-orange-400 w-full text-md text-white border-2 rounded-md mt-2 min-w-[100px] hover:text-orange-400 px-5 py-1 hover:bg-white hover:border-orange-400 ">
    //           Add Cart
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img
            src={dataDetails.image}
            className="hover:scale-105 transition-all h-full"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {dataDetails.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl">
            {dataDetails.category}
          </p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500 ">₹</span>
            <span>{dataDetails.price}</span>
          </p>
          <div className="flex gap-3">
            <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]" onClick={handleBuyCartProduct}>
              Buy
            </button>
            <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]" onClick={handleAddCartProduct}>
              Add Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description : </p>
            <p>{dataDetails.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"} loading={"Loading..."}/>
    </div>
  );
};

export default Menu;
