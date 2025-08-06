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
        const particleCount = isMobile ? 30 : 80;

        const shapes = ["circle", "square", "triangle"];
        const colors = ["#222", "#555", "#999"];
        let particles = [];

        // Encapsulate particle creation to call it on init and resize
        const initializeParticles = () => {
            particles = [];
            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: Math.random() * 0.7 - 0.3,
                    vy: Math.random() * 0.7 - 0.3,
                    size: Math.random() * 10 + 5,
                    shape: shapes[Math.floor(Math.random() * shapes.length)],
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
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
            ctx.fillStyle = "rgb(228, 233, 255)"; 
            ctx.fillRect(0, 0, width, height);

            for (let p of particles) {
                drawShape(p);
                p.x += p.vx;
                p.y += p.vy;

                if (p.x + p.size / 2 < 0 || p.x - p.size / 2 > width) p.vx *= -1;
                if (p.y + p.size / 2 < 0 || p.y - p.size / 2 > height) p.vy *= -1;
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