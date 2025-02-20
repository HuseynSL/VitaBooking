import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Client/Home/Home";
import UserRoot from "./pages/UserRoot";
import AdminRoot from "./pages/AdminRoot";
import Access from "./components/AdminAccess/Access";
import Login from "./pages/Client/Login/Login";
import List from "./pages/Client/HotelsList/List";
import Hotel from "./pages/Client/Hotel/Hotel";
import Profile from "./pages/Client/UserProfile/Profile";
import NotFound from "./pages/Client/NotFound/NotFound";
import AdminSupport from "./pages/Admin/SupportPage/AdminSupport";
import ChatPage from "./pages/Client/ChatPage/ChatPage";
import HotelsTable from "./pages/Admin/HotelsTable/HotelsTable";
import UsersTable from "./pages/Admin/UsersTable/Userstable";
// import RezervationsTable from "./pages/Admin/RezervationsTable/RezervationsTable";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>} />

          <Route path="/" element={<UserRoot/>}>
            <Route index element={<Home/>} />
            <Route path="hotels" element={<List/>} />
            <Route path="hotels/:id" element={<Hotel/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="*" element={<NotFound/>} />
            {/* <Route path="livechat" element={<ChatPage/>} />  */}
          </Route>
          
          <Route path="/admin" element={<Access/>}>
            <Route index element={<AdminRoot />} />
            <Route path="users" element={<UsersTable/>} />
            <Route path="hotels" element={<HotelsTable/>} /> 
            {/* <Route path="reservations" element={<RezervationsTable/>} />  */}
            {/* <Route path="support" element={<AdminSupport/>} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
