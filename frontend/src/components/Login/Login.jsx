import React, { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaUserPlus,
} from 'react-icons/fa';
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:4000'

const Login = ({ onLoginSuccess, onClose }) => {
  const [showToast, setShowToast] = useState({ visible: false, message: "", isError: false });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, {
        email: formData.email,
        password: formData.password,
      });
      console.log("Axios Response", res);

      if (res.status === 200 && res.data.success && res.data.token) {
        localStorage.setItem('authToken', res.data.token);

        formData.rememberMe
          ? localStorage.setItem('loginData', JSON.stringify(formData))
          : localStorage.removeItem('loginData');

        setShowToast({ visible: true, message: "Login Successful!", isError: false });

        setTimeout(() => {
          setShowToast({ visible: false, message: "", isError: false });
          onLoginSuccess(res.data.token);
        }, 1500);
      } else {
        console.warn("Unexpected response structure", res.data);
        throw new Error(res.data.message || "Login Failed");
      }
    } catch (err) {
      console.error("Login Error", err);
      if (err.response) {
        console.error("Response Data:", err.response.status, err.response.data);
      }

      const msg = err.response?.data?.message || err.message || "An error occurred";
      setShowToast({ visible: true, message: msg, isError: true });

      setTimeout(() => {
        setShowToast({ visible: false, message: "", isError: false });

      }, 2000);
    }
  };


  const handleChange = ({ target: { name, value, type, checked } }) =>
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 transform 
          ${showToast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0' }`}>
        <div className={`px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm ${showToast.isError ? 'bg-red-600 text-white':
          'bg-green-400 text-white' }`}>
            
            </div>    
        <div className="bg-green-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm">
          <FaCheckCircle className="flex-shrink-0" />
          {/* <span>Login Successful!</span> */}
          <span>{showToast.message}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* email Input */}
        <div className="relative">
          <FaUser className={`${iconClass} text-cyan-400`} />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputBase} bg-slate-800 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-3`}
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <FaUser className={`${iconClass} text-cyan-400`} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`${inputBase} bg-slate-800 text-slate-100 placeholder-slate-400 pl-10 pr-10 py-3`}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-all"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <label className="flex items-center text-slate-100">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-cyan-500 bg-slate-900 border-cyan-500 rounded focus:ring-cyan-500"
            />
            <span className="ml-2">Remember Me</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          Sign In <FaArrowRight />
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center">
        <Link
          to="/signup"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-cyan-100 hover:text-black transition-colors">
          <FaUserPlus /> Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
