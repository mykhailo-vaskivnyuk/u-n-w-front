import React, { FC, useEffect, useRef } from 'react';
import { useStyles } from './diagram.styles';

export const Diagram: FC = () => {
  const { root } = useStyles();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }, []);

  return (
    <div className={root}>
      <canvas ref={ref} width={200} height={200} />
    </div>
  );
};
