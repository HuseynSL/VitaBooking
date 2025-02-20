import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";

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
      socket.emit("sendMessage", {
        user: user?.username || "Support",
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container border-2 border-gray-300 p-3 rounded-md w-80">
      <h2>Support Chat</h2>
      <div className="chat-box h-44 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-1 ${
              msg.user === "Support" ? "bg-blue-300 text-white" : "bg-gray-200 text-black"
            }`}
          >
            <b>{msg.user}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Reply to customer..."
        className="border p-1 w-full"
      />
      <button className="bg-blue-500 text-white px-3 py-1 mt-2" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default SupportChat;
