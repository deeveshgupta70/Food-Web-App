import React, { useRef } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import { GrNext, GrPrevious } from "react-icons/gr";
// import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";
const Home = () => {
  const product = useSelector((state) => state.product.product);
  // console.log(product);
  const homeProductCartList = product.slice(11, 15);
  const homeProductCartListVegetables = product.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(20).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };


  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 bg-slate-300 w-36 rounded-full items-center px-2">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              alt=""
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The fastest Delivery <span className="text-red-600">Your Home</span>{" "}
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa in
            maxime ipsam veritatis, fuga a quibusdam totam quidem quae
            temporibus quisquam nemo eum quam assumenda sed adipisci dicta
            distinctio quos ad perferendis fugit dolorem. Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Fugiat maiores culpa natus, neque
            necessitatibus, ratione placeat facere odio accusantium earum
            praesentium animi iure optio corporis hic distinctio deserunt,
            voluptas illum obcaecati nulla quisquam delectus! Dicta voluptatem
            eligendi sunt, beatae facilis quae ab maxime.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-lg hover:bg-white hover:text-red-400">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                );
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800">
            Fresh Vegetables
          </h2>
          <div className=" ml-auto flex gap-4">
            <button
              onClick={prevProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 mt-3 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el, index) => {
                return (
                  <CardFeature
                    key={el._id}
                    image={el.image}
                    id = {el._id}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => {
                return <CardFeature key={index} loading={"Loading..."}/>;
              })}
        </div>
      </div>

      <AllProduct heading = {"Your Product"} loading={"Loading..."}/>
    </div>
  );
};

export default Home;
