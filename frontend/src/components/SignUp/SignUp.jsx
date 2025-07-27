import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const url = "https://fooddeliveryapp-backend-d6ry.onrender.com";

const SignUp = () => {
  const [showToast, setShowToast] = useState({
    visible: false,
    message: "",
    icon: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (showToast.visible && showToast.message === "Account Created Successfully!") {
      const timer = setTimeout(() => {
        setShowToast({ visible: false, message: "", icon: null });
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, navigate]);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/register`, formData);
      if (res.status >= 200 && res.status < 300 && res.data.success) {
        setShowToast({
          visible: true,
          message: "Account Created Successfully! Redirecting to login...",
          icon: <FaCheckCircle />,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return;
      }
      throw new Error(res.data.message || "Sign Up Failed");
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "An error occurred";
      setShowToast({
        visible: true,
        message: msg,
        icon: <FaExclamationCircle />,
      });
    }
  };


  const AwesomeToast = ({ message, icon }) => (
    <div className="animate-slide-in fixed bottom-6 right-6 flex items-center bg-gradient-to-r from-cyan-400 to-cyan-600 px-6 py-4 rounded-lg shadow-lg border-2 border-cyan-300/20">
      <span className="text-2xl mr-3 text-slate-900">{icon}</span>
      <span className="font-semibold text-slate-900">{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      {showToast.visible && (
        <AwesomeToast message={showToast.message} icon={showToast.icon} />
      )}

      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl shadow-xl border-4 border-cyan-700/30 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-4 rounded-l-2xl bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-cyan-600 transition-all duration-200 hover:scale-[1.02]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-4 rounded-l-2xl bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-cyan-600 transition-all duration-200 hover:scale-[1.02]"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-l-2xl bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-cyan-600 transition-all duration-200 hover:scale-[1.02]"
              required
            />
            <button
              className="absolute inset-y-0 right-4 flex items-center text-cyan-400 hover:text-cyan-300 transition-all transform hover:scale-125"
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 font-bold rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="group inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <FaArrowLeft className="mr-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            <span className="transform group-hover:-translate-x-2 transition-all duration-300">
              Already have an account? Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
