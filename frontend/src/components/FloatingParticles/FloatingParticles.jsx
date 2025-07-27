const FloatingParticles = ({ count = 40 }) => {
  const particles = Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    size: Math.random() * 4 + 2, // 2px to 6px
    delay: Math.random() * 3,    // Random animation delay
    animation: Math.random() > 0.5 ? 'floatUpDown' : 'swayLeftRight'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400/40 blur-[1px]"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `${p.animation} ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
