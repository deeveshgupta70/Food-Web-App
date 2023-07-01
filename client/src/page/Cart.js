import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCartGif from "../assest/empty.gif"
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user);
  // console.log(user);
  const navigate = useNavigate();
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const qty = productCartItem.reduce((acc, el) => acc + el.qty, 0);
    const total = productCartItem.reduce((acc, el) => {
      acc = Number(acc) + Number(el.total);
      return acc;
    }, 0);
    setTotalPrice(total);
    setTotalQty(qty);
  }, [productCartItem]);

  const handlePayment = async() => {

    if(user.email){
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY)
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify(productCartItem),
      });
      if(res.statusCode === 500) return;
      const data = await res.json();
      // console.log(data);

      stripePromise.redirectToCheckout({sessionId : data}) 
    }
    else {
      setTimeout(()=>navigate("/login") , 1000)
    }

  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600 ">
          Your Cart
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 md:flex gap-3">
            {/* display cart Items */}
            <div className="w-full max-w-3xl">
              {productCartItem[0] &&
                productCartItem.map((el, ind) => {
                  return (
                    <CartProduct
                      key={el._id}
                      name={el.name}
                      category={el.category}
                      image={el.image}
                      qty={el.qty}
                      total={el.total}
                      id={el._id}
                      price={el.price}
                    />
                  );
                })}
            </div>
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        ):
        <>
        <div className="flex w-full justify-center items-center flex-col">
          <img src={emptyCartGif} className="w-full max-w-sm" alt=""/>
          <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
        </div>
      </>}
      </div>
    </>
  );
};

export default Cart;
