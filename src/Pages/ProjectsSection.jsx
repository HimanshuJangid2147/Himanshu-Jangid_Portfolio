import React, { useState, useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { motion } from 'framer-motion';

const ProjectsSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.05 });
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const sectionRef = useRef(null);

    // Projects data from resume - SYNTAX ERRORS FIXED
    const projects = [
        {
            id: 1,
            title: 'Medicus - Hospital Management System',
            description: 'A role-based hospital management system managing appointments, patient records, and billing for 3 distinct user roles (admin, doctor, patient).',
            category: 'mern',
            image: 'https://placehold.co/600x400/1e293b/3b82f6?text=Medicus',
            technologies: ['MERN', 'JWT', 'Zustand', 'Tailwind CSS'],
            year: '2025',
            links: {
                live: null,
                github: 'https://github.com/HimanshuJangid2147/Medicus-PatientManagementSystem'
            },
            features: ['Role-Based Access', 'Digital Appointments', 'Secure JWT Login', 'Reusable Components'],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 2,
            title: 'MahiAdorn - E-Commerce Platform',
            description: 'A responsive fashion e-commerce site with product management, order processing, and secure admin control with authentication.',
            category: 'laravel',
            image: 'https://placehold.co/600x400/1e293b/ef4444?text=MahiAdorn',
            technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
            year: '2025',
            links: {
                live: 'https://mahiadorn.com',
                github: null
            },
            features: ['Product Management', 'Order Processing', 'Secure Admin Panel', 'Image Uploads'],
            color: 'from-red-500 to-orange-500'
        },
        {
            id: 3,
            title: 'Wave Chat - Real-Time Chat Application',
            description: 'A real-time chat application with secure text and image messaging using Socket.IO, JWT authentication, and Cloudinary for media uploads.',
            category: 'mern',
            image: 'https://placehold.co/600x400/1e293b/10b981?text=Wave+Chat',
            technologies: ['MERN', 'Socket.IO', 'JWT', 'Cloudinary'],
            year: '2024',
            links: {
                live: 'https://wavechat-raxr.onrender.com',
                github: 'https://github.com/HimanshuJangid2147/WaveChat-2'
            },
            features: ['Real-Time Messaging', 'Image & Text Support', 'JWT Authentication', 'Fully Responsive UI'],
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 4,
            title: 'Brandrake - A Business Portfolio Website',
            description: 'A premium portfolio website for a global branding studio, featuring a secure admin panel for dynamic content management and showcasing their design projects.',
            category: 'laravel',
            image: 'https://placehold.co/600x400/1e293b/3b82f6?text=Brandrake',
            technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
            year: '2023',
            links: {
                live: 'https://brandrake.com',
                github: null
            },
            features: ['Secure Admin Panel', 'Image Uploads', 'Responsive UI', 'Client Satisfaction'],
            color: 'from-blue-500 to-emerald-500'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Projects', count: projects.length },
        { id: 'mern', name: 'MERN Stack', count: projects.filter(p => p.category === 'mern').length },
        { id: 'laravel', name: 'Laravel', count: projects.filter(p => p.category === 'laravel').length },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={contentRef}
                    className={`transition-all duration-1000 ${
                        contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Section Header */}
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
                            A showcase of my full-stack projects, demonstrating expertise in MERN, Laravel, and other modern technologies.
                        </p>
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
                                className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-3xl overflow-hidden hover:border-slate-600/50 transition-all duration-500 hover:scale-105"
                                style={{ animationDelay: `${index * 150}ms` }}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800/60 text-slate-300 border border-slate-600/30">
                                            {project.year}
                                        </span>
                                    </div>
                                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} bg-opacity-90 z-20 flex items-center justify-center space-x-4 transition-all duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                                        {project.links.live && (
                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (<span key={tech} className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full">{tech}</span>))}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">Key Features</div>
                                        <div className="grid grid-cols-2 gap-1">
                                            {project.features.map((feature, idx) => (<div key={idx} className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div><span className="text-slate-300 text-xs">{feature}</span></div>))}
                                        </div>
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

export default ProjectsSection;