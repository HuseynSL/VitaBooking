import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home/Home'
import Hotel from './pages/Hotel/Hotel'
import List from "./pages/HotelsList/List"
import UserRoot from './pages/UserRoot'

function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserRoot />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<List/>} />
          <Route path="hotels/:id" element={<Hotel />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
