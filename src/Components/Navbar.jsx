import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('Home');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const navLinks = [
        { name: 'Home', href: '#home', icon: '🏠' },
        { name: 'About', href: '#about', icon: '👨‍💻' },
        { name: 'Skills', href: '#skills', icon: '⚡' },
        { name: 'Projects', href: '#projects', icon: '🚀' },
        { name: 'Experience', href: '#experience', icon: '💼' },
        { name: 'Contact', href: '#contact', icon: '📧' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    return (
        <>
            {/* Glass morphism Navbar */}
            <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
                isScrolled
                    ? 'bg-slate-900/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-blue-500/5'
                    : 'bg-transparent'
            }`}>
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex items-center justify-between h-20">
                        {/* Enhanced Logo */}
                        <a href="#" className="flex-shrink-0 flex items-center group relative">
                            <div className="relative">
                                {/* Pulsing ring effect */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-30 group-hover:opacity-60 animate-pulse transition-all duration-300"></div>

                                {/* Logo container with 3D effect */}
                                <div className="relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                            <img src="/hj_logo.svg" alt="Himanshu Jangid Logo" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-4">
                                <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                                    Himanshu Jangid
                                </span>
                                <div className="text-xs text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Full-Stack Developer
                                </div>
                            </div>
                        </a>

                        {/* Desktop Navigation with enhanced animations */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-1">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setActiveLink(link.name)}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group overflow-hidden ${
                                        activeLink === link.name
                                            ? 'text-white'
                                            : 'text-slate-300 hover:text-white'
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Active background */}
                                    {activeLink === link.name && (
                                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-white/10 backdrop-blur-sm"></span>
                                    )}

                                    {/* Hover effect */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 rounded-xl transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>

                                    {/* Icon and text */}
                                    <span className="relative flex items-center space-x-2">
                                        <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity duration-300">{link.icon}</span>
                                        <span>{link.name}</span>
                                    </span>

                                    {/* Underline animation */}
                                    <span className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 transform -translate-x-1/2 ${
                                        activeLink === link.name ? 'w-3/4' : 'w-0 group-hover:w-1/2'
                                    }`}></span>
                                </a>
                            ))}

                            {/* CTA Button */}
                            <div className="ml-4">
                                <a href="#" className="relative px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 group overflow-hidden">
                                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                    <span className="relative">Hire Me</span>
                                </a>
                            </div>
                        </div>

                        {/* Enhanced Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="relative p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 group"
                                aria-label="Toggle menu"
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center">
                                    <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                                        isOpen ? 'transform rotate-45 translate-y-1.5' : ''
                                    }`}></span>
                                    <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${
                                        isOpen ? 'opacity-0' : ''
                                    }`}></span>
                                    <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${
                                        isOpen ? 'transform -rotate-45 -translate-y-2' : ''
                                    }`}></span>
                                </div>

                                {/* Ripple effect */}
                                <span className="absolute inset-0 bg-blue-400/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Enhanced Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
                isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
                {/* Backdrop with blur */}
                <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl"></div>

                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-32 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative h-full flex flex-col justify-center items-center px-8">
                    {/* Mobile navigation links */}
                    <div className="space-y-6">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => {
                                    setActiveLink(link.name);
                                    setIsOpen(false);
                                }}
                                className="block group"
                                style={{
                                    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                                    opacity: isOpen ? 1 : 0,
                                    transition: 'all 0.5s ease-out',
                                    transitionDelay: `${index * 100}ms`
                                }}
                            >
                                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-white/10 hover:bg-slate-700/40 hover:border-white/20 transition-all duration-300 transform group-hover:scale-105">
                                    <span className="text-3xl">{link.icon}</span>
                                    <span className="text-2xl font-semibold text-white">{link.name}</span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Mobile CTA */}
                    <div className="mt-12" style={{
                        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                        opacity: isOpen ? 1 : 0,
                        transition: 'all 0.5s ease-out',
                        transitionDelay: `${navLinks.length * 100}ms`
                    }}>
                        <a href="#" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                            Let's Work Together
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;