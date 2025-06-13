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

const SkillsSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const sectionRef = useRef(null);

    // Data from your resume
    const technicalSkills = [
        { name: 'React.js', level: 90, color: 'from-blue-400 to-cyan-500', category: 'Framework' },
        { name: 'Node.js / Express.js', level: 85, color: 'from-green-400 to-emerald-500', category: 'Backend' },
        { name: 'PHP / Laravel', level: 88, color: 'from-indigo-400 to-purple-500', category: 'Backend' },
        { name: 'MongoDB / MySQL', level: 82, color: 'from-green-500 to-teal-500', category: 'Databases' },
        { name: 'JavaScript / HTML / CSS', level: 92, color: 'from-yellow-400 to-orange-500', category: 'Core Web' },
        { name: 'Tailwind / Bootstrap', level: 88, color: 'from-purple-400 to-pink-500', category: 'Styling' }
    ];

    const softSkills = [
        { name: 'Analytical', icon: '🧩' },
        { name: 'Collaborator', icon: '🤝' },
        { name: 'Adaptable', icon: '🌱' },
        { name: 'Debugging', icon: '🐞' }
    ];

    const coreCompetencies = [
        { name: 'Agile Methodologies', icon: '🔄' },
        { name: 'Performance Optimization', icon: '⚡' },
        { name: 'System Scalability', icon: '📈' },
        { name: 'SDLC', icon: '⭕' }
    ];

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0"></div>

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
                            <span className="text-purple-400 text-sm font-medium">Skills & Expertise</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            My Technical Arsenal
                        </h2>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Technical Proficiency */}
                        <div className="p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Technical Proficiency</h3>
                            {technicalSkills.map((skill, index) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-base font-medium text-slate-300">{skill.name}</span>
                                        <span className="text-sm font-medium text-slate-400">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                                        <div className={`bg-gradient-to-r ${skill.color} h-2.5 rounded-full transition-all duration-1000 ease-out`} style={{ width: contentIsVisible ? `${skill.level}%` : '0%', transitionDelay: `${index * 100}ms`}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Soft Skills & Competencies */}
                        <div className="space-y-8">
                            <div className="p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white mb-6">Soft Skills</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {softSkills.map((skill) => (
                                        <div key={skill.name} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                                            <span className="text-xl">{skill.icon}</span>
                                            <span className="font-medium text-white">{skill.name} </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white mb-6">Core Competencies</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {coreCompetencies.map((comp) => (
                                        <div key={comp.name} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                                            <span className="text-xl">{comp.icon}</span>
                                            <span className="font-medium text-white">{comp.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;