import React, { useEffect, useState } from "react";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { useSelector } from "react-redux";


const AllProduct = ({heading}) => {
    const product = useSelector((state) => state.product.product);
    const categoryList = [...new Set(product.map((ele)=>{
        return ele.category;
      }))];
      const loadingArrayFeature = new Array(20).fill(null);
    
      ///filter Product Data
      const [dataFilter , setDataFilter] = useState([]);
      const [filterby, setFilterBy] = useState("");
    
      useEffect(()=>{
        setDataFilter(()=>{
          return [
            ...product
          ]
        })
      },[product])
    
      const handleFilterProduct = (category)=>{
        setFilterBy(category)
        const filter = product.filter(el=> el.category.toLowerCase() === category.toLowerCase());
        setDataFilter(()=>{
          return [
            ...filter
          ]
        })
      }
  return (
    <div>
      <div className="">
        <h2 className="font-bold text-2xl text-slate-800">{heading}</h2>
      </div>
      <div className=" flex gap-4 items-center justify-center overflow-scroll scrollbar-none cursor-pointer">
        {categoryList[0] ?
          categoryList.map((ele, ind) => {
            return (
              <FilterProduct
                category={ele}
                key={ind}
                isActive = {ele.toLowerCase() === filterby.toLocaleLowerCase()}
                onClick={() => handleFilterProduct(ele)}
              />
            );
          }):
          (
            <div className=" min-h-[150px] flex justify-center items-center">
              <p>Loading...</p>
            </div>
          )}
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-4">
        {dataFilter[0] ? dataFilter.map((el, ind) => {
          return (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
            />
          );
        }):
        loadingArrayFeature.map((el, index) => {
          return <CardFeature key={index}/>;
        })}
      </div>
    </div>
  );
};

export default AllProduct;
