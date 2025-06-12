import React, { useState, useEffect, useRef } from 'react';

// Enhanced TypeAnimation component with more features
const TypeAnimation = ({ sequence, speed, className, wrapper: Wrapper = 'span' }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const texts = sequence.filter((item, index) => index % 2 === 0);
        const delays = sequence.filter((item, index) => index % 2 === 1);
        const currentText = texts[Math.floor(currentIndex / 2) % texts.length];
        const currentDelay = delays[Math.floor(currentIndex / 2) % delays.length];

        if (isPaused) {
            const pauseTimeout = setTimeout(() => setIsPaused(false), currentDelay);
            return () => clearTimeout(pauseTimeout);
        }

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    setIsPaused(true);
                    setIsDeleting(true);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex(currentIndex + 1);
                }
            }
        }, isDeleting ? 50 : speed || 100);

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isDeleting, isPaused, sequence, speed]);

    return (
        <Wrapper className={className}>
            {displayText}
            <span className="animate-pulse text-blue-400">|</span>
        </Wrapper>
    );
};

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentTime, setCurrentTime] = useState(new Date());
    const cubeRef = useRef(null);
    const heroRef = useRef(null);

    // Tech stack with more detailed information
    const techStack = [
        { name: 'JavaScript', icon: 'JS', color: 'from-yellow-400 to-yellow-600', level: 95 },
        { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-blue-700', level: 90 },
        { name: 'React', icon: '⚛', color: 'from-cyan-400 to-cyan-600', level: 95 },
        { name: 'Node.js', icon: 'N', color: 'from-green-400 to-green-600', level: 85 },
        { name: 'Python', icon: 'PY', color: 'from-blue-400 to-yellow-400', level: 80 },
        { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-cyan-500', level: 75 },
        { name: 'AWS', icon: '☁', color: 'from-orange-400 to-yellow-500', level: 70 },
        { name: 'MongoDB', icon: 'DB', color: 'from-green-500 to-green-700', level: 85 }
    ];

    const achievements = [
        { number: '50+', label: 'Projects Completed', icon: '🚀' },
        { number: '3+', label: 'Years Experience', icon: '💼' },
        { number: '15+', label: 'Happy Clients', icon: '😊' },
        { number: '99%', label: 'Client Satisfaction', icon: '⭐' }
    ];

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            const rect = heroRef.current?.getBoundingClientRect();
            if (rect) {
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePosition({ x, y });

                if (cubeRef.current) {
                    const rotateX = -(y - 50) * 0.5;
                    const rotateY = (x - 50) * 0.5;
                    cubeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${Math.sin(Date.now() * 0.001) * 5}deg)`;
                }
            }
        };

        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(timeInterval);
        };
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-[6rem]">
            {/* Code Matrix Background */}
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0">
                {/* Interactive 3D Cube with enhanced effects */}
                <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 opacity-20" style={{ perspective: '1000px' }}>
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 opacity-20" style={{ perspective: '1000px' }}>
                        <div ref={cubeRef} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}>
                            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((side, i) => (
                                <div
                                    key={side}
                                    className="absolute w-48 h-48 border border-blue-500/30 bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm flex items-center justify-center"
                                    style={{
                                        transform: `rotateY(${i * 90}deg) translateZ(96px)`,
                                        background: i % 2 === 0 ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))' : 'linear-gradient(-45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))'
                                    }}
                                >
                                    <span className="text-2xl font-mono text-blue-400/50">{['{ }', '< >', '[ ]', '( )', '//', '**'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Animated grid with parallax effect */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full animate-pulse"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                            animationDuration: '10s',
                            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                        }}
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto text-center">
                {/* Status bar */}
                <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="inline-flex items-center space-x-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-green-400 font-mono">Available for hire</span>
                        </div>
                        <div className="w-px h-4 bg-slate-600"></div>
                        <div className="text-sm text-slate-400 font-mono">
                            {currentTime.toLocaleTimeString()} IST
                        </div>
                    </div>
                </div>

                {/* Enhanced greeting */}
                <div className={`mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <p className="text-base text-slate-400 font-medium tracking-wider">
                        👋 Hello, I'm
                    </p>
                </div>

                {/* Enhanced name with glitch effect */}
                <div className={`transition-all duration-1000 delay-300 group ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight relative">
                        <span className="relative inline-block">
                            Himanshu Jangid
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        </span>
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </h1>
                </div>

                {/* Enhanced role with typing animation */}
                <div className={`mb-8 h-16 sm:h-20 flex items-center justify-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
                        <TypeAnimation
                            sequence={[
                                'Full-Stack Developer', 1000,
                                'Frontend Architect', 1000,
                                'Backend Engineer', 1000,
                                'Problem Solver', 1000,
                                'Code Craftsman', 1000,
                            ]}
                            speed={60}
                            className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold"
                        />
                    </h2>
                </div>

                {/* Enhanced description */}
                <div className={`mb-12 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-xl sm:text-2xl text-slate-300 mb-6 max-w-4xl mx-auto leading-relaxed">
                        I architect and build <span className="text-blue-400 font-semibold">scalable web applications</span> from
                        concept to deployment, specializing in modern JavaScript ecosystems and cloud technologies.
                    </p>

                    {/* Achievement stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
                        {achievements.map((achievement, index) => (
                            <div
                                key={achievement.label}
                                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:bg-slate-700/40 transition-all duration-300 transform hover:scale-105"
                                style={{ animationDelay: `${800 + index * 100}ms` }}
                            >
                                <div className="text-3xl mb-2">{achievement.icon}</div>
                                <div className="text-2xl font-bold text-white mb-1">{achievement.number}</div>
                                <div className="text-sm text-slate-400">{achievement.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <a href="#projects" className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden">
                        <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                            <span>View My Work</span>
                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                        </span>
                    </a>

                    <a href="#contact" className="group relative w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600 text-slate-300 font-semibold rounded-2xl hover:border-slate-400 hover:bg-slate-700/50 hover:text-white transition-all duration-300 text-center transform hover:scale-105 overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                            <span>Let's Connect</span>
                            <span className="transform group-hover:rotate-12 transition-transform duration-300">📧</span>
                        </span>
                    </a>

                    <a href="/resume.pdf" className="group relative w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-dashed border-slate-600 text-slate-300 font-semibold rounded-2xl hover:border-purple-400 hover:text-purple-300 transition-all duration-300 text-center transform hover:scale-105">
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                            <span>Download CV</span>
                            <span className="transform group-hover:translate-y-1 transition-transform duration-300">📄</span>
                        </span>
                    </a>
                </div>

                {/* Enhanced Tech Stack with skill levels */}
                <div className={`transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="mb-8">
                        <h3 className="text-slate-400 text-sm font-medium tracking-wider mb-6">TECH STACK & EXPERTISE</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
                            {techStack.map((tech, index) => (
                                <div
                                    key={tech.name}
                                    className="group relative"
                                    style={{ animationDelay: `${1200 + index * 100}ms` }}
                                >
                                    {/* Tech icon container */}
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex items-center justify-center group-hover:bg-slate-700/60 group-hover:border-slate-600 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2 shadow-lg group-hover:shadow-xl">
                                            <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors duration-300">
                                                {tech.icon}
                                            </span>

                                            {/* Skill level indicator */}
                                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                                <div className="w-8 h-1 bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${tech.color} transition-all duration-1000 delay-${1400 + index * 100}`}
                                                        style={{ width: `${tech.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover tooltip */}
                                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                            <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-medium whitespace-nowrap shadow-xl">
                                                {tech.name} - {tech.level}%
                                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech name */}
                                    <div className="mt-3 text-center">
                                        <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                                            {tech.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <div className="flex items-center space-x-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 text-sm text-slate-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Open to remote work</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 text-sm text-slate-400">
                            <span>🌍</span>
                            <span>Based in Ajmer, India</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 text-sm text-slate-400">
                            <span>⏰</span>
                            <span>Response time: &lt; 4 hours</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced floating action elements */}
            <div className="absolute top-10 right-10 animate-spin opacity-20 hover:opacity-40 transition-opacity duration-300" style={{ animationDuration: '20s' }}>
                <div className="w-20 h-20 border-2 border-blue-400 rounded-full border-dashed flex items-center justify-center">
                    <span className="text-blue-400 text-sm font-mono">API</span>
                </div>
            </div>

            <div className="absolute bottom-10 left-10 animate-spin opacity-20 hover:opacity-40 transition-opacity duration-300" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="w-16 h-16 border-2 border-cyan-400 rounded-full border-dotted flex items-center justify-center">
                    <span className="text-cyan-400 text-xs font-mono">DB</span>
                </div>
            </div>

            <div className="absolute top-1/2 right-10 animate-pulse opacity-20" style={{ animationDuration: '8s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg rotate-45 flex items-center justify-center">
                    <span className="text-purple-300 text-xs font-mono -rotate-45">UI</span>
                </div>
            </div>

            {/* Social proof badges */}
            <div className="absolute bottom-20 right-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-3 py-1 text-xs text-slate-400">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>4.9★ Client Rating</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-3 py-1 text-xs text-slate-400">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>GitHub: 100+ commits</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;