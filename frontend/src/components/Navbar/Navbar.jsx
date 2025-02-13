import React from 'react'
import style from "./style.module.css"

const Navbar = () => {
  return (
    <div>
      <div className="navbar w-full bg-yellow-500">
        <div className={style.container}>
        <div className="bg-yellow-500 text-white text-3xl font-extrabold   tracking-wider font-poppins px-6 py-4 rounded-lg shadow-xl"> VitaBooking.com</div>
            <div className="navIcons flex gap-3">
                <button><span className='text-md font-bold'>AZN</span></button>
                <button className='btn bg-white text-yellow-500 border-4 rounded-xl border-yellow-500 px-4 py-1 text-sm'>Sign in</button>
                <button className='btn bg-white text-yellow-500 border-4 rounded-xl border-yellow-500 px-4 py-1 text-sm'>Register</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
