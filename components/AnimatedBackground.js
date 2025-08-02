"use client";

import { useEffect } from "react";

export default function BackgroundCanvas() {
    useEffect(() => {
        const canvas = document.getElementById("bgCanvas");
        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const shapes = ["circle", "square", "triangle"];
        const colors = ["#222", "#555", "#999"]; // Dark shapes on white

        let particles = [];

        for (let i = 0; i < 80; i++) {
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

        function drawShape(p) {
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
        }

        function animate() {
            ctx.fillStyle = "rgb(228, 233, 255)";
            ctx.fillRect(0, 0, width, height);

            for (let p of particles) {
                drawShape(p);
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            }

            requestAnimationFrame(animate);
        }

        animate();

        const resizeHandler = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <canvas id="bgCanvas" />
    );
}
