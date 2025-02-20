import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from '../components/Navbar/Navbar'
import UsersTable from './Admin/UsersTable/UsersTable'

const AdminRoot = () => {
  return (
   <>
        <Navbar/>
        <Outlet/>
   </>
  )
}

export default AdminRoot
