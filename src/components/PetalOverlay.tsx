import { useEffect, useRef } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  delay: number;
}

const COLORS = ['#ff8fab', '#ffb347', '#ff6b9d', '#ffd700', '#ff4d8f', '#ffaa33'];

function createPetal(id: number): Petal {
  return {
    id,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    size: 6 + Math.random() * 10,
    speed: 0.3 + Math.random() * 0.5,
    drift: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 3,
    opacity: 0.5 + Math.random() * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 5,
  };
}

export default function PetalOverlay({ isMobile = false }: { isMobile?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize petals
    petalsRef.current = Array.from({ length: 20 }, (_, i) => createPetal(i));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawPetalShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.45, size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = (timestamp: number) => {
      if (!canvas.width || !canvas.height) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current = timestamp;

      petalsRef.current.forEach(petal => {
        if (timestamp / 1000 < petal.delay) return;

        petal.y += petal.speed;
        petal.x += petal.drift + Math.sin(timestamp * 0.001 + petal.id) * 0.15;
        petal.rotation += petal.rotSpeed;

        if (petal.y > canvas.height + 20) {
          const fresh = createPetal(petal.id);
          fresh.y = -10;
          fresh.delay = 0;
          Object.assign(petal, fresh);
        }

        drawPetalShape(
          ctx,
          (petal.x / 100) * canvas.width,
          petal.y,
          petal.size,
          petal.rotation,
          petal.color,
          petal.opacity
        );
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: isMobile ? '100%' : '60%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
