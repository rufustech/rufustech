import React from 'react';
import { Link } from 'react-router-dom';
import { rufustech1 } from '../assets';

function Login() {
  return (
    <div>
      <div className='grid grid-cols-12'>
        <div className="col-span-12 md:col-span-4 text-white font-sans font-bold bg-[#0B123F] min-h-screen md:pl-0">
          <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start p-4">
            {/* Hide the image on tablets and smaller screens */}
            <a href='/' className=""><img className="rounded-md shadow-lg  shadow-gray-700" src={rufustech1} alt="" /></a>
            <div className="row-span-4 row-start-2 text-4xl">
              Sign In
              <div className="pt-10 md:pt-6 pr-4 md:pr-20">
                <label className="text-sm font-sans font-medium">
                  Username
                </label>
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Enter email address" 
                  className="w-full bg-black py-3 px-2 md:px-12 border hover: border-gray-500 rounded shadow text-base font-sans" />                            
              </div>
              <div className="pt-2 md:pt-6 pr-4 md:pr-20">
                <label className="text-sm font-sans font-medium">
                  Password
                </label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Enter password" 
                  className="w-full bg-black py-3 px-2 md:px-12 border hover: border-gray-500 rounded shadow text-base font-sans" />
                <a href="" className="text-sm font-sans font-medium text-white underline">
                  Forgot password?
                </a>
              </div>
              {/* Button */}
              <div className="text-sm font-sans font-medium w-full pr-4 md:pr-20 pt-14">
                <button 
                  type="button"   
                  className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white">
                    SIGN IN
                </button>
              </div>
              <Link style={{fontSize: "30px", color: "Red" }} className='hover:no-underline text-md md:text-base' to="/signup">
                <span style={{fontSize: "16px", color: "white", paddingRight: "110px" }} className="hover:no-underline hover:scale-110">Need an account </span> Register
              </Link>
            </div>
            {/* Text */}
            <a href="" className="text-sm font-sans font-medium text-gray-400 underline">
              {/* Don´t have an account? Sign up */}
            </a>
          </div>         
        </div>
        {/* <!-- Second column image --> */}
        <div style={{ background: "url('https://img.freepik.com/free-photo/top-view-lock-keyboard-with-plant-notebook_23-2148578065.jpg?t=st=1714415948~exp=1714419548~hmac=784ae77f2d624dfebdb5397772dc6d7f1d3d112f27f972cf09ee5123d28998e3&w=1380')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="col-span-8 text-white font-sans font-bold"></div>

      </div>
    </div>
  );
}

export default Login;
