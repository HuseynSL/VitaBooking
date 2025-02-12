import React from 'react'
import style from "./style.module.css"

const Navbar = () => {
  return (
    <div>
      <div className="navbar w-full bg-yellow-500">
        <div className={style.container}>
            <span className='logo font-bold text-4xl'>VitaBooking</span>
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
