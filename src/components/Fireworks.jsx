import { useEffect, useRef } from 'react';
import './Fireworks.css';

const Fireworks = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const rocketsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Classe Partícula
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
        this.radius = Math.random() * 2 + 1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.velocity.y += 0.05; // gravidade
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }
    }

    // Classe Foguete
    class Rocket {
      constructor(x, targetY) {
        this.x = x;
        this.y = canvas.height;
        this.targetY = targetY;
        this.velocity = { x: 0, y: -8 };
        this.exploded = false;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
      }

      draw() {
        if (!this.exploded) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.restore();
        }
      }

      update() {
        if (!this.exploded) {
          this.y += this.velocity.y;
          if (this.y <= this.targetY) {
            this.explode();
          }
        }
      }

      explode() {
        this.exploded = true;
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(new Particle(this.x, this.y, this.color));
        }
      }
    }

    // Função de animação
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Atualizar e desenhar partículas
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update();
        particle.draw();
        return particle.alpha > 0;
      });

      // Atualizar e desenhar foguetes
      rocketsRef.current = rocketsRef.current.filter(rocket => {
        rocket.update();
        rocket.draw();
        return !rocket.exploded || particlesRef.current.length > 0;
      });

      // Adicionar novos foguetes aleatoriamente
      if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width;
        const targetY = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
        rocketsRef.current.push(new Rocket(x, targetY));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animação
    animate();

    // Encerrar após 8 segundos
    const timeout = setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (onComplete) {
        onComplete();
      }
    }, 8000);

    // Redimensionar canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <div className="fireworks-container">
      <canvas ref={canvasRef} className="fireworks-canvas" />
      <div className="fireworks-message">
        <h1 className="fireworks-title">🎆 Feliz 2026! 🎆</h1>
        <p className="fireworks-subtitle">Nosso ano chegou!</p>
      </div>
    </div>
  );
};

export default Fireworks;
