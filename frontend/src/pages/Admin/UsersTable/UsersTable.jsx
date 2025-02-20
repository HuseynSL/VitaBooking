import React from "react";
import useFetch from "../../../hooks/useFetch";
import url from "../../../utils/baseUrl";

const UsersTable = () => {
  const { data, loading,error } = useFetch(`${url}/users`, {
    headers: {
      Authorization: `Bearer admin-secret-token-123`, 
    },
  });

  return (
    <div className="bg-gray-100 min-h-screen p-4">
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
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{item._id}</td>
                  <td className="py-3 px-4">{item.username}</td>
                  <td className="py-3 px-4">{item.email}</td>
                  <td className="py-3 px-4">{item.isAdmin ? "Admin" : "User"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
