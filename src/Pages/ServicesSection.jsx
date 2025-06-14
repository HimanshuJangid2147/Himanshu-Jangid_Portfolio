import React, { useState, useEffect, useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { motion } from 'framer-motion';

// Animated number counter hook
const useCounter = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const startTime = Date.now();
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(start + (end - start) * easeOutQuart));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    };

    return [count, startAnimation];
};

const ServicesSection = () => {
    const [headerRef, headerIsVisible] = useOnScreen({ threshold: 0.1 });
    const [cardsRef, cardsIsVisible] = useOnScreen({ threshold: 0.1 });
    const [statsRef, statsIsVisible] = useOnScreen({ threshold: 0.3 });

    const [projectCount, startProjectCounter] = useCounter(25, 2000);
    const [clientCount, startClientCounter] = useCounter(15, 2500);
    const [experienceCount, startExperienceCounter] = useCounter(3, 1800);

    useEffect(() => {
        if (statsIsVisible) {
            startProjectCounter();
            startClientCounter();
            startExperienceCounter();
        }
    }, [statsIsVisible, startProjectCounter, startClientCounter, startExperienceCounter]);

    // Enhanced services data with working logos
    const services = [
        {
            name: 'MERN Stack Development',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
            desc: 'Full-stack applications with MongoDB, Express.js, React, and Node.js. Building scalable, modern web solutions.',
            color: 'from-cyan-400/20 to-blue-600/20',
            borderColor: 'border-cyan-400/30',
            hoverColor: 'hover:border-cyan-400/60',
            technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
            // projects: '12+ Projects',
            techIcons: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
                'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
            ]
        },
        {
            name: 'Laravel Development',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg',
            desc: 'Elegant PHP applications with Laravel framework. Crafting robust backends with beautiful, expressive syntax.',
            color: 'from-red-400/20 to-orange-600/20',
            borderColor: 'border-red-400/30',
            hoverColor: 'hover:border-red-400/60',
            technologies: ['PHP', 'Laravel', 'MySQL', 'Blade'],
            // projects: '8+ Projects',
            techIcons: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
                'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg',
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
            ]
        },
        {
            name: 'API Development',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            desc: 'RESTful APIs with JWT authentication, rate limiting, and comprehensive documentation. Secure and scalable.',
            color: 'from-purple-400/20 to-pink-600/20',
            borderColor: 'border-purple-400/30',
            hoverColor: 'hover:border-purple-400/60',
            technologies: ['REST', 'JWT', 'OAuth', 'Swagger'],
            // projects: '20+ APIs',
            techIcons: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
                'https://upload.wikimedia.org/wikipedia/commons/6/62/JWT_Logo.svg'
            ]
        },
        {
            name: 'Real-Time Applications',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
            desc: 'Live chat systems, notifications, and collaborative tools using WebSockets and Socket.IO for instant communication.',
            color: 'from-emerald-400/20 to-green-600/20',
            borderColor: 'border-emerald-400/30',
            hoverColor: 'hover:border-emerald-400/60',
            technologies: ['Socket.IO', 'WebSockets', 'Redis', 'WebRTC'],
            // projects: '5+ Systems',
            techIcons: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'
            ]
        }
    ];

    const stats = [
        { number: projectCount, label: 'Projects Completed', suffix: '+' },
        { number: clientCount, label: 'Happy Clients', suffix: '+' },
        { number: experienceCount, label: 'Years Experience', suffix: '+' },
    ];

    return (
        <section
            id="services"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 "></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-20 transition-all duration-1000 ${
                        headerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
                        <div className="relative">
                            <span className="w-3 h-3 bg-purple-400 rounded-full animate-ping absolute"></span>
                            <span className="w-3 h-3 bg-purple-400 rounded-full relative block"></span>
                        </div>
                        <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">Core Services</span>
                    </div>

                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight">
                        Solutions I
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"> Provide</span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
                        Leveraging cutting-edge technologies and modern development practices to build
                        <span className="text-purple-400 font-semibold"> scalable solutions</span> that solve real-world problems.
                    </p>
                </div>

                {/* Enhanced Services Grid */}
                <div
                    ref={cardsRef}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-500 ${
                        cardsIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {services.map((service, index) => (
                        <div
                            key={service.name}
                            className={`group relative bg-gradient-to-br ${service.color} backdrop-blur-sm border ${service.borderColor} ${service.hoverColor} rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2`}
                            style={{
                                animationDelay: `${index * 200}ms`
                            }}
                        >
                            {/* Animated border glow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>

                            {/* Service logo with animation */}
                            <div className="relative mb-8">
                                <div className="w-16 h-16 mb-4 transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                                    <img
                                        src={service.logoUrl}
                                        alt={`${service.name} logo`}
                                        className="w-full h-full object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <div className="hidden text-4xl text-purple-400">⚙️</div>
                                </div>
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                            </div>

                            {/* Service content */}
                            <h3 className="text-white font-bold text-2xl mb-4 group-hover:text-purple-300 transition-colors duration-300">
                                {service.name}
                            </h3>

                            <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                {service.desc}
                            </p>

                            {/* Technology icons */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {service.techIcons?.map((iconUrl, techIndex) => (
                                    <div
                                        key={techIndex}
                                        className="w-8 h-8 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-purple-500/30 transition-colors duration-300 flex items-center justify-center p-1.5"
                                    >
                                        <img
                                            src={iconUrl}
                                            alt={`Technology ${techIndex + 1}`}
                                            className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Technology tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {service.technologies.map((tech, techIndex) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm rounded-full border border-slate-700/50 group-hover:border-purple-500/30 transition-colors duration-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Project count */}
                            <div className="text-purple-400 font-semibold text-sm">
                                {service.projects}
                            </div>

                            {/* Hover effect arrow */}
                            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>

                            {/* Floating particles effect */}
                            <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float"></div>
                                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-float-delayed"></div>
                                <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-emerald-400 rounded-full animate-float-slow"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-10px) translateX(5px); }
                    50% { transform: translateY(-5px) translateX(-5px); }
                    75% { transform: translateY(-15px) translateX(10px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-15px) translateX(-10px); }
                    50% { transform: translateY(-8px) translateX(8px); }
                    75% { transform: translateY(-12px) translateX(-5px); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(15px); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite 2s;
                }
                .animate-float-slow {
                    animation: float-slow 10s ease-in-out infinite 4s;
                }
            `}</style>
        </section>
    );
};

export default ServicesSection;