import { useState } from "react";
import { FaDownload, FaPlay, FaSearch, FaTimes } from "react-icons/fa";
import { bannerAssets } from "../../assets/dummydata";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const { bannerImage, orbitImages, video } = bannerAssets;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-slate-700/10" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Left Section */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif drop-shadow-md">
              We're here <br />
              <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text">
                for food delivery
              </span>
            </h1>

            <p className="text-lg md:text-xl font-playfair italic text-slate-100 opacity-90 max-w-xl mx-auto md:mx-0">
              Experience delicious meals delivered at your doorstep — fast, fresh, and full of flavor.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto md:mx-0">
              <div className="flex items-center bg-slate-800/30 rounded-xl border-2 border-cyan-500/30 shadow-2xl hover:bg-cyan-400/20 transition-all duration-300">
                <div className="pl-6 pr-3 py-4">
                  <FaSearch className="text-xl text-cyan-400/80" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your favorite..."
                  className="w-full py-4 pr-6 bg-transparent outline-none placeholder-slate-200/70 text-lg font-medium tracking-wide text-white"
                />
                <button
                  type="submit"
                  className="mr-4 px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg font-semibold text-slate-900 hover:from-cyan-300 hover:to-cyan-200 transition-all shadow-lg"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
              <button className="group flex items-center gap-3 bg-slate-700/40 hover:bg-slate-600 px-6 py-3 rounded-xl border-2 border-slate-500 hover:border-cyan-300 backdrop-blur-sm transition-all duration-300">
                <FaDownload className="text-xl text-cyan-400 group-hover:animate-bounce" />
                <span className="text-lg text-slate-100">Download App</span>
              </button>

              <button
                onClick={() => setShowVideo(true)}
                className="group flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 px-6 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-cyan-300/30"
              >
                <FaPlay className="text-xl text-slate-900" />
                <span className="text-lg text-slate-900 font-semibold">Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 relative mt-8 md:mt-0 min-h-[300px] sm:min-h-[400px]">
            <div className="relative w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] mx-auto rounded-full p-1 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-2xl z-20">
              <img src={bannerImage} alt="Banner" className="rounded-full border-4 sm:border-8 border-slate-900/50 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-slate-900/40 mix-blend-multiply" />

              {/* Orbiting Images */}
              {orbitImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${idx === 0 ? 'orbit' : `orbit-delay-${idx * 5}`}`}
                >
                  <img src={img} alt={`Orbit ${idx + 1}`} className="w-full h-full rounded-full border border-cyan-500/30 shadow-lg bg-slate-900/20 p-1 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-lg p-4">
            <button onClick={() => setShowVideo(false)} className="absolute top-6 right-6 text-cyan-400 hover:text-cyan-300 text-3xl">
              <FaTimes />
            </button>
            <div className="w-full max-w-4xl">
              <video controls autoPlay className="w-full aspect-video rounded-lg shadow-2xl">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
