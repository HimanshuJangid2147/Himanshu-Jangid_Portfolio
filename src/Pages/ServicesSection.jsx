import React, { useState, useEffect, useRef } from 'react';

// Custom hook for intersection observer (remains the same)
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

const ServicesSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const sectionRef = useRef(null);

    // Services data from your resume
    const services = [
        { name: 'MERN Stack Development', icon: '📚', desc: 'Building full-stack apps with MongoDB, Express, React, & Node.', color: 'from-cyan-500/10 to-blue-500/10' },
        { name: 'Laravel Development', icon: '🐘', desc: 'Crafting powerful applications with the elegance of PHP and Laravel.', color: 'from-red-500/10 to-orange-500/10' },
        { name: 'API Development', icon: '⚙️', desc: 'Designing and implementing secure, scalable RESTful APIs with JWT.', color: 'from-purple-500/10 to-pink-500/10' },
        { name: 'Real-Time Applications', icon: '💬', desc: 'Integrating real-time features using technologies like Socket.IO.', color: 'from-emerald-500/10 to-green-500/10' }
    ];

    return (
        <section
            ref={sectionRef}
            id="services"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 "></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={contentRef}
                    className={`transition-all duration-1000 ${
                        contentIsVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                            <span className="text-purple-400 text-sm font-medium">Core Services</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            Solutions I Provide
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Leveraging modern stacks to build features that solve real-world problems and delight users.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.name}
                                className={`relative group bg-gradient-to-br ${service.color} backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50`}
                            >
                                <div className="text-4xl mb-6">{service.icon}</div>
                                <h3 className="text-white font-bold text-2xl mb-4">{service.name}</h3>
                                <p className="text-slate-300 text-lg leading-relaxed">{service.desc}</p>
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;