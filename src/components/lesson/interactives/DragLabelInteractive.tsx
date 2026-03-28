import { useEffect, useRef, useState } from 'react';
import { ComponentProps } from '...../types/components';
// Draggable label interactive for teaching label placement
export const DragLabelInteractive: React.FC<ComponentProps> = ({ data, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map);
  const [dragging, setDragging] = useState<string | null>(null);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return function() {};

    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    // Draw background
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, width, height);

    // Draw diagram and draggable labels
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px space-mono';

    // Draw items to label
    const items = data?.content?.paras || [];
    items.forEach((item, idx) => {
      const x = 100;
      const y = 100 + idx * 40;
      ctx.fillRect(x, y, 80, 30);
      ctx.fillStyle = '#000000';
      ctx.fillText(item, x + 50, y + 20);
      ctx.fillStyle = '#ffffff';
    });

    // Draw positioned labels
    for (const [path, pos] of positions.entries()) {
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(pos.x, pos.y, 70, 25);
      ctx.fillStyle = '#000000';
      ctx.fillText(path, pos.x + 25, pos.y + 15);
      ctx.fillStyle = '#ffffff';
    }
  }, [positions]);

  const handleMouseDown = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Find which label was clicked
id (dragging === null) {
      for (const [path, pos] of positions.entries()) {
        if (x > pos.x && x < pos.x + 70 && y > pos.y && y < pos.y + 25) {
          setDragging(path);
          setStartPos({ x, y });
          break;
        }
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPos = { x, y };
    setPositions(prev => new Map(prev).set(dragging, newPos));
  };

  const handleMouseUp = () => {
    setDragging(null);
    // Check if all labels are correct positions
    if (positions.size === (data?.content?.paras || []).length) {
      onComplete();
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center">
      <h3 className="text-white mb-4">Drag labels to the correct positions</h3>
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="border-2 border-gray-700 bmb-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
       />
    </div>
   // Simpler tail for now
  );
};
