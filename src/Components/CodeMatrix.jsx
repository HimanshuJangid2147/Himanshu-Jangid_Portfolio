import React, { useEffect, useRef } from 'react';

/**
 * A reusable React component that renders a "Matrix" style falling code animation
 * on a canvas. It's designed to be used as a full-screen background element.
 * @component
 */
const CodeMatrix = () => {
    // A ref to hold the canvas DOM element
    const canvasRef = useRef(null);

    // The main effect hook to set up, run, and clean up the animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Exit if the canvas is not ready

        const ctx = canvas.getContext('2d');

        // Function to handle resizing of the canvas to fit the window
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Initial resize and set up event listener for window resize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // --- Animation Logic ---
        const characters = '01{}[]()<>=+-*/&|!@#$%^';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(0);

        const draw = () => {
            // Use a semi-transparent background to create a fading trail effect for the characters
            ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set the color and font for the falling characters
            ctx.fillStyle = '#1e40af'; // A dark blue color
            ctx.font = `${fontSize}px monospace`;

            // Loop through each column to draw a character
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Use a random opacity for a more dynamic, flickering look
                ctx.fillStyle = `rgba(30, 64, 175, ${Math.random() * 0.5})`;
                ctx.fillText(text, x, y);

                // Reset the character to the top if it has gone off-screen, with a random chance
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                // Move the character down for the next frame
                drops[i]++;
            }
        };

        // Set up an interval to call the draw function repeatedly, creating the animation
        const animationInterval = setInterval(draw, 100);

        // Cleanup function: This is crucial to prevent memory leaks when the component unmounts
        return () => {
            clearInterval(animationInterval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []); // The empty dependency array [] ensures this effect runs only once when the component mounts

    // Render the canvas element that the animation will be drawn on
    return <canvas ref={canvasRef} className="absolute inset-0 opacity-10" />;
};

export default CodeMatrix;
