import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, MessagesSquare, User, Globe } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { Link } from "react-router-dom"; // You're using <a> tag but imported Link
import { toast, Toaster } from "react-hot-toast";
const loginPage = () => {
  const [showpassword,setShowpassword]=useState(false);
  const [formData,setFormData] = useState({
    email : "",
    assword :""
  });
  const {login ,isLoggingIn} = useAuth();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(e);
    
    login(formData);
  };  

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="min-h-screen grid lg:grid-cols-2">
        <Toaster position="top-center" reverseOrder={false} />
        
        {/* Left side */}
        <div className="flex flex-col justify-center bg- items-center p-6 sm:p-12 transition-colors duration-300">
          <div className="w-full max-w-md space-y-8">
            
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  <MessagesSquare className="w-6 h-6 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold mt-2 transition-colors duration-300">
                  Create Account
                </h1>
                <p className="transition-colors duration-300">
                  Get started with your free account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 ">
              {/* Email Field */}
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 transition-colors duration-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isLoggingIn}
                  />
                </div>
              </div>

              {/* password Field */}
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 transition-colors duration-300">
                  password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 transition-colors duration-300" />
                  </div>
                  <input
                    type={showpassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoggingIn}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
                    onClick={() => setShowpassword(!showpassword)}
                    disabled={isLoggingIn}
                  >
                    {showpassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                    Login...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center ">
              <p className="transition-colors duration-300">
                Don't have an Account?{" "}
                <Link to="/signUp" className="text-green-500 hover:text-green-600 font-medium transition-colors duration-300">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center justify-center transition-colors duration-300">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300">
              <Globe className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2 transition-colors duration-300">
              Join our community
            </h2>
            <p className="transition-colors duration-300">
              Connect with friends, share moments, and stay in touch with your loved ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage
