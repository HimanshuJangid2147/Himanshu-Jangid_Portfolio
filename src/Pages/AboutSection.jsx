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

const AboutSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const sectionRef = useRef(null);

    // Data from your resume
    const technicalSkills = [
        { name: 'React.js', level: 90, color: 'from-blue-400 to-cyan-500', icon: '⚛️', category: 'Framework' },
        { name: 'Node.js / Express.js', level: 85, color: 'from-green-400 to-emerald-500', icon: '🟢', category: 'Backend' },
        { name: 'PHP / Laravel', level: 88, color: 'from-indigo-400 to-purple-500', icon: '🐘', category: 'Backend' },
        { name: 'MongoDB / MySQL', level: 82, color: 'from-green-500 to-teal-500', icon: '🍃', category: 'Databases' },
        { name: 'JavaScript / HTML / CSS', level: 92, color: 'from-yellow-400 to-orange-500', icon: '⚡', category: 'Core Web' },
        { name: 'Tailwind / Bootstrap', level: 88, color: 'from-purple-400 to-pink-500', icon: '🎨', category: 'Styling' }
    ];

    const softSkills = [
        { name: 'Analytical', icon: '🧩', level: 92 },
        { name: 'Collaborator', icon: '🤝', level: 88 },
        { name: 'Adaptable', icon: '🌱', level: 90 },
        { name: 'Debugging', icon: '🐞', level: 85 }
    ];

    // Core Competencies from your resume to fill the space
    const coreCompetencies = [
        { name: 'Agile Methodologies', icon: '🔄' },
        { name: 'Performance Optimization', icon: '⚡' },
        { name: 'System Scalability', icon: '📈' },
        { name: 'Software Development Life Cycle', icon: '⭕' }
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={contentRef}
                    className={`transition-all duration-1000 ${
                        contentIsVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            <span className="text-blue-400 text-sm font-medium">About & Skills</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            Who I Am & What I Do
                        </h2>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">

                        {/* Left Column: Profile & Soft Skills */}
                        <div className="xl:col-span-5 space-y-8">
                            {/* Profile Card */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
                                    <div className="relative">
                                        <img
                                            src="https://placehold.co/400x500/1e293b/64748b?text=Himanshu\nJangid"
                                            alt="Himanshu Jangid - Full Stack Developer"
                                            className="relative rounded-2xl w-full h-auto object-cover aspect-[4/5]"
                                        />
                                    </div>
                                    <div className="mt-6 text-center">
                                        <h3 className="text-2xl font-bold text-white mb-2">Himanshu Jangid</h3>
                                        <p className="text-blue-400 font-medium">Full Stack Web Developer</p>
                                    </div>
                                </div>
                            </div>
                            {/* Soft Skills Card */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
                                    <h4 className="text-2xl font-bold text-white mb-6">Soft Skills</h4>
                                    <div className="space-y-6">
                                        {softSkills.map((skill, index) => (
                                            <div key={skill.name} className="group">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-3"><span className="text-xl">{skill.icon}</span><span className="text-white font-medium text-sm">{skill.name}</span></div>
                                                </div>
                                                <div className="relative w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out" style={{width: contentIsVisible ? `${skill.level}%` : '0%', transitionDelay: `${index * 200}ms`}}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Narrative, Technical Skills, and Core Competencies */}
                        <div className="xl:col-span-7 space-y-8">
                            {/* Narrative */}
                            <div className="space-y-6 text-lg text-slate-300 leading-relaxed p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Creating digital experiences that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">perform</span>
                                </h3>
                                <p>As a passionate developer with a Master of Computer Applications, my journey is driven by building practical, high-impact web solutions.</p>
                                <p>With hands-on expertise in both the MERN stack and Laravel, I build and deploy robust applications, focusing on creating efficient, secure, and user-friendly experiences from the ground up.</p>
                            </div>

                            {/* Technical Skills */}
                            <div className="p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white mb-8">Technical Proficiency</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {technicalSkills.map((skill, index) => (
                                        <div key={skill.name} className="group">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{skill.icon}</span>
                                                    <div><span className="text-white font-semibold block">{skill.name}</span><span className="text-slate-400 text-xs">{skill.category}</span></div>
                                                </div>
                                            </div>
                                            <div className="relative w-full bg-slate-700/30 rounded-full h-3 overflow-hidden">
                                                <div className="h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out" style={{width: contentIsVisible ? `${skill.level}%` : '0%', transitionDelay: `${index * 200}ms`}}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Core Competencies Card -- FILLS THE EMPTY SPACE */}
                            <div className="p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white mb-8">Core Competencies</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {coreCompetencies.map((comp) => (
                                        <div key={comp.name} className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300">
                                            <span className="text-2xl text-blue-400">{comp.icon}</span>
                                            <span className="text-white font-medium">{comp.name}</span>
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

export default AboutSection;