import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/login/loginSlice";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get("/login.json");
      const credentials = response.data;

      if (credentials.email === email && credentials.password === password) {
        dispatch(loginUser({ email: email, password: password }));
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Failed to load login data");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-center">(admin@example.com | password)</p>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center mb-4 bg-red-50 p-2 rounded-md"
            >
              {error}
            </motion.p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 font-semibold tracking-wider"
            >
              Login
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
