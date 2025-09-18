"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
    // 1. Use useRef to get a reference to the canvas element
    const canvasRef = useRef(null);

    useEffect(() => {
        // Ensure we only run this logic in the browser
        if (typeof window === "undefined") return;

        const canvas = canvasRef.current;
        if (!canvas) return; // Exit if canvas is not available yet

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // 4. Mobile Optimization: Use fewer particles on smaller screens
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 30 : 100;

        const shapes = ["circle", "square", "triangle"];
        const colors = ["rgb(55, 59, 102)", "rgb(144, 88, 208)", "rgb(74, 82, 168)"];
        let particles = [];
        let lastParticleTime = 0;
        const baseSpawnInterval = 200; // Base spawn interval

        // Encapsulate particle creation to call it on init and resize
        const initializeParticles = () => {
            particles = [];
            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);
            lastParticleTime = 0; // Reset the timer
            
            // Create initial particles scattered across the screen
            for (let i = 0; i < Math.min(particleCount, 15); i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height, // Random position across the screen
                    vx: Math.random() * 0.3 - 0.15, // Slower horizontal movement
                    vy: -(Math.random() * 1 + 0.5), // Negative velocity for upward movement, slower
                    size: Math.random() * 15 + 9,
                    shape: shapes[Math.floor(Math.random() * shapes.length)],
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        // Function to create a new particle at the bottom
        const createNewParticle = () => {
            let width = canvas.width;
            let height = canvas.height;
            
            return {
                x: Math.random() * width,
                y: height + 20, // Start below the visible area
                vx: Math.random() * 0.3 - 0.15, // Slower horizontal movement
                vy: -(Math.random() * 1 + 0.5), // Negative velocity for upward movement, slower
                size: Math.random() * 13 + 7, 
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        };

        const drawShape = (p) => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            if (p.shape === "circle") {
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === "square") {
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            } else if (p.shape === "triangle") {
                ctx.moveTo(p.x, p.y - p.size / 2);
                ctx.lineTo(p.x - p.size / 2, p.y + p.size / 2);
                ctx.lineTo(p.x + p.size / 2, p.y + p.size / 2);
                ctx.closePath();
                ctx.fill();
            }
        };

        const animate = () => {
            let width = canvas.width;
            let height = canvas.height;
            ctx.fillStyle = "white"; 
            ctx.fillRect(0, 0, width, height);

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                let p = particles[i];
                drawShape(p);
                p.x += p.vx;
                p.y += p.vy;

                // Remove particles that have moved off the top
                if (p.y + p.size / 2 < 0) {
                    particles.splice(i, 1);
                }
                // Keep particles within horizontal bounds (optional - can remove for more natural movement)
                else if (p.x + p.size / 2 < 0 || p.x - p.size / 2 > width) {
                    p.vx *= -1;
                }
            }

            // Spawn new particles at random intervals
            const currentTime = Date.now();
            const randomInterval = baseSpawnInterval + Math.random() * 300; // Add 0-300ms randomness
            if (currentTime - lastParticleTime > randomInterval && particles.length < particleCount) {
                particles.push(createNewParticle());
                lastParticleTime = currentTime;
            }

            // 5. Store the animation frame ID to cancel it on unmount
            animationFrameId = requestAnimationFrame(animate);
        };

        // 3. Debounced resize handler
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // 2. Re-initialize particles on resize to fix the bug
                initializeParticles();
            }, 250); // Wait 250ms after the user stops resizing
        };

        window.addEventListener("resize", handleResize);

        // Initial setup
        initializeParticles();
        animate();

        // Cleanup function
        return () => {
            window.removeEventListener("resize", handleResize);
            // 5. Cancel the animation frame on component unmount
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                width: '100vw',
                height: '100vh',
            }}
        />
    );
}