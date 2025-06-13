import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BASE = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${BASE}/api/auth/register`, {
        email,
        password,
      });
      alert("Registered! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
