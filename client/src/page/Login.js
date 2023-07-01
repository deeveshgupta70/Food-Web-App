import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginReducer } from "../redux/userSlice";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

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

    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await fetchData.json();
      // console.log(res);
      dispatch(loginReducer(res.data));
      // console.log(userData.user);

      
      if(res.success) setTimeout(()=>navigate("/") , 100);
    } else alert("Check The Data");
  };
  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col py-4 rounded-md">
        {/* <h1 className="text-center text-2xl fond-bold"> Sign up</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shodow-md m-auto">
          <img src={loginSignupImage} alt="signUp" className="w-full" />
        </div>

        <form
          className="w-full px-2 py-3 flex flex-col"
          onSubmit={handleSubmit}
        >
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

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white py-1 rounded-xl text-lg mt-2"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-left mt-2">
          Don't have accout?{" "}
          <Link to={"/signup"} className="text-red-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
