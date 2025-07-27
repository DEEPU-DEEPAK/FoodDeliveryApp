import { useState, useEffect } from "react";
import { FiMenu, FiX, FiPlusCircle, FiList, FiPackage } from "react-icons/fi";
import { GiChefToque } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Add Items", href: "/", icon: <FiPlusCircle /> },
    { name: "List Items", href: "/list", icon: <FiList /> },
    { name: "Orders", href: "/orders", icon: <FiPackage /> },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav className="bg-[#0a1a2f] border-b-8 border-cyan-700/40 shadow-lg sticky top-0 z-50 font-cinzel">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <GiChefToque className="text-4xl text-cyan-400" />
          <span className="text-2xl font-bold text-white tracking-wide">
            Admin Panel
          </span>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-cyan-300 text-2xl lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all 
                ${
                  isActive
                    ? "bg-cyan-800/30 border-cyan-400 text-cyan-200"
                    : "border-cyan-700/30 text-white hover:border-cyan-400 hover:bg-cyan-800/10"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden flex flex-col space-y-3 px-4 transition-all duration-300 ease-in-out overflow-hidden 
          ${menuOpen ? "max-h-screen opacity-100 mt-4 pb-4" : "max-h-0 opacity-0"}`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all 
              ${
                isActive
                  ? "bg-cyan-800/30 border-cyan-400 text-cyan-200"
                  : "border-cyan-700/30 text-white hover:border-cyan-400 hover:bg-cyan-800/10"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
