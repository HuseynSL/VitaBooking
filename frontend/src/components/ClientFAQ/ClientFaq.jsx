import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const LiveChat = () => {
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
      socket.emit("sendMessage", { user: "Customer", text: message });
      setMessage("");
    }
  };

  return (
    <div className="chat-container w-80 border-2 border-gray-300 rounded-md">
      <h2>Live Chat</h2>
      <div className="chat-box h-44 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user === "Customer" ? "bg-blue-200" : "bg-green-200"} p-2 mb-1`}>
            <b>{msg.user}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default LiveChat;
