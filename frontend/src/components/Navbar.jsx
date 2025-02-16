import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Settings, LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-b border-white/10 fixed w-full top-0 z-20 backdrop-blur-md bg-opacity-90 h-12 shadow-lg">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Left Section - Logo & Name */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-all">
            <div className="size-8 rounded-full bg-white/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">ChatSphere</h1>
          </Link>
        </div>

        {/* Right Section - Navigation */}
        <div className="flex items-center gap-3">
          <Link to="/settings" className="flex items-center gap-1 text-white px-2 py-1 rounded-md hover:bg-white/10 transition text-sm">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="flex items-center gap-1 text-white px-2 py-1 rounded-md hover:bg-white/10 transition text-sm">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button onClick={logout} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition text-sm">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
