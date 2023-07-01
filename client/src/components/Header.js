import React, { useState } from "react";
import logo from "../assest/logo2.jpg";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutReducer } from "../redux/userSlice";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const productCartItem = useSelector(state => state.product.cartItem);

  const handleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleLogout = () => {
    dispatch(logoutReducer());
  };
  const userData = useSelector((state) => state.user);
  // console.log(userData);
  // console.log(process.env.REACT_APP_DOMAIN_ACCESS);


  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to="">
          <div className="h-12">
            <img src={logo} className="h-full" alt="logo" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/6484ebd47865461819cd21fa"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={'/cart'}>
              <BsCartFill className=" cursor-pointer" />
              <div className="absolute -top-2 -right-1 bg-red-500 m-0 p-0 text-sm text-center rounded-full w-4 h-4 text-white">
                {productCartItem.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden ">
              {/* <HiOutlineUserCircle /> */}
              {userData.image ? (
                <img
                  src={userData.image}
                  className="w-full h-full "
                  alt="userImage"
                />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white p-2 drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.image ? (
                  <p
                    className="cursor-pointer hover:text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer hover:text-red-600"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/6484ebd47865461819cd21fa"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
                {userData.email === process.env.REACT_APP_DOMAIN_ACCESS ? (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer hover:text-red-600"
                  >
                    New Product
                  </Link>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
    </header>
  );
};

export default Header;
