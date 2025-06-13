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

const ContactSection = () => {
    const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });
    const sectionRef = useRef(null);

    const contactDetails = [
        { icon: '📧', label: 'Email', value: 'jangidhimanshu2000@gmail.com', href: 'mailto:jangidhimanshu2000@gmail.com' },
        { icon: '📞', label: 'Phone', value: '+91 86198 87533', href: 'tel:+918619887533' },
        { icon: '📍', label: 'Location', value: 'Ajmer, Rajasthan, India', href: '#' }
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(59,130,246,0.1),transparent_50%)]"></div>

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
                            <span className="text-blue-400 text-sm font-medium">Contact</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            Get In Touch
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Have a project or question? I'd love to hear from you. Fill out the form below or reach out via email.</p>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Contact Info */}
                        <div className="lg:col-span-5 space-y-6">
                            {contactDetails.map((item) => (
                                <div key={item.label} className="flex items-start space-x-4 p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                                    <div className="text-2xl pt-1">{item.icon}</div>
                                    <div>
                                        <p className="text-slate-400 text-sm">{item.label}</p>
                                        <a href={item.href} className="text-lg text-white font-semibold hover:text-blue-400 transition-colors duration-300">{item.value}</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                                {/* For functionality, replace the action attribute with your Formspree endpoint or other form handler */}
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input type="text" name="name" id="name" required placeholder="Your Name" className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" id="email" required placeholder="Your Email" className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <textarea name="message" id="message" rows="5" required placeholder="Your Message" className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
                                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                                <span>Send Message</span>
                                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;