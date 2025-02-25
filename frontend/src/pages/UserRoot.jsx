import React from 'react'
import Navbar from "../components/Navbar/Navbar"
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer/Footer"


const UserRoot = () => {
  return (
    <>
    
        <Navbar/>
        <Outlet/>
        <Footer/>
    
    </>
  )
}

export default UserRoot
