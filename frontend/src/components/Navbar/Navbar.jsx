import React, { useEffect, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiBook,
  FiHome,
  FiKey,
  FiLogOut,
  FiPackage,
  FiPhone,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";
import { useCart } from "../../CartContext/CartContext.jsx";
import Login from "../Login/Login.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("loginData"))
  );

  useEffect(() => {
    setShowLoginModel(location.pathname === "/login");
    setIsAuthenticated(Boolean(localStorage.getItem("loginData")));
    setIsOpen(false); // Close mobile nav on route change
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    localStorage.setItem("loginData", JSON.stringify({ loggedIn: true }));
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setIsAuthenticated(false);
  };

  const navLinks = [
    { name: "Home", to: "/", icon: <FiHome /> },
    { name: "Menu", to: "/menu", icon: <FiBook /> },
    { name: "About", to: "/about", icon: <FiStar /> },
    { name: "Contact", to: "/contact", icon: <FiPhone /> },
    ...(isAuthenticated
      ? [{ name: "My Orders", to: "/myOrder", icon: <FiPackage /> }]
      : []),
  ];


  const renderDesktopAuthButtons = () =>
    isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="px-3 md:px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-900 rounded-2xl font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-[1.02] border-2 border-cyan-600/30 flex items-center space-x-2 shadow-md shadow-cyan-800/30 text-sm"
      >
        <FiLogOut className="text-base lg:text-lg" />
        <span className=" text-shadow">Logout</span>
      </button>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="px-3 md:px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-900 rounded-2xl font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-[1.02] border-2 border-cyan-600/30 flex items-center space-x-2 shadow-md shadow-cyan-800/30 text-sm"
      >
        <FiKey className="text-base lg:text-lg" />
        <span className=" text-shadow">Login</span>
      </button>
    );

  const renderMobileAuthButton = () =>
    isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="w-full px-4 py-3 bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-900 rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm"
      >
        <FiLogOut className="text-lg" />
        <span className="text-shadow">Logout</span>
      </button>
    ) : (
      <button
        onClick={() => {
          navigate("/login");
          setIsOpen(false);
        }}
        className="w-full px-4 py-3 bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-900 rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm"
      >
        <FiKey className="text-lg" />
        <span className="text-shadow">Login</span>
      </button>
    );

  return (
    <nav className="bg-[#0f172a] border-b-8 border-cyan-900/40 shadow-cyan-800/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] font-vibes group/nav overflow-x-hidden">
      {/* Top gradient bar */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4">
        <div className="h-[6px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px] shadow-cyan-500/30" />
        <div className="flex justify-between px-6">
          <IoFastFoodOutline className="text-cyan-500/40 -mt-4 -ml-2 rotate-45" size={32} />
          <IoFastFoodOutline className="text-cyan-500/40 -mt-4 -mr-2 rotate-45" size={32} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
          {/* Logo and Title */}
          <div className="flex-shrink-0 flex items-center space-x-2 group relative md:-translate-x-4 lg:-translate-x-6 ml-0 md:ml-2">
            <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300" />
            <IoFastFoodOutline className="text-3xl md:text-4xl lg:text-5xl text-cyan-400 transition-all group-hover:rotate-12 group-hover:text-cyan-300" />
            <div className="flex flex-col relative ml-2">
              <NavLink
                to="/"
                className="text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent font-monsieur tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] -translate-x-1 whitespace-nowrap"
              >
                BiryaniNest
              </NavLink>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `group px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base relative transition-all duration-300 
                  flex items-center hover:bg-cyan-800/30 rounded-3xl border-2 shadow-md shadow-cyan-800/30 
                  ${isActive
                    ? "border-cyan-500/50 bg-cyan-900/20 shadow-[inset_0_0_15px] shadow-cyan-500/20"
                    : "border-cyan-900/30 hover:border-cyan-500"
                  }`
                }
              >
                <span className="mr-2 text-cyan-400 group-hover:text-cyan-300 transition-all">{link.icon}</span>
                <span className="text-cyan-100 group-hover:text-cyan-300">{link.name}</span>
              </NavLink>
            ))}

            <NavLink
              to="/cart"
              className="relative p-2 text-cyan-100 border-2 border-cyan-900/30 rounded-xl transition-all duration-300 
             hover:border-cyan-500 hover:bg-cyan-800/30 shadow-md shadow-cyan-800/30 hover:shadow-cyan-500/30"
            >
              <FiShoppingCart className="text-lg" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </NavLink>


            {renderDesktopAuthButtons()}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center mr-2">
            <button
              className="text-cyan-400 hover:text-cyan-300 p-2 border-2 border-cyan-900/30 hover:border-cyan-500 rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="space-y-2">
                <span className={`block w-6 h-[2px] bg-current transition-all ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block w-6 h-[2px] bg-current ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-[2px] bg-current transition-all ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t-4 border-cyan-800/40 w-full shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex px-4 py-3 text-sm rounded-xl transition-all border-2 items-center gap-2 ${isActive
                    ? "bg-cyan-600/30 border-cyan-500/50"
                    : "border-cyan-900/30 hover:border-cyan-500 hover:bg-cyan-800/20"
                  }`
                }
              >
                <span className="text-cyan-400">{link.icon}</span>
                <span className="text-cyan-100">{link.name}</span>
              </NavLink>
            ))}

            <div className="pt-4 border-t-2 border-cyan-900/30 space-y-2">
              <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 text-center text-cyan-100 rounded-xl border-2 border-cyan-900/30 
                  flex items-center justify-center gap-2 text-sm relative hover:border-cyan-500 hover:bg-cyan-800/20 transition-all"
              >
                <FiShoppingCart className="text-lg" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderMobileAuthButton()}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl p-6 w-full max-w-[480px] relative border-4 border-cyan-700/30 shadow-[0_0_30px] shadow-cyan-500/30">
            <button
              onClick={() => navigate("/")}
              className="absolute top-2 right-4 text-cyan-300 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-900 bg-clip-text text-transparent text-center mb-4">
              BiryaniNest
            </h2>
            <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate("/")} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
