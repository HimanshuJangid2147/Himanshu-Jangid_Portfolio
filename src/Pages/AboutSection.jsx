import React, { useState, useEffect, useRef } from 'react';

// Custom hook for intersection observer
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

const AboutSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    // Mouse tracking for subtle background effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = sectionRef.current?.getBoundingClientRect();
            if (rect) {
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePosition({ x, y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const skills = [
        { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-orange-500', icon: '⚡' },
        { name: 'React', level: 85, color: 'from-blue-400 to-cyan-500', icon: '⚛️' },
        { name: 'Node.js', level: 80, color: 'from-green-400 to-emerald-500', icon: '🟢' },
        { name: 'CSS/Tailwind', level: 88, color: 'from-purple-400 to-pink-500', icon: '🎨' }
    ];

    const quickFacts = [
        { icon: '🎯', label: 'Focus', value: 'Frontend Development', color: 'from-blue-500/20 to-cyan-500/20' },
        { icon: '📍', label: 'Location', value: 'Ajmer, India', color: 'from-purple-500/20 to-pink-500/20' },
        { icon: '💡', label: 'Experience', value: '3+ Years', color: 'from-green-500/20 to-emerald-500/20' },
        { icon: '🚀', label: 'Status', value: 'Available for Projects', color: 'from-orange-500/20 to-yellow-500/20' }
    ];

    const services = [
        { icon: '🎨', title: 'UI/UX Design', desc: 'Creating intuitive interfaces', color: 'from-purple-500/10 to-pink-500/10' },
        { icon: '⚡', title: 'Performance', desc: 'Optimizing for speed', color: 'from-yellow-500/10 to-orange-500/10' },
        { icon: '📱', title: 'Responsive', desc: 'Mobile-first approach', color: 'from-blue-500/10 to-cyan-500/10' },
        { icon: '🔧', title: 'Maintenance', desc: 'Clean, scalable code', color: 'from-green-500/10 to-emerald-500/10' }
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Modern background effects */}
            <div className="absolute inset-0">
                {/* Gradient mesh background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

                {/* Animated gradient orbs */}
                <div
                    className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl opacity-60 animate-pulse"
                    style={{
                        left: `${10 + mousePosition.x * 0.02}%`,
                        top: `${20 + mousePosition.y * 0.02}%`,
                        animationDuration: '4s'
                    }}
                />
                <div
                    className="absolute w-64 h-64 bg-gradient-to-l from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-40 animate-pulse"
                    style={{
                        right: `${15 + mousePosition.x * 0.01}%`,
                        bottom: `${25 + mousePosition.y * 0.01}%`,
                        animationDuration: '6s',
                        animationDelay: '2s'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={contentRef}
                    className={`transition-all duration-1000 ${
                        contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Modern Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            <span className="text-blue-400 text-sm font-medium">About Me</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            Building the{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Future
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Passionate developer focused on creating modern web experiences that combine beautiful design with exceptional performance
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">

                        {/* Left Column - Profile & Quick Facts */}
                        <div className="xl:col-span-5 space-y-8">
                            {/* Enhanced Profile Card */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl"></div>
                                        <img
                                            src="/me.JPG"
                                            alt="Himanshu Jangid - Frontend Developer"
                                            className="relative rounded-2xl w-full h-auto object-cover aspect-[4/5]"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://placehold.co/400x500/1e293b/64748b?text=Himanshu\nJangid';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent rounded-2xl"></div>
                                    </div>

                                    {/* Name & Title */}
                                    <div className="mt-6 text-center">
                                        <h3 className="text-2xl font-bold text-white mb-2">Himanshu Jangid</h3>
                                        <p className="text-blue-400 font-medium mb-4">Frontend Developer</p>
                                        <div className="flex justify-center space-x-4">
                                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-slate-300 text-sm">Available for projects</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modern Quick Facts */}
                            <div className="grid grid-cols-2 gap-4">
                                {quickFacts.map((fact, index) => (
                                    <div
                                        key={fact.label}
                                        className={`relative group bg-gradient-to-br ${fact.color} backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105`}
                                        style={{ animationDelay: `${index * 150}ms` }}
                                    >
                                        <div className="text-3xl mb-3">{fact.icon}</div>
                                        <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-medium">{fact.label}</div>
                                        <div className="text-white font-semibold text-sm leading-tight">{fact.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="xl:col-span-7 space-y-12">

                            {/* Introduction */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold text-white">
                                    Creating digital experiences that{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                        inspire
                                    </span>
                                </h3>
                                <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
                                    <p>
                                        I'm a passionate frontend developer who believes in the power of clean code and beautiful design.
                                        My journey in web development is driven by curiosity and a constant desire to learn and grow.
                                    </p>
                                    <p>
                                        With expertise in modern JavaScript frameworks and a keen eye for detail, I craft user experiences
                                        that are not only visually appealing but also highly functional and accessible.
                                    </p>
                                </div>
                            </div>

                            {/* Enhanced Skills */}
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-8">Technical Expertise</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {skills.map((skill, index) => (
                                        <div key={skill.name} className="group">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{skill.icon}</span>
                                                    <span className="text-white font-semibold">{skill.name}</span>
                                                </div>
                                                <span className="text-slate-400 font-medium">{skill.level}%</span>
                                            </div>
                                            <div className="relative w-full bg-slate-700/30 rounded-full h-3 overflow-hidden">
                                                <div className="absolute inset-0 bg-slate-700/50 rounded-full"></div>
                                                <div
                                                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                                                    style={{
                                                        width: contentIsVisible ? `${skill.level}%` : '0%',
                                                        transitionDelay: `${index * 200}ms`
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Modern Services Grid */}
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-8">What I Specialize In</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {services.map((item, index) => (
                                        <div
                                            key={item.title}
                                            className={`relative group bg-gradient-to-br ${item.color} backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50`}
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="text-3xl mb-4">{item.icon}</div>
                                            <div className="text-white font-bold text-lg mb-2">{item.title}</div>
                                            <div className="text-slate-300 text-sm leading-relaxed">{item.desc}</div>
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced CTA */}
                            <div className="pt-8">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="#contact"
                                        className="group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative">Let's Work Together</span>
                                        <span className="relative transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </a>
                                    <a
                                        href="#projects"
                                        className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-slate-600 text-white font-semibold rounded-2xl hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                                    >
                                        <span>View My Work</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-20 right-20 w-4 h-4 bg-blue-500/20 rounded-full animate-ping opacity-30"></div>
            <div className="absolute bottom-32 left-20 w-6 h-6 bg-purple-500/20 rounded-lg rotate-45 animate-pulse opacity-20"></div>
            <div className="absolute top-1/2 right-10 w-8 h-8 bg-cyan-500/10 rounded-full animate-bounce opacity-30" style={{ animationDuration: '3s' }}></div>
        </section>
    );
};

export default AboutSection;