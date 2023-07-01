import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link,useNavigate } from "react-router-dom";
import ImageToBase64 from "../utility/ImagetoBase64";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    image:"",
    password: "",
    confirmpassword: "",
  });


  const handleOnChange = (e) => {
    const {name, value} = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const {firstname , lastname ,email ,password,confirmpassword} = data;
    if( firstname && lastname && email && password && confirmpassword){

        if( password === confirmpassword){

          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup` , {
            method:"POST",
            headers:{
              "content-type":"application/json",
            },
            body: JSON.stringify(data),
          });
          const res = await fetchData.json();
          console.log(res);
          alert(res.message);
          if( res.success) navigate('/login'); 
        }
        else alert("Password doesn't match");
    }
    else alert("Check The Data");
  }

  const handleUploadProfileImage = async (e)=>{
    const data = await ImageToBase64(e.target.files[0]);
    // console.log(data);
    setData((preve)=>{
        return{
          ...preve,image:data
        }
    })
    
  }

  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col py-4 rounded-md">
        {/* <h1 className="text-center text-2xl fond-bold"> Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shodow-md m-auto relative">
          <img src={data.image ? data.image : loginSignupImage} alt="signUp" className="w-full h-full " />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 w-full h-1/3 bg-slate-500 bg-opacity-50 text-white text-center cursor-pointer">
              <p className="text-sm p1">upload</p>
            </div>
            <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className="w-full px-2 py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName"> First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstname"
            value={data.firstname}
            onChange={handleOnChange}
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded-sm focus-within:outline-red-300"
          />

          <label htmlFor="lastName"> Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastname"
            value={data.lastname}
            onChange={handleOnChange}
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded-sm focus-within:outline-red-300"
          />

          <label htmlFor="email"> Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleOnChange}
            value={data.email}
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded-sm focus-within:outline-red-300"
          />

          <label htmlFor="password"> Password</label>
          <div className=" flex mt-1 mb-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-red-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="w-full bg-slate-200 border-none focus:outline-none"
            />
            <span
              className="m-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className=" flex mt-1 mb-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-red-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              onChange={handleOnChange}
              value={data.confirmpassword}
              className="w-full bg-slate-200 border-none focus:outline-none"
            />
            <span
              className="m-2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white py-1 rounded-xl text-lg mt-2"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-left mt-2">
          Already have accout?{" "}
          <Link to={"/login"} className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
