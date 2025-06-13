import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="font-bold text-xl">Creator Platform</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Content Assistant</Link>
        <Link to="/analytics" className="hover:underline">Analytics</Link>

        {!token ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="hover:underline text-red-200">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
