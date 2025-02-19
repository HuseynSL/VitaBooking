import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Başlık */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>

      {/* Açıklama */}
      <p className="text-lg text-gray-500 text-center max-w-md mb-12">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track!
      </p>

      {/* Ana Sayfaya Dön Butonu */}
      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
