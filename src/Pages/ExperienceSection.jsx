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

const ExperienceSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const sectionRef = useRef(null);

    const experiences = [
        {
            company: 'Arth Technocracy Pvt. Ltd.',
            role: 'Associate Software Developer',
            period: 'Sept 2024 - Present',
            achievements: [
                'Developed MahiAdorn e-commerce platform using Laravel & PHP, increasing client revenue by 35%.',
                'Built Medicus hospital management system (MERN stack), reducing patient wait times by 45% and administrative workload by 60%.',
                'Implemented JWT authentication across 4 enterprise projects, decreasing security vulnerabilities by 90%.',
                'Optimised database queries and API response times by 65%, significantly improving application performance.',
                'Delivered all client projects with a 100% on-time completion rate through effective Agile sprint planning.'
            ]
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.1),transparent_50%)]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={contentRef}
                    className={`transition-all duration-1000 ${
                        contentIsVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
                            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                            <span className="text-pink-400 text-sm font-medium">My Journey</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            Work Experience
                        </h2>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700 hidden md:block"></div>

                        {experiences.map((exp, index) => (
                            <div key={index} className="relative mb-12">
                                <div className="md:absolute md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-slate-800 border-2 border-pink-400 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                                </div>
                                <div className="md:w-1/2 md:pr-12">
                                    <div className="p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl hover:border-pink-400/50 transition-colors duration-300">
                                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                        <p className="text-lg text-pink-400 font-medium mb-2">{exp.company}</p>
                                        <p className="text-sm text-slate-400 mb-4">{exp.period}</p>
                                        <ul className="space-y-3">
                                            {exp.achievements.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <svg className="w-4 h-4 text-pink-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                    <span className="text-slate-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;