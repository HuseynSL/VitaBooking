import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import List from "./pages/HotelsList/List";
import Login from "./pages/Login/Login";
import UserRoot from "./pages/UserRoot";
import Profile from "./pages/UserProfile/Profile";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>} />

          
          <Route path="/" element={<UserRoot />}>
            <Route index element={<Home />} />
            <Route path="hotels" element={<List />} />
            <Route path="hotels/:id" element={<Hotel />} />
            <Route path="profile" element={<Profile />} />
            <Route path="livechat" element={<ChatPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
