import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
// import UsersTable from './Admin/UsersTable/UsersTable'
import AdminSidebar from "../components/AdminSidebar/AdminSidebar"

const AdminRoot = () => {
  return (
   <>
        <Navbar/>
        <AdminSidebar/>
        <Outlet/>
   </>
  )
}

export default AdminRoot
