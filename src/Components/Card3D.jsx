import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable 3D card component with hover and animation effects.
 * It animates into view based on the `isVisible` prop.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {number} [props.delay=0] - The delay for the entrance animation.
 * @param {boolean} props.isVisible - Controls the visibility and entrance animation.
 * @param {string} [props.className=""] - Additional CSS classes for the component.
 */
const Card3D = ({ children, delay = 0, isVisible, className = "" }) => {
    const ref = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    // Handles the mouse move event to calculate the card rotation.
    const handleMouseMove = (event) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (event.clientY - centerY) / 15;
        const y = (event.clientX - centerX) / 15;
        setRotate({ x: -x, y });
    };

    // Sets the hovered state to true on mouse enter.
    const handleMouseEnter = () => {
        setHovered(true);
    };

    // Resets the rotation and hovered state on mouse leave.
    const handleMouseLeave = () => {
        setHovered(false);
        setRotate({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 50,
                scale: isVisible ? 1 : 0.9
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

export default Card3D;
