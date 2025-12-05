
import React, { useEffect, useRef } from 'react';

// ==========================================
// INTERACTIVE PARTICLE FIELD (Full Page)
// ==========================================
const InteractiveParticles = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        setCanvasSize();

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                speedY: -(Math.random() * 0.5 + 0.2),
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.5 + 0.2,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.005
            });
        }
        particlesRef.current = particles;

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', setCanvasSize);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.wobble += p.wobbleSpeed;
                p.y += p.speedY;
                p.x += p.speedX + Math.sin(p.wobble) * 0.5;

                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 120;

                if (dist < maxDist && dist > 0) {
                    const force = (maxDist - dist) / maxDist;
                    const angle = Math.atan2(dy, dx);
                    p.x += Math.cos(angle) * force * 4;
                    p.y += Math.sin(angle) * force * 4;
                }

                if (p.y < -20) {
                    p.y = height + 20;
                    p.x = Math.random() * width;
                }
                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                ctx.fill();
                ctx.shadowBlur = 0;

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist2 / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                if (dist < 150 && dist > 0) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', setCanvasSize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                background: 'transparent'
            }}
        />
    );
};

export default InteractiveParticles;
