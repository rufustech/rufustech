import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { urls } from "../constants";
import Swal from "sweetalert2";

const NewPassword = () => {
  const { uuid, token } = useParams();
  const [user, setUser] = useState({
    uid: "",
    token: "",
    new_password: "",
    re_new_password: "",
  });

  const newPassword = (e) => {
    const updatedPassword = { ...user, uid: uuid, token: token };
    e.preventDefault();
    axios
      .post(`${urls.url}/auth/users/reset_password_confirm/`, updatedPassword)

      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "New password set successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Reset Error!",
        });
      });
  };

  return (
    <div>
      {uuid} {token}
      <form
        onSubmit={newPassword}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-4xl text-center mb-5">New Password</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="password"
            placeholder="Enter New Password"
            name="new_password"
            onChange={(e) => setUser({ ...user, new_password: e.target.value })}
            value={user.new_password}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Confirm New Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="Re-enter New Password"
            name="re_new_password"
            onChange={(e) =>
              setUser({ ...user, re_new_password: e.target.value })
            }
            value={user.re_new_password}
            required
          />
          <p className="text-red-500 text-xs italic">Enter New Password.</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
