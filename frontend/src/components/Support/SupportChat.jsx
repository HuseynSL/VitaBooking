import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const socket = io("http://localhost:3001");

const SupportChat = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { user: user?.username || "Support", text: message };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <>
      <div className=" flex items-center ">

        <AdminSidebar/>
        <div className="flex self-center ">
          <div className="chat-container bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <h2 className="text-white text-xl font-bold">Support Chat</h2>
            </div>
            <div className="chat-box h-64 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col mb-3 ${
                    msg.user === "Support" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[70%] ${
                      msg.user === "Support"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <b>{msg.user}:</b> {msg.text}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Reply to customer..."
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportChat;
