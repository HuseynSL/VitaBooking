import React from "react";
import { FaRegEye } from "react-icons/fa";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar/>
        <div className="dashboard">
          <div className="dCards grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <button className="p-2 rounded-full bg-gray-100">
                <FaRegEye />
              </button>
              <h3></h3>
              <span></span>
            </div>
          </div>
          <div className="dBoard"></div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
