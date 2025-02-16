import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center text-white px-6 py-8 space-y-6">
          <div className="flex flex-col items-center">
            <MessageSquare className="size-12 p-2 bg-white/20 rounded-full text-white" />
            <h1 className="text-3xl font-bold mt-4">Join Us</h1>
            <p className="text-sm text-gray-300">Create an account to get started</p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {[
              { label: "Full Name", icon: <User />, value: "fullName" },
              { label: "Email", icon: <Mail />, value: "email" },
            ].map(({ label, icon, value }, idx) => (
              <div key={idx} className="relative w-full">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
                <input
                  type="text"
                  className="w-full bg-white/20 border border-white/30 rounded-lg py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  placeholder={label}
                  value={formData[value]}
                  onChange={(e) => setFormData({ ...formData, [value]: e.target.value })}
                />
              </div>
            ))}
            {/* Password */}
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Lock /></span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-white/20 border border-white/30 rounded-lg py-2 pl-10 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 text-white font-semibold flex items-center justify-center gap-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? <Loader2 className="size-5 animate-spin" /> : "Create Account"}
            </button>
          </form>
          <p className="text-sm text-gray-300">
            Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Sign in</Link>
          </p>
        </div>
        {/* Right Section */}
        <AuthImagePattern title="Welcome to the Community" subtitle="Connect, share, and enjoy with others!" />
      </div>
    </div>
  );
};

export default SignUpPage;
