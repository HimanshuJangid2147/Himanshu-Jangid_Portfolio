import React, { useState, useEffect, useRef } from 'react';

// Custom Hook for intersection observer
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

const SkillsSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

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

    const technicalSkills = [
        { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-orange-500', icon: '⚡', category: 'Language' },
        { name: 'React', level: 85, color: 'from-blue-400 to-cyan-500', icon: '⚛️', category: 'Framework' },
        { name: 'Node.js', level: 80, color: 'from-green-400 to-emerald-500', icon: '🟢', category: 'Runtime' },
        { name: 'CSS/Tailwind', level: 88, color: 'from-purple-400 to-pink-500', icon: '🎨', category: 'Styling' },
        { name: 'MongoDB', level: 75, color: 'from-green-500 to-teal-500', icon: '🍃', category: 'Database' },
        { name: 'Git', level: 82, color: 'from-orange-500 to-red-500', icon: '📝', category: 'Version Control' }
    ];

    const quickFacts = [
        { icon: '🎯', label: 'Focus', value: 'Frontend Development', color: 'from-blue-500/20 to-cyan-500/20' },
        { icon: '📍', label: 'Location', value: 'Ajmer, India', color: 'from-purple-500/20 to-pink-500/20' },
        { icon: '👨‍💻', label: 'Experience', value: '3+ years', color: 'from-green-500/20 to-emerald-500/20' },
        { icon: '🚀', label: 'Projects', value: '50+', color: 'from-orange-500/20 to-yellow-500/20' }
    ];

    const services = [
        {
            name: 'Frontend Development',
            color: 'from-blue-500 to-cyan-500',
            icon: '🎨',
            desc: 'Modern React applications with responsive design',
            tools: ['React', 'JavaScript', 'Tailwind CSS']
        },
        {
            name: 'Backend Development',
            color: 'from-green-500 to-emerald-500',
            icon: '⚙️',
            desc: 'RESTful APIs and server-side solutions',
            tools: ['Node.js', 'Express', 'MongoDB']
        },
        {
            name: 'Mobile App Development',
            color: 'from-purple-500 to-pink-500',
            icon: '📱',
            desc: 'Cross-platform mobile applications',
            tools: ['React Native', 'Flutter', 'PWA']
        },
        {
            name: 'UI/UX Design',
            color: 'from-yellow-500 to-orange-500',
            icon: '✨',
            desc: 'User-centered design and prototyping',
            tools: ['Figma', 'Adobe XD', 'Sketch']
        },
        {
            name: 'Software Testing',
            color: 'from-red-500 to-rose-500',
            icon: '🧪',
            desc: 'Automated testing and quality assurance',
            tools: ['Jest', 'Cypress', 'React Testing Library']
        },
        {
            name: 'DevOps',
            color: 'from-indigo-500 to-violet-500',
            icon: '🚀',
            desc: 'Deployment and continuous integration',
            tools: ['Docker', 'AWS', 'GitHub Actions']
        }
    ];

    const softSkills = [
        { name: 'Problem Solving', icon: '🧩', level: 92 },
        { name: 'Team Collaboration', icon: '🤝', level: 88 },
        { name: 'Communication', icon: '💬', level: 85 },
        { name: 'Time Management', icon: '⏰', level: 90 }
    ];

    return (
        <section
            ref={sectionRef}
            id="skills"
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
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                            <span className="text-purple-400 text-sm font-medium">Skills & Expertise</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            Technical{' '}
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                Arsenal
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            A comprehensive toolkit of modern technologies and methodologies to bring your ideas to life
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">

                        {/* Left Column - Quick Facts & Soft Skills */}
                        <div className="xl:col-span-4 space-y-8">
                            {/* Quick Facts */}
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6">Quick Overview</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {quickFacts.map((fact, index) => (
                                        <div
                                            key={fact.label}
                                            className={`relative group bg-gradient-to-br ${fact.color} backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105`}
                                            style={{ animationDelay: `${index * 150}ms` }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="text-3xl">{fact.icon}</div>
                                                <div>
                                                    <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-medium">{fact.label}</div>
                                                    <div className="text-white font-semibold text-sm leading-tight">{fact.value}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Soft Skills */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
                                    <h4 className="text-2xl font-bold text-white mb-6">Soft Skills</h4>
                                    <div className="space-y-6">
                                        {softSkills.map((skill, index) => (
                                            <div key={skill.name} className="group">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-xl">{skill.icon}</span>
                                                        <span className="text-white font-medium text-sm">{skill.name}</span>
                                                    </div>
                                                    <span className="text-slate-400 font-medium text-sm">{skill.level}%</span>
                                                </div>
                                                <div className="relative w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: contentIsVisible ? `${skill.level}%` : '0%',
                                                            transitionDelay: `${index * 200}ms`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Technical Skills & Services */}
                        <div className="xl:col-span-8 space-y-12">

                            {/* Technical Skills */}
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-8">
                                    Technical{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                        Proficiency
                                    </span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {technicalSkills.map((skill, index) => (
                                        <div key={skill.name} className="group">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{skill.icon}</span>
                                                    <div>
                                                        <span className="text-white font-semibold block">{skill.name}</span>
                                                        <span className="text-slate-400 text-xs">{skill.category}</span>
                                                    </div>
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

                            {/* Services Grid */}
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-8">
                                    Services{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                        Offered
                                    </span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {services.map((service, index) => (
                                        <div
                                            key={service.name}
                                            className="relative group bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="flex items-start space-x-4 mb-4">
                                                <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-10`}>
                                                    {service.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="text-white font-bold text-lg mb-2">{service.name}</h5>
                                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{service.desc}</p>
                                                </div>
                                            </div>

                                            {/* Tools */}
                                            <div className="flex flex-wrap gap-2">
                                                {service.tools.map((tool, toolIndex) => (
                                                    <span
                                                        key={tool}
                                                        className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${service.color} bg-opacity-20 text-white border border-slate-600/30`}
                                                    >
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced CTA */}
                            <div className="pt-8">
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold text-white mb-4">Ready to start your project?</h4>
                                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                                        Let's discuss how these skills can help bring your vision to life
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a
                                            href="#contact"
                                            className="group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <span className="relative">Hire Me</span>
                                            <span className="relative transform group-hover:translate-x-1 transition-transform duration-300">💼</span>
                                        </a>
                                        <a
                                            href="#projects"
                                            className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-slate-600 text-white font-semibold rounded-2xl hover:border-purple-400 hover:text-purple-400 transition-all duration-300"
                                        >
                                            <span>See My Work</span>
                                            <span>🚀</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-20 right-20 w-4 h-4 bg-purple-500/20 rounded-full animate-ping opacity-30"></div>
            <div className="absolute bottom-32 left-20 w-6 h-6 bg-pink-500/20 rounded-lg rotate-45 animate-pulse opacity-20"></div>
            <div className="absolute top-1/2 right-10 w-8 h-8 bg-cyan-500/10 rounded-full animate-bounce opacity-30" style={{ animationDuration: '3s' }}></div>
        </section>
    );
};

export default SkillsSection;