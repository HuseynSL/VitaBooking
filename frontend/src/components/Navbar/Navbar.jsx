import React, { useContext } from 'react'
import style from "./style.module.css"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="navbar w-full bg-[#1C0F5E]">
        <div className={style.container}>
        <div  className="bg-[#1C0F6E] text-white text-lg font-extrabold tracking-wider font-poppins px-6 py-4 rounded-xl shadow-2xl md:text-3xl lg:text-4xl"> VitaBooking.com</div>
          {user?.username ?  <><button onClick={() => navigate("/profile")}>Welcome, {user.username}</button></>
          : ( <div className="navIcons flex gap-3">
                <button><span className='text-md font-bold'>AZN</span></button>
                <button
                 className='btn bg-white text-yellow-500 border-4 rounded-xl border-yellow-500 px-3 py-0 text-sm md:px-4 py-1'
                  onClick={() => window.location.href = "/login"}>
                  Sign in
                  </button>
                <button className='btn bg-white text-yellow-500 border-4 rounded-xl border-yellow-500 px-4 py-1 text-sm'>Register</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
