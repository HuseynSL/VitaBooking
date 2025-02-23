import React, { useContext, useEffect, useState } from 'react'
import style from "./style.module.css"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";


const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); 
    navigate("/login"); 
  };
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  return (
    <div>
      <div className="navbar w-full bg-[#1C0F5E]">
        <div className={style.container}>
        <div  className="bg-[#1C0F6E] text-white text-lg   font-extrabold tracking-wider font-poppins px-6 py-4 rounded-xl shadow-2xl md:text-3xl lg:text-4xl"> VitaBooking.com</div>
        {user ? (
          <div className="user-info flex gap-5">
            <button onClick={()=>navigate("/livechat")}><FaQuestionCircle /></button>
            <button onClick={() => navigate("/profile")}>Welcome, {user.username}</button>
            <button
              className="button font-semibold self-center bg-white text-blue-500 border-2 rounded border-blue-700 px-3 h-8 text-sm md:px-4"
              onClick={handleLogout}>
              Logout
            </button>
            <button
            className={style.themeToggle}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          </div>
        ) : (
          <div className="navIcons flex gap-3">
            <button><span className='text-md font-bold'>AZN</span></button>
            <button
              className="button font-semibold self-center bg-white text-blue-500 border-2 rounded border-blue-700 px-3 h-8 text-sm md:px-4"
              onClick={() => navigate("/login")}>
              Sign in
            </button>
            <button
              className="button font-semibold self-center bg-white text-blue-500 border-2 rounded border-blue-700 px-3 h-8 text-sm md:px-4"
              onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
