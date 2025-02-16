import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="bg-gradient">
      <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 lg:grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center px-6 sm:px-12 py-8">
          <div className="w-full max-w-md space-y-8 text-white">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <MessageSquare className="size-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold mt-2">Create Account</h1>
                <p className="text-sm text-white/80">
                  Get started with your free account
                </p>
              </div>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-white">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-white/60" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 rounded-xl bg-white/20 border-white/40 text-white placeholder-white/70"
                    placeholder="Enter Your Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-white">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-white/60" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 rounded-xl bg-white/20 border-white/40 text-white placeholder-white/70"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-white">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-white/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 rounded-xl bg-white/20 border-white/40 text-white placeholder-white/70"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-white/60" />
                    ) : (
                      <Eye className="size-5 text-white/60" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl py-3 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white border-white/40"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-white/80">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default SignUpPage;
