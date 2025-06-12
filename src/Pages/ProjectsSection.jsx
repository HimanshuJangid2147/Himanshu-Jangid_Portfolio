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

const ProjectsSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
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

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with modern UI/UX, secure payment integration, and admin dashboard.',
            category: 'fullstack',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            status: 'Completed',
            year: '2024',
            links: {
                live: '#',
                github: '#'
            },
            features: ['User Authentication', 'Payment Gateway', 'Admin Panel', 'Responsive Design'],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates, drag-and-drop functionality.',
            category: 'frontend',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
            technologies: ['React', 'Redux', 'Socket.io', 'CSS3'],
            status: 'In Progress',
            year: '2024',
            links: {
                live: '#',
                github: '#'
            },
            features: ['Real-time Collaboration', 'Drag & Drop', 'Team Management', 'Progress Tracking'],
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            title: 'Weather Dashboard',
            description: 'A beautiful weather application with location-based forecasts, interactive maps, and data visualization.',
            category: 'frontend',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
            technologies: ['React', 'Chart.js', 'OpenWeather API', 'Tailwind'],
            status: 'Completed',
            year: '2023',
            links: {
                live: '#',
                github: '#'
            },
            features: ['Weather Forecast', 'Interactive Maps', 'Data Visualization', 'Geolocation'],
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 4,
            title: 'REST API Server',
            description: 'A scalable RESTful API with authentication, rate limiting, and comprehensive documentation.',
            category: 'backend',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
            technologies: ['Node.js', 'Express', 'JWT', 'Swagger'],
            status: 'Completed',
            year: '2023',
            links: {
                live: '#',
                github: '#'
            },
            features: ['JWT Authentication', 'Rate Limiting', 'API Documentation', 'Error Handling'],
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 5,
            title: 'Portfolio Website',
            description: 'A modern, responsive portfolio website with smooth animations and interactive elements.',
            category: 'frontend',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
            technologies: ['React', 'Tailwind', 'Framer Motion', 'Three.js'],
            status: 'Completed',
            year: '2024',
            links: {
                live: '#',
                github: '#'
            },
            features: ['Smooth Animations', '3D Elements', 'Responsive Design', 'SEO Optimized'],
            color: 'from-indigo-500 to-purple-500'
        },
        {
            id: 6,
            title: 'Chat Application',
            description: 'Real-time chat application with rooms, file sharing, and modern messaging features.',
            category: 'fullstack',
            image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop',
            technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
            status: 'In Progress',
            year: '2024',
            links: {
                live: '#',
                github: '#'
            },
            features: ['Real-time Messaging', 'File Sharing', 'Chat Rooms', 'User Presence'],
            color: 'from-teal-500 to-cyan-500'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Projects', count: projects.length },
        { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
        { id: 'backend', name: 'Backend', count: projects.filter(p => p.category === 'backend').length },
        { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const stats = [
        { label: 'Projects Completed', value: '50+', icon: '🚀' },
        { label: 'Happy Clients', value: '25+', icon: '😊' },
        { label: 'Code Commits', value: '1000+', icon: '💻' },
        { label: 'Years Experience', value: '3+', icon: '⏰' }
    ];

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Modern background effects */}
            <div className="absolute inset-0">
                {/* Gradient mesh background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>

                {/* Animated gradient orbs */}
                <div
                    className="absolute w-96 h-96 bg-gradient-to-r from-green-600/10 to-cyan-600/10 rounded-full blur-3xl opacity-60 animate-pulse"
                    style={{
                        left: `${10 + mousePosition.x * 0.02}%`,
                        top: `${20 + mousePosition.y * 0.02}%`,
                        animationDuration: '4s'
                    }}
                />
                <div
                    className="absolute w-64 h-64 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-40 animate-pulse"
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
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-green-400 text-sm font-medium">My Work</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            Featured{' '}
                            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            A showcase of my recent work, demonstrating expertise across different technologies and domains
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="relative group bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 text-center hover:border-slate-600/50 transition-all duration-300 hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-slate-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveFilter(category.id)}
                                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                    activeFilter === category.id
                                        ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg shadow-green-500/25'
                                        : 'bg-slate-800/40 text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/30'
                                }`}
                            >
                                <span className="relative z-10">
                                    {category.name}
                                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-3xl overflow-hidden hover:border-slate-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/50"
                                style={{ animationDelay: `${index * 150}ms` }}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = `https://placehold.co/600x400/1e293b/64748b?text=${encodeURIComponent(project.title)}`;
                                        }}
                                    />

                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            project.status === 'Completed'
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    {/* Year Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800/60 text-slate-300 border border-slate-600/30">
                                            {project.year}
                                        </span>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} bg-opacity-90 z-20 flex items-center justify-center space-x-4 transition-all duration-300 ${
                                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <a
                                            href={project.links.live}
                                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group/btn"
                                        >
                                            <svg className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                        <a
                                            href={project.links.github}
                                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group/btn"
                                        >
                                            <svg className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-cyan-400 transition-all duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2">
                                        <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">Key Features</div>
                                        <div className="grid grid-cols-2 gap-1">
                                            {project.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                                    <span className="text-slate-300 text-xs">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Like what you see?
                            </h3>
                            <p className="text-slate-300 mb-8 text-lg">
                                I'm always excited to work on new projects and bring innovative ideas to life
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="#contact"
                                    className="group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative">Start a Project</span>
                                    <span className="relative transform group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                                </a>
                                <a
                                    href="https://github.com/your-username"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-slate-600 text-white font-semibold rounded-2xl hover:border-green-400 hover:text-green-400 transition-all duration-300"
                                >
                                    <span>View All on GitHub</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-20 right-20 w-4 h-4 bg-green-500/20 rounded-full animate-ping opacity-30"></div>
            <div className="absolute bottom-32 left-20 w-6 h-6 bg-cyan-500/20 rounded-lg rotate-45 animate-pulse opacity-20"></div>
            <div className="absolute top-1/2 right-10 w-8 h-8 bg-blue-500/10 rounded-full animate-bounce opacity-30" style={{ animationDuration: '3s' }}></div>
        </section>
    );
};

export default ProjectsSection;