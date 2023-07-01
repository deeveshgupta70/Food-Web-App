import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import ImageToBase64 from "../utility/ImagetoBase64";

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

  const handleUploadProductImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    // console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data);
    console.log(process.env.REACT_APP_SERVER_DOMAIN);
    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/newproduct`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await fetchData.json();
    console.log(res);
    if( res.success) {
      setData(()=>{
        return {
          name: "",
          image: "",
          category: "",
          price: "",
          description: "",
        }
      })
    }
  };
  return (
    <div className=" p-4">
      <form
        className="m-auto w-full max-w-sm p-4 shadow flex flex-col bg-white md:max-w-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="bg-slate-300 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Categories</label>
        <select
          name="category"
          id="category"
          className="bg-slate-300 p-1 my-1 "
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"burger"}>Burger</option>
          <option value={"nonveg"}>Non-Veg</option>
          <option value={"vegetable"}>Vegetables</option>
          <option value={"icecream"}>Ice-Cream</option>
          <option value={"cakes"}>Cakes</option>
          <option value={"rice"}>Rice</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
        </select>

        <label htmlFor="image">
          {" "}
          Image
          <div className=" bg-slate-300 h-40 w-full my-3 rounded-md flex justify-center items-center overflow-hidden object-cover">
            {data.image ? (
              <img src={data.image} alt="" className=""/>
            ) : (
              <span className="text-5xl ">
                <BsCloudUpload />
              </span>
            )}

            <input
              type="file"
              name="image"
              accept="image/*"
              id="image"
              className="hidden"
              onChange={handleUploadProductImage}
            />
          </div>
        </label>

        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          className="bg-slate-300 p-1 my-1"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={"3"}
          id="description"
          name="description"
          className="bg-slate-300 p-1 my-1 resize-none"
          onChange={handleOnChange}
          value={data.description}
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white text-lg text-bold rounded-md drop-shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
