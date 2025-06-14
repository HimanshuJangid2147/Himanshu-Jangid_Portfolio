import React, { useState, useEffect, useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { motion } from 'framer-motion';

const SkillsSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const sectionRef = useRef(null);

    // Data from your resume
    const technicalSkills = [
        {
            name: 'React.js',
            level: 90,
            color: 'from-blue-400 to-cyan-500',
            category: 'Framework',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
        },
        {
            name: 'Node.js / Express.js',
            level: 85,
            color: 'from-green-400 to-emerald-500',
            category: 'Backend',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
        },
        {
            name: 'PHP / Laravel',
            level: 88,
            color: 'from-indigo-400 to-purple-500',
            category: 'Backend',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg'
        },
        {
            name: 'MongoDB / MySQL',
            level: 82,
            color: 'from-green-500 to-teal-500',
            category: 'Databases',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
        },
        {
            name: 'JavaScript / HTML / CSS',
            level: 92,
            color: 'from-yellow-400 to-orange-500',
            category: 'Core Web',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
        },
        {
            name: 'Tailwind / Bootstrap',
            level: 88,
            color: 'from-purple-400 to-pink-500',
            category: 'Styling',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
        }
    ];

    const softSkills = [
        { name: 'Analytical', icon: '🧩', level: 92 },
        { name: 'Collaborator', icon: '🤝', level: 88 },
        { name: 'Adaptable', icon: '🌱', level: 90 },
        { name: 'Debugging', icon: '🐞', level: 85 }
    ];

    const coreCompetencies = [
        { name: 'Agile Methodologies', icon: '🔄' },
        { name: 'Performance Optimization', icon: '⚡' },
        { name: 'System Scalability', icon: '📈' },
        { name: 'SDLC', icon: '⭕' }
    ];

    // Enhanced 3D Card with smoother animations
    const Card3D = ({ children, delay = 0, className = "" }) => {
        const ref = useRef(null);
        const [rotate, setRotate] = useState({ x: 0, y: 0 });
        const [hovered, setHovered] = useState(false);

        const handleMouseMove = (event) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = (event.clientY - centerY) / 15;
            const y = (event.clientX - centerX) / 15;
            setRotate({ x: -x, y });
        };

        const handleMouseEnter = () => {
            setHovered(true);
        };

        const handleMouseLeave = () => {
            setHovered(false);
            setRotate({ x: 0, y: 0 });
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{
                    opacity: contentIsVisible ? 1 : 0,
                    y: contentIsVisible ? 0 : 50,
                    scale: contentIsVisible ? 1 : 0.9
                }}
                transition={{
                    duration: 0.8,
                    delay,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`relative group w-full h-full ${className}`}
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${hovered ? 1.02 : 1})`,
                    transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
            >
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {children}
                </div>
            </motion.div>
        );
    };

    // Floating animation for icons
    const FloatingIcon = ({ children, delay = 0 }) => (
        <motion.div
            animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    );

    // Stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={contentRef}
                    initial="hidden"
                    animate={contentIsVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-12 lg:mb-16"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex space-x-1">
                                <motion.span
                                    className="w-2 h-2 bg-purple-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.7, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                />
                                <motion.span
                                    className="w-2 h-2 bg-pink-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.7, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 0.2
                                    }}
                                />
                                <motion.span
                                    className="w-2 h-2 bg-cyan-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.7, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 0.4
                                    }}
                                />
                            </div>
                            <span className="text-purple-300 text-sm font-semibold tracking-wide">Skills & Expertise</span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-4 tracking-tight"
                            variants={itemVariants}
                        >
                            My Technical Arsenal
                        </motion.h2>

                        <motion.p
                            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                            variants={itemVariants}
                        >
                            A comprehensive toolkit of modern technologies and methodologies
                        </motion.p>
                    </motion.div>

                    {/* Skills Grid - Fixed layout and spacing */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                        {/* Technical Proficiency - Spans 2 columns on large screens */}
                        <div className="lg:col-span-2">
                            <Card3D delay={0.2} className="h-full">
                                <div className="p-6 lg:p-8 h-full flex flex-col">
                                    <motion.div
                                        className="flex items-center space-x-3 mb-6 lg:mb-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: contentIsVisible ? 1 : 0,
                                            x: contentIsVisible ? 0 : -20
                                        }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        <motion.div
                                            className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            <FloatingIcon>
                                                <span className="text-xl lg:text-2xl">⚡</span>
                                            </FloatingIcon>
                                        </motion.div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-white">Technical Proficiency</h3>
                                    </motion.div>

                                    <motion.div
                                        className="space-y-6 lg:space-y-8 flex-1"
                                        initial="hidden"
                                        animate={contentIsVisible ? "visible" : "hidden"}
                                        variants={containerVariants}
                                    >

                                        {technicalSkills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                className="group/skill"
                                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                                animate={{
                                                    opacity: contentIsVisible ? 1 : 0,
                                                    x: contentIsVisible ? 0 : -20,
                                                    scale: contentIsVisible ? 1 : 0.9
                                                }}
                                                transition={{
                                                    delay: 0.6 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                                whileHover={{
                                                    scale: 1.02,
                                                    x: 5,
                                                    transition: { type: "spring", stiffness: 400, damping: 20 }
                                                }}
                                            >
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <motion.img
                                                            src={skill.logo}
                                                            alt={skill.name}
                                                            className="w-8 h-8 object-contain"
                                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                                            transition={{ duration: 0.5 }}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'inline-block';
                                                            }}
                                                        />
                                                        <span className="text-2xl hidden">
                                                        {skill.name.includes('React') ? '⚛️' :
                                                            skill.name.includes('Node') ? '🟢' :
                                                                skill.name.includes('PHP') ? '🐘' :
                                                                    skill.name.includes('MongoDB') ? '🍃' :
                                                                        skill.name.includes('JavaScript') ? '⚡' :
                                                                            '🎨'}
                                                    </span>
                                                        <div>
                                                            <span className="text-lg font-semibold text-white">{skill.name}</span>
                                                            <motion.span
                                                                className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full ml-2"
                                                                whileHover={{ scale: 1.05, y: -1 }}
                                                            >
                                                                {skill.category}
                                                            </motion.span>
                                                        </div>
                                                    </div>
                                                    <motion.span
                                                        className="text-sm font-bold text-slate-300 min-w-[3rem] text-right"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: contentIsVisible ? 1 : 0 }}
                                                        transition={{ delay: 0.8 + index * 0.1 }}
                                                    >
                                                        {skill.level}%
                                                    </motion.span>
                                                </div>
                                                <div className="relative w-full bg-slate-700/30 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        className={`bg-gradient-to-r ${skill.color} h-full rounded-full relative`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: contentIsVisible ? `${skill.level}%` : 0 }}
                                                        transition={{
                                                            duration: 1.5,
                                                            delay: 0.8 + index * 0.12,
                                                            type: "spring",
                                                            stiffness: 80
                                                        }}
                                                    >
                                                        <motion.div
                                                            className="absolute inset-0 bg-white/20 rounded-full"
                                                            animate={{
                                                                x: ["-100%", "100%"],
                                                                opacity: [0, 1, 0]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                delay: 1.2 + index * 0.12,
                                                                ease: "easeInOut"
                                                            }}
                                                        />
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* Additional Skills Stats */}
                                        <motion.div
                                            className="mt-12 pt-8 border-t border-slate-700/50"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: contentIsVisible ? 1 : 0,
                                                y: contentIsVisible ? 0 : 20
                                            }}
                                            transition={{ delay: 1.8, duration: 0.8 }}
                                        >
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                                <motion.div
                                                    className="text-center group"
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <motion.div
                                                        className="text-3xl font-bold text-purple-400 mb-1"
                                                        animate={{
                                                            scale: [1, 1.05, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                    >
                                                        1+
                                                    </motion.div>
                                                    <div className="text-sm text-slate-400">Year Learning</div>
                                                </motion.div>

                                                <motion.div
                                                    className="text-center group"
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <motion.div
                                                        className="text-3xl font-bold text-cyan-400 mb-1"
                                                        animate={{
                                                            scale: [1, 1.05, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                            delay: 0.2
                                                        }}
                                                    >
                                                        15+
                                                    </motion.div>
                                                    <div className="text-sm text-slate-400">Practice Projects</div>
                                                </motion.div>

                                                <motion.div
                                                    className="text-center group"
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <motion.div
                                                        className="text-3xl font-bold text-emerald-400 mb-1"
                                                        animate={{
                                                            scale: [1, 1.05, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                            delay: 0.4
                                                        }}
                                                    >
                                                        8+
                                                    </motion.div>
                                                    <div className="text-sm text-slate-400">Tech Skills</div>
                                                </motion.div>

                                                <motion.div
                                                    className="text-center group"
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <motion.div
                                                        className="text-3xl font-bold text-pink-400 mb-1"
                                                        animate={{
                                                            scale: [1, 1.05, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                            delay: 0.6
                                                        }}
                                                    >
                                                        100%
                                                    </motion.div>
                                                    <div className="text-sm text-slate-400">Motivated</div>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Learning & Development */}
                                        <motion.div
                                            className="mt-8 p-6 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-xl border border-slate-600/30"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{
                                                opacity: contentIsVisible ? 1 : 0,
                                                scale: contentIsVisible ? 1 : 0.95
                                            }}
                                            transition={{ delay: 2.0, duration: 0.8 }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="flex items-center space-x-3 mb-4">
                                                <motion.div
                                                    className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center"
                                                    animate={{ rotate: [0, 5, -5, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                >
                                                    <span className="text-lg">📚</span>
                                                </motion.div>
                                                <h4 className="text-lg font-semibold text-white">Currently Learning</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Next.js', 'TypeScript', 'Git/GitHub', 'Responsive Design'].map((tech, index) => (
                                                    <motion.span
                                                        key={tech}
                                                        className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm font-medium"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{
                                                            opacity: contentIsVisible ? 1 : 0,
                                                            scale: contentIsVisible ? 1 : 0.8
                                                        }}
                                                        transition={{ delay: 2.2 + index * 0.1 }}
                                                        whileHover={{
                                                            scale: 1.1,
                                                            backgroundColor: "rgba(148, 163, 184, 0.2)",
                                                            color: "#f8fafc"
                                                        }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </Card3D>
                        </div>

                        {/* Right Column: Soft Skills & Competencies */}
                        <div className="space-y-6 lg:space-y-8">
                            {/* Soft Skills */}
                            <Card3D delay={0.4}>
                                <div className="p-6 lg:p-8">
                                    <motion.div
                                        className="flex items-center space-x-3 mb-6 lg:mb-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: contentIsVisible ? 1 : 0,
                                            x: contentIsVisible ? 0 : -20
                                        }}
                                        transition={{ delay: 0.6, duration: 0.6 }}
                                    >
                                        <motion.div
                                            className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center"
                                            whileHover={{ scale: 1.1, rotate: -5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            <FloatingIcon delay={0.5}>
                                                <span className="text-xl lg:text-2xl">🧠</span>
                                            </FloatingIcon>
                                        </motion.div>
                                        <h3 className="text-xl lg:text-2xl font-bold text-white">Soft Skills</h3>
                                    </motion.div>

                                    <motion.div
                                        className="space-y-4 lg:space-y-6"
                                        initial="hidden"
                                        animate={contentIsVisible ? "visible" : "hidden"}
                                        variants={containerVariants}
                                    >
                                        {softSkills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                className="group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{
                                                    opacity: contentIsVisible ? 1 : 0,
                                                    x: contentIsVisible ? 0 : -20
                                                }}
                                                transition={{
                                                    delay: 0.8 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 100
                                                }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <FloatingIcon delay={index * 0.5}>
                                                            <span className="text-lg lg:text-xl">{skill.icon}</span>
                                                        </FloatingIcon>
                                                        <span className="text-white font-medium text-sm lg:text-base">{skill.name}</span>
                                                    </div>
                                                    <motion.span
                                                        className="text-slate-400 text-sm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: contentIsVisible ? 1 : 0 }}
                                                        transition={{ delay: 1.0 + index * 0.1 }}
                                                    >
                                                        {skill.level}%
                                                    </motion.span>
                                                </div>
                                                <div className="relative w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                                                        initial={{ width: 0, opacity: 0 }}
                                                        animate={{
                                                            width: contentIsVisible ? `${skill.level}%` : 0,
                                                            opacity: contentIsVisible ? 1 : 0
                                                        }}
                                                        transition={{
                                                            duration: 1.2,
                                                            delay: 1.0 + index * 0.15,
                                                            type: "spring",
                                                            stiffness: 80
                                                        }}
                                                    />
                                                    <motion.div
                                                        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full"
                                                        initial={{ x: "-100%" }}
                                                        animate={{ x: contentIsVisible ? "100%" : "-100%" }}
                                                        transition={{
                                                            duration: 2,
                                                            delay: 1.2 + index * 0.15,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </Card3D>

                            {/* Core Competencies */}
                            <Card3D delay={0.6}>
                                <div className="p-6 lg:p-8">
                                    <motion.div
                                        className="flex items-center space-x-3 mb-6 lg:mb-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: contentIsVisible ? 1 : 0,
                                            x: contentIsVisible ? 0 : -20
                                        }}
                                        transition={{ delay: 0.8, duration: 0.6 }}
                                    >
                                        <motion.div
                                            className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            <FloatingIcon delay={1}>
                                                <span className="text-xl lg:text-2xl">🎯</span>
                                            </FloatingIcon>
                                        </motion.div>
                                        <h3 className="text-xl lg:text-2xl font-bold text-white">Core Competencies</h3>
                                    </motion.div>

                                    <motion.div
                                        className="grid grid-cols-1 gap-3 lg:gap-4"
                                        initial="hidden"
                                        animate={contentIsVisible ? "visible" : "hidden"}
                                        variants={containerVariants}
                                    >
                                        {coreCompetencies.map((comp, index) => (
                                            <motion.div
                                                key={comp.name}
                                                className="flex items-center space-x-4 p-3 lg:p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
                                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                animate={{
                                                    opacity: contentIsVisible ? 1 : 0,
                                                    y: contentIsVisible ? 0 : 20,
                                                    scale: contentIsVisible ? 1 : 0.9
                                                }}
                                                transition={{
                                                    delay: 1.0 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    y: -3,
                                                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)"
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <FloatingIcon delay={index * 0.3}>
                                                    <span className="text-xl lg:text-2xl text-emerald-400">{comp.icon}</span>
                                                </FloatingIcon>
                                                <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300 text-sm lg:text-base">
                                                    {comp.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </Card3D>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;