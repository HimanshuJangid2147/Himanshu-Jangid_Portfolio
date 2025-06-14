import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen } from '../hooks/useOnScreen';

const AboutSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const sectionRef = useRef(null);

    const technicalSkills = [
        {
            name: 'React.js',
            level: 90,
            color: 'from-blue-400 to-cyan-500',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            category: 'Framework'
        },
        {
            name: 'Node.js / Express.js',
            level: 85,
            color: 'from-green-400 to-emerald-500',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            category: 'Backend'
        },
        {
            name: 'PHP / Laravel',
            level: 88,
            color: 'from-indigo-400 to-purple-500',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
            category: 'Backend'
        },
        {
            name: 'MongoDB / MySQL',
            level: 82,
            color: 'from-green-500 to-teal-500',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
            category: 'Databases'
        },
        {
            name: 'JavaScript / HTML / CSS',
            level: 92,
            color: 'from-yellow-400 to-orange-500',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            category: 'Core Web'
        },
        {
            name: 'Tailwind / Bootstrap',
            level: 88,
            color: 'from-purple-400 to-pink-500',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
            category: 'Styling'
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
        { name: 'Software Development Life Cycle', icon: '⭕' }
    ];

    // Enhanced 3D Card with smoother animations
    const Card3D = ({ children, delay = 0 }) => {
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
                className="relative group w-full"
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${hovered ? 1.02 : 1})`,
                    transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
            >
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden">
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
            id="about"
            className="relative py-24 sm:py-32 overflow-hidden"
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
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
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
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={contentRef}
                    initial="hidden"
                    animate={contentIsVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {/* Header Section with enhanced animations */}
                    <motion.div
                        className="text-center mb-20"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                className="w-2 h-2 bg-blue-400 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.7, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            />
                            <span className="text-blue-400 text-sm font-medium">About & Skills</span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
                            variants={itemVariants}
                        >
                            Who I Am & What I Do
                        </motion.h2>
                    </motion.div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="xl:col-span-5 space-y-8">
                            {/* Profile Card */}
                            <Card3D delay={0.2}>
                                <div className="p-8">
                                    <motion.div
                                        className="relative mb-6"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <img
                                            src="https://placehold.co/400x500/1e293b/64748b?text=Himanshu\nJangid"
                                            alt="Himanshu Jangid - Full Stack Developer"
                                            className="relative rounded-2xl w-full h-auto object-cover aspect-[4/5]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/20 to-transparent rounded-2xl"></div>

                                        {/* Floating particles around image */}
                                        <motion.div
                                            className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400/60 rounded-full"
                                            animate={{
                                                y: [0, -20, 0],
                                                x: [0, 10, 0],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                delay: 0
                                            }}
                                        />
                                        <motion.div
                                            className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400/60 rounded-full"
                                            animate={{
                                                y: [0, 15, 0],
                                                x: [0, -8, 0],
                                                scale: [1, 0.8, 1]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                delay: 1
                                            }}
                                        />
                                    </motion.div>

                                    <motion.div
                                        className="text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: contentIsVisible ? 1 : 0,
                                            y: contentIsVisible ? 0 : 20
                                        }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        <h3 className="text-2xl font-bold text-white mb-2">Himanshu Jangid</h3>
                                        <p className="text-blue-400 font-medium mb-4">Full Stack Web Developer</p>
                                        <motion.div
                                            className="flex flex-wrap justify-center gap-2 mt-4"
                                            initial="hidden"
                                            animate={contentIsVisible ? "visible" : "hidden"}
                                            variants={containerVariants}
                                        >
                                            <motion.span
                                                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                            >
                                                MCA Graduate
                                            </motion.span>
                                            <motion.span
                                                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                            >
                                                MERN Stack
                                            </motion.span>
                                            <motion.span
                                                className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                            >
                                                Laravel
                                            </motion.span>
                                        </motion.div>

                                        {/* Additional profile stats */}
                                        <motion.div
                                            className="flex justify-center space-x-6 mt-6 pt-6 border-t border-slate-700/50"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: contentIsVisible ? 1 : 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <div className="text-center">
                                                <motion.div
                                                    className="text-2xl font-bold text-white"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: contentIsVisible ? 1 : 0 }}
                                                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                                >
                                                    2+
                                                </motion.div>
                                                <div className="text-xs text-slate-400">Years Experience</div>
                                            </div>
                                            <div className="text-center">
                                                <motion.div
                                                    className="text-2xl font-bold text-white"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: contentIsVisible ? 1 : 0 }}
                                                    transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                                                >
                                                    15+
                                                </motion.div>
                                                <div className="text-xs text-slate-400">Projects</div>
                                            </div>
                                            <div className="text-center">
                                                <motion.div
                                                    className="text-2xl font-bold text-white"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: contentIsVisible ? 1 : 0 }}
                                                    transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                                                >
                                                    100%
                                                </motion.div>
                                                <div className="text-xs text-slate-400">Satisfaction</div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </Card3D>

                            {/* Soft Skills Card */}
                            <Card3D delay={0.4}>
                                <div className="p-8">
                                    <h4 className="text-2xl font-bold text-white mb-6">Soft Skills</h4>
                                    <div className="space-y-6">
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
                                                    delay: 0.6 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 100
                                                }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <FloatingIcon delay={index * 0.5}>
                                                            <span className="text-xl">{skill.icon}</span>
                                                        </FloatingIcon>
                                                        <span className="text-white font-medium text-sm">{skill.name}</span>
                                                    </div>
                                                    <motion.span
                                                        className="text-slate-400 text-sm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: contentIsVisible ? 1 : 0 }}
                                                        transition={{ delay: 0.8 + index * 0.1 }}
                                                    >
                                                        {skill.level}%
                                                    </motion.span>
                                                </div>
                                                <div className="relative w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                                        initial={{ width: 0, opacity: 0 }}
                                                        animate={{
                                                            width: contentIsVisible ? `${skill.level}%` : 0,
                                                            opacity: contentIsVisible ? 1 : 0
                                                        }}
                                                        transition={{
                                                            duration: 1.2,
                                                            delay: 0.8 + index * 0.15,
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
                                                            delay: 1 + index * 0.15,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </Card3D>
                        </div>

                        {/* Right Column */}
                        <div className="xl:col-span-7 space-y-8">
                            {/* Description Card */}
                            <Card3D delay={0.3}>
                                <div className="p-8">
                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-4"
                                        variants={itemVariants}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: contentIsVisible ? 1 : 0,
                                            y: contentIsVisible ? 0 : 20
                                        }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        Creating digital experiences that{' '}
                                        <motion.span
                                            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                                            animate={{
                                                backgroundPosition: ["0%", "100%", "0%"]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            perform
                                        </motion.span>
                                    </motion.h3>

                                    <motion.div
                                        variants={containerVariants}
                                        className="space-y-6 text-lg text-slate-300 leading-relaxed"
                                        initial="hidden"
                                        animate={contentIsVisible ? "visible" : "hidden"}
                                    >
                                        <motion.p variants={itemVariants}>
                                            As a passionate developer with a Master of Computer Applications, my journey is driven by building practical, high-impact web solutions.
                                        </motion.p>
                                        <motion.p variants={itemVariants}>
                                            With hands-on expertise in both the MERN stack and Laravel, I build and deploy robust applications, focusing on creating efficient, secure, and user-friendly experiences from the ground up.
                                        </motion.p>
                                    </motion.div>
                                </div>
                            </Card3D>

                            {/* Technical Skills Card */}
                            <Card3D delay={0.5}>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-8">Technical Proficiency</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {technicalSkills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                className="group"
                                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                animate={{
                                                    opacity: contentIsVisible ? 1 : 0,
                                                    y: contentIsVisible ? 0 : 20,
                                                    scale: contentIsVisible ? 1 : 0.9
                                                }}
                                                transition={{
                                                    delay: 0.7 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    y: -5,
                                                    transition: { type: "spring", stiffness: 400, damping: 20 }
                                                }}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <motion.img
                                                            src={skill.logo}
                                                            alt={skill.name}
                                                            className="w-8 h-8 object-contain"
                                                            whileHover={{ rotate: 360 }}
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
                                                            <span className="text-white font-semibold block">{skill.name}</span>
                                                            <span className="text-slate-400 text-xs">{skill.category}</span>
                                                        </div>
                                                    </div>
                                                    <motion.span
                                                        className="text-slate-400 text-sm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: contentIsVisible ? 1 : 0 }}
                                                        transition={{ delay: 0.9 + index * 0.1 }}
                                                    >
                                                        {skill.level}%
                                                    </motion.span>
                                                </div>
                                                <div className="relative w-full bg-slate-700/30 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: contentIsVisible ? `${skill.level}%` : 0 }}
                                                        transition={{
                                                            duration: 1.5,
                                                            delay: 0.9 + index * 0.12,
                                                            type: "spring",
                                                            stiffness: 60
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
                                    </div>
                                </div>
                            </Card3D>

                            {/* Core Competencies Card */}
                            <Card3D delay={0.7}>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-8">Core Competencies</h3>
                                    <motion.div
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                        initial="hidden"
                                        animate={contentIsVisible ? "visible" : "hidden"}
                                        variants={containerVariants}
                                    >
                                        {coreCompetencies.map((comp, index) => (
                                            <motion.div
                                                key={comp.name}
                                                className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
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
                                                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)"
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <FloatingIcon delay={index * 0.3}>
                                                    <span className="text-2xl text-blue-400">{comp.icon}</span>
                                                </FloatingIcon>
                                                <span className="text-white font-medium text-sm sm:text-base">{comp.name}</span>
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

export default AboutSection;