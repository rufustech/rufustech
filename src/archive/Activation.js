import React from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router'
import { urls } from "../constants";
import Swal from "sweetalert2";

const Activate = () => {
  const { uuid, token} = useParams()
  let nav = useNavigate()
  const activation = (e) => {
    const activateAccount = { uid: uuid, token: token };
    e.preventDefault();
    axios
      .post(`${urls.url}/auth/users/activation/`, activateAccount)
      .then((resp) => {
        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account activated successfully, go ahead and login!',
        });
        nav("/login")
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!',
        });
      });
  };
  
  return (
    
    <div>
      {uuid} {token}
      <form
        onSubmit={activation}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-4xl text-center mb-5">Activate Account</h1>        
        <div className="flex items-center justify-between">
          <button onClick={activation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Activate Account
          </button>
                  </div>
      </form>
    </div>

  )
}

export default Activate


