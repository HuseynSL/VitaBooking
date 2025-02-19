import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from '../components/Navbar/Navbar'
import AdminTable from '../components/AdminTable/AdminTable.'

const AdminRoot = () => {
  return (
   <>
        <Navbar/>
        <AdminTable/>
        <Outlet/>
   </>
  )
}

export default AdminRoot
