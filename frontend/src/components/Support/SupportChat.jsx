import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const SupportChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { user: "Support", text: message });
      setMessage("");
    }
  };

  return (
    <div className="chat-container border-2 border-gray-300 p-3 rounded-md">
      <h2>Support Chat</h2>
      <div className="chat-box h-44 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message bg-gray-200 p-2 mb-1">
            <b>{msg.user}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Reply to customer..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SupportChat;
