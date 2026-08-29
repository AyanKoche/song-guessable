import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../services/audioEngine';

interface VisualizerCanvasProps {
  isPlaying: boolean;
  activeColor?: string;
}

export const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({
  isPlaying,
  activeColor = '#00f59b',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const analyser = audioEngine.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    let idleAngle = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.28;

      ctx.clearRect(0, 0, width, height);

      if (isPlaying && analyser) {
        analyser.getByteFrequencyData(dataArray);

        // Circular spectrum visualizer
        const numBars = 48;
        const barWidth = 3.5;
        const angleStep = (Math.PI * 2) / numBars;

        for (let i = 0; i < numBars; i++) {
          const value = dataArray[i * 2] || 0;
          const barHeight = Math.max(4, (value / 255) * (radius * 0.85));
          const angle = i * angleStep;

          const x1 = centerX + Math.cos(angle) * (radius - 2);
          const y1 = centerY + Math.sin(angle) * (radius - 2);
          const x2 = centerX + Math.cos(angle) * (radius + barHeight);
          const y2 = centerY + Math.sin(angle) * (radius + barHeight);

          // Gradient color based on frequency
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, `${activeColor}80`);
          gradient.addColorStop(1, '#00e5ff');

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = barWidth;
          ctx.lineCap = 'round';
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 14, 24, 0.95)';
        ctx.fill();
        ctx.strokeStyle = `${activeColor}60`;
        ctx.lineWidth = 2;
        ctx.stroke();

      } else {
        // Ambient idle breathing waves
        idleAngle += 0.02;
        const numRings = 3;

        for (let r = 0; r < numRings; r++) {
          const ringRadius = radius - 15 + r * 12 + Math.sin(idleAngle + r) * 3;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 - r * 0.015})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Center vinyl core
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 20, 32, 0.9)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, activeColor]);

  return (
    <div
      style={{
        position: 'relative',
        width: '260px',
        height: '260px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        width={260}
        height={260}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
