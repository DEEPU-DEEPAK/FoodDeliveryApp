import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { socialIcons } from "../../assets/dummydata";

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Menu', link: '/menu' },
  { name: 'About Us', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for choosing us! We'll send updates to ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-cyan-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold font-sacramento text-cyan-300 animate-pulse">
              BiryaniNest
            </h2>
            <p className="text-cyan-100/90 text-sm font-sacramento italic">
              Taste the essence of artistry in every meal.
              We deliver not just food—but an experience worth remembering.
            </p>

            <form onSubmit={handleSubmit} className="relative mt-4 group">
              <div className="flex items-center gap-2 mb-2">
                <FaRegEnvelope className="text-cyan-400 animate-pulse" />
                <span className="font-bold text-cyan-300">Get Exclusive Offer</span>
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border-2 border-cyan-400/30 focus:outline-none
                    focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 placeholder-cyan-200/60
                    pr-24 text-white"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-gradient-to-br from-cyan-300 via-cyan-500 to-sky-600
                  text-white px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md hover:shadow-cyan-500/40
                  transition-all duration-300"
                >
                  <span className="font-bold text-sm tracking-wide transition-transform group-hover:-translate-x-1">
                    Join Now
                  </span>
                  <BiChevronRight />
                </button>
              </div>
            </form>
          </div>

          {/* CENTER COLUMN - Navigation */}
          <div className="flex justify-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-3 font-merriweather italic text-cyan-200">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navItems.map(item => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="flex items-center hover:text-cyan-400 transition-all group font-lora hover:pl-2"
                    >
                      <BiChevronRight className="mr-2 text-cyan-400 group-hover:animate-bounce" />
                      <span className="hover:italic hover:font-semibold">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN - Social Icons */}
          <div className="flex justify-center md:justify-end">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-3 font-merriweather italic text-cyan-200">
                Connect
              </h3>
              <div className="flex space-x-4">
                {socialIcons.map(({ icon: Icon, link, color, label }, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl bg-cyan-400/10 p-3 rounded-full hover:bg-cyan-400/20 hover:scale-110
                    transition-all duration-300 relative group"
                    style={{ color }}
                  >
                    <Icon className="hover:scale-125 transition-transform" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-cyan-300 text-black px-2 py-1
                      rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-cyan-800 pt-8 mt-8 text-center">
          <p className="text-cyan-400 text-lg mb-2 font-playfair">
            &copy; 2025 BiryaniNest. All Rights Reserved.
          </p>
          <span className="text-cyan-100/80">Developed By Deepak D</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
