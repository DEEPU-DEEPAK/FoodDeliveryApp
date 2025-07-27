import { easeInOut, motion } from "framer-motion";
import { features, stats, teamMembers } from "../../assets/dummydata";
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';
import { useState } from "react";

const About = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  const socialIcons = {
    twitter: <FaXTwitter className="w-6 h-6" />,
    instagram: <FaInstagram className="w-6 h-6" />,
    facebook: <FaFacebookF className="w-6 h-6" />,
    linkedin: <FaLinkedinIn className="w-6 h-6" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#102336] to-[#0a1a2f] text-cyan-50 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light bg-cyan-400/10 pointer-events-none" />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 text-center relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500"
          >
            Culinary Express
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-cyan-100/80 font-cinzel"
          >
            Crafting unforgettable dining experiences delivered to your doorstep.
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group p-6 bg-[#142c47]/50 rounded-3xl shadow-xl border border-cyan-400/20 overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-600/30 to-cyan-400/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative bg-[#19324d]/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a2f] via-transparent to-transparent" />
                  </div>
                  <div className="p-8">
                    <motion.div className="text-cyan-400 mb-4 inline-block" whileHover={{ rotate: 15 }}>
                      <Icon className="w-12 h-12 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-cyan-100">{f.title}</h3>
                    <p className="text-cyan-100/80">{f.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#0a1a2f] to-[#112d44]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, type: "spring" }}
                className="relative group h-48"
                onHoverStart={() => setHoveredStat(i)}
                onHoverEnd={() => setHoveredStat(null)}
                animate={{
                  scale: hoveredStat === i ? 1.05 : 1,
                  zIndex: hoveredStat === i ? 10 : 1
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    y: [0, -15, 0],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: easeInOut,
                      delay: i * 0.3
                    }
                  }}
                >
                  <div className="relative h-full bg-[#18314f]/40 backdrop-blur-lg rounded-xl border-2 border-cyan-400/30 p-6 overflow-hidden transition-all duration-300">
                    <motion.div className="absolute inset-0 z-0" />
                    <div className="absolute inset-0 rounded-xl shadow-lg shadow-cyan-500/10" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                      <motion.div
                        className="mb-4 p-3 rounded-full bg-cyan-800/30 border border-cyan-500/30"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Icon className="h-8 w-8 text-cyan-400" />
                      </motion.div>
                      <div className="text-4xl font-bold mb-1 bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 text-transparent">
                        {s.number}
                      </div>
                      <motion.div
                        className="text-sm uppercase tracking-widest font-medium text-cyan-100/80"
                        animate={{
                          letterSpacing: hoveredStat === i ? '0.15em' : '0.1em',
                          textShadow: hoveredStat === i ? '0 0 8px rgba(34,211,238,0.4)' : 'none'
                        }}
                      >
                        {s.label}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif sm:text-5xl md:text-6xl font-bold text-center mb-12 text-cyan-100"
          >
            Meet Our <span className="text-cyan-400">Culinary Artists</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="relative h-full bg-[#18314f]/90 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-400 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                  {/* Image */}
                  <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden">
                    <motion.img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-8 text-center flex flex-col min-h-[calc(100%-24rem)]">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-cyan-100 mb-2">{m.name}</h3>
                      <p className="text-sm text-cyan-300 font-medium font-cursive">{m.role}</p>
                    </div>
                    <p className="text-cyan-100/80 text-lg font-cursive flex-grow">{m.bio}</p>

                    {/* Social */}
                    <motion.div className="flex justify-center gap-4 pt-6">
                      {Object.entries(m.social).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:scale-110"
                        >
                          {socialIcons[platform]}
                        </a>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
