import axios from "axios";
import React, { useState } from "react";
import { urls } from "../constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const Reset = () => {
  const [user, setUser] = useState({
    email: "",
  });

  let currentDate = new Date();
  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(`${urls.url}/auth/users/reset_password/`, user)
      .then((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Check your email!',
        });
      })
      .catch((err) => {Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
      });
  };

  return (
    <div className="bg-white">
      <Header />

      <div className="flex items-center justify-center">
        <div className=" w-full max-w-xl mt-60 mb-96">
          <form
            onSubmit={loginUser}
            className="bg-[#F5F5F5] shadow-lg shadow-[#c02128] rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-4xl text-center mb-5">Reset Password
            </h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Enter email address"
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-12 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Reset
              </button>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            &copy;{currentDate.getFullYear()} Rufarodev All rights
            reserved.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
     
    
  );
};

export default Reset;
