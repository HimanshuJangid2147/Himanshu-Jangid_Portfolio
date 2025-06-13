import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('Home');

    // Corrected the order to match your App.jsx: About -> Services -> Skills
    const navLinks = [
        { name: 'Home', href: '#home', id: 'home', icon: '🏠' },
        { name: 'About', href: '#about', id: 'about', icon: '👨‍💻' },
        { name: 'Services', href: '#services', id: 'services', icon: '🛠️' },
        { name: 'Skills', href: '#skills', id: 'skills', icon: '⚡' },
        { name: 'Projects', href: '#projects', id: 'projects', icon: '🚀' },
        { name: 'Experience', href: '#experience', id: 'experience', icon: '💼' },
        { name: 'Contact', href: '#contact', id: 'contact', icon: '📧' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const link = navLinks.find(link => link.id === entry.target.id);
                        if (link) {
                            setActiveLink(link.name);
                        }
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            }
        );

        navLinks.forEach((link) => {
            // This assumes each of your section components has the correct id (e.g., <section id="about">)
            const section = document.querySelector(link.href);
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            navLinks.forEach((link) => {
                const section = document.querySelector(link.href);
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-slate-900/20 backdrop-blur-2xl border-b border-white/10' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex items-center justify-between h-20">
                        <a href="#home" className="flex-shrink-0 flex items-center group relative">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-30 group-hover:opacity-60 animate-pulse"></div>
                                <div className="relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <img src="/hj_logo.svg" alt="Himanshu Jangid Logo" />
                                    </div>
                                </div>
                            </div>
                            <div className="ml-4">
                                <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                                    Himanshu Jangid
                                </span>
                            </div>
                        </a>
                        <div className="hidden lg:flex lg:items-center lg:space-x-1">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} onClick={() => setActiveLink(link.name)} className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all group ${activeLink === link.name ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
                                    {activeLink === link.name && (<span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-white/10 backdrop-blur-sm"></span>)}
                                    <span className="relative flex items-center space-x-2">
                                        <span className="text-base opacity-70 group-hover:opacity-100">{link.icon}</span>
                                        <span>{link.name}</span>
                                    </span>
                                </a>
                            ))}
                            <div className="ml-4">
                                <a href="#contact" className="relative px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105">
                                    Hire Me
                                </a>
                            </div>
                        </div>
                        <div className="lg:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setIsOpen(false)}></div>
                <div className="relative h-full flex flex-col justify-center items-center space-y-6">
                    {navLinks.map((link, index) => (
                        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl text-slate-200 hover:text-white">{link.name}</a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;