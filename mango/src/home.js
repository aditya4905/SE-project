import React, { useState ,useEffect} from "react";
import userIcon from "./user.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { get } from "mongoose";
function Home() {
      const navigate = useNavigate();
  let isLogedIn=false;
  
   const curr= localStorage.getItem('user');
   let ProfileLink = "../profile/" + curr;
   if (curr) {
     isLogedIn = true;
     console.log("heyyyy");
     console.log(curr);
   }
   const handleClicklogin= async (e)=>{
    navigate('../login');
 };
 const handleClicklogout = async (e) => {
    localStorage.removeItem('user');
   navigate("../home");
 };
  return (
    <div className="h-screen bg-red-800">
      <div className="h-4/12 bg-blue-100 flex justify-between items-center">
        {/* Rounded icon */}
        <div className="pl-10">
          <a href="/home" className="text-2xl ">
            Mango
          </a>
        </div>

        <div className="flex mr-3">
          <a className="mr-5 text-2xl " href="/home">
            Home
          </a>
          <div className="ml-5 text-2xl">Premium</div>
        </div>

        <div className="p-4">
          {isLogedIn ? (
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="rounded-full h-14 w-14 cursor-pointer pr-4 mb-2"
                />
                <a className="text-blue-900 underline" href={ProfileLink}>
                  {curr}
                </a>
              </div>
              <button
                className="ml-4 text-white bg-gray-800 hover:bg-gray-700 pl-1 rounded"
                onClick={(e) => handleClicklogout(e)}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              className="h-14 m-4 px-4 text-white bg-gray-800 hover:bg-gray-700  rounded"
              onClick={(e) => handleClicklogin(e)}
            >
              Log In
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
          <div className="h-60vh">
            <img className="h-full w-full object-cover" src="./img3.jpg" />
          </div>
          <div className="h-60vh">
            <img className="h-full w-full object-cover" src="./img2.jpg" />
          </div>
          <div className="h-60vh">
            <img className="h-full w-full object-cover" src="./img1.jpg" />
          </div>
        </Carousel>
        <div className="absolute top-1/4 left-20 pl-20 pt-10 rounded-md w-4/12 transform -translate-y-1/2">
          <div className="text-5xl pb-4">
            Find the right freelance service, right away
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-200 px-5 py-2 rounded-md outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
