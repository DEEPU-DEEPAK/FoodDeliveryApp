import { Link } from "react-router-dom";
import { aboutfeature } from "../../assets/dummydata";
import { FaInfoCircle } from "react-icons/fa";
import AboutImage from "../../assets/AboutImage.png";
import FloatingParticles from "../FloatingParticles/FloatingParticles";
import "./AboutHome.css";

const AboutHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">

      {/* Glowing Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl mix-blend-soft-light" />
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl mix-blend-soft-light" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">

        {/* Left Section - Text + Features + CTA */}
        <div className="flex-1 flex flex-col gap-16">
          {/* Text Section */}
          <div className="text-center lg:text-left space-y-8 max-w-4xl mx-auto lg:mx-0">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="block font-cursive bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Crafting Memories Through Flavors
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-cyan-100 font-light">
              Discover the perfect blend of tradition and innovation, where every bite tells a flavorful story.
            </p>
            <p className="text-base sm:text-lg opacity-90 leading-relaxed font-serif italic border-l-4 bg-cyan-500/10 pl-6 py-4 bg-gradient-to-r from-white/5 to-transparent">
              At <strong>BiryaniNest</strong>, we believe food is more than a meal—it's a memory. Our chefs bring heritage recipes to life using
              fresh, local ingredients and bold spices. Whether it's your first taste or your favorite dish, every experience is crafted with love and care.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0">
            {aboutfeature.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-3 sm:gap-4 transition-transform duration-300 p-4 sm:p-5 hover:translate-x-2 group bg-slate-800/40 rounded-2xl shadow-xl hover:shadow-cyan-500/20"
              >
                <div
                  className={`p-3 sm:p-4 rounded-full bg-gradient-to-br ${item.color.replace('cyan', 'cyan').replace('orange', 'blue')} transition-transform duration-300 group-hover:scale-110 shadow-md shadow-cyan-400/20`}
                >
                  <item.icon className="text-2xl sm:text-3xl text-white animate-pulse drop-shadow-[0_2px_2px_rgba(0,255,255,0.4)]" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold font-cursive text-cyan-200 group-hover:text-cyan-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="opacity-90 text-sm sm:text-base text-cyan-100">{item.text}</p>
                </div>
              </div>
            ))}
          </div>



          {/* Call to Action */}
          <div className="flex justify-center">
            <Link
              to="/about"
              aria-label="Learn more about BiryaniNest"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg
              hover:scale-105 transition-transform duration-300 flex items-center gap-3 shadow-xl hover:shadow-cyan-500/30
              group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaInfoCircle className="text-xl animate-pulse" />
              <span className="font-cursive">Learn More About Us</span>
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full max-w-xs md:max-w-md lg:max-w-none lg:w-[420px] relative group transform hover:scale-[1.01] transition-all duration-500">
          <div className="relative rounded-[4rem] overflow-hidden border-4 border-slate-800/30 hover:border-cyan-600/40 transition duration-500 shadow-2xl shadow-black/50 z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-transparent to-blue-600/15" />
            <img
              src={AboutImage}
              alt="Chefs at BiryaniNest preparing traditional food"
              loading="lazy"
              className="w-full h-auto object-cover aspect-[3/4] transform -rotate-1 hover:rotate-0 transition-all duration-500"
            />
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-slate-900/30 blur-3xl z-0" />
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl" />
        </div>
      </div>

      {/* Floating particles */}
      <FloatingParticles />
    </div>
  );
};

export default AboutHome;
