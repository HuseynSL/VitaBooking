import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import url from "../../../utils/baseUrl";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import axios from "axios";

const UsersTable = () => {
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`${url}/users`, {
    headers: {
      Authorization: `Bearer admin-secret-token-123`,
    },
  });

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/users/${id}`, {
        headers: {
          Authorization: `Bearer admin-secret-token-123`,
        },
      });
      setList(list.filter((item) => item._id !== id)); // State'i güncelle
    } catch (err) {
      console.error("Error deleting user:", err);
      if (err.response && err.response.status === 401) {
        alert("You are not authorized to perform this action.");
      } else {
        alert("An error occurred while deleting the user.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full flex">
      <AdminSidebar />
      <div className="bg-gray-100 min-h-screen w-full p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-[#1c0f6e]">Users Table</h1>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-[#1c0f6e] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Delete</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {list.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{item._id}</td>
                    <td className="py-3 px-4">{item.username}</td>
                    <td className="py-3 px-4">{item.email}</td>
                    <td className="py-3 px-4">{item.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn py-2 px-3 bg-red-700 rounded-md text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;