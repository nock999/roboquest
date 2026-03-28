import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Label {
  id: string;
  name: string;
  placed: boolean;
  position?: { x: number; y: number };
}

interface DragLabelInteractiveProps {
  params: Record<string, unknown>;
  onComplete: (success: boolean) => void;
}

export function DragLabelInteractive({ onComplete }: DragLabelInteractiveProps) {
  const [labels, setLabels] = useState<Label[]>([
    { id: 'sensors', name: 'Sensors', placed: false },
    { id: 'processor', name: 'Processor', placed: false },
    { id: 'actuators', name: 'Actuators', placed: false },
    { id: 'power', name: 'Power', placed: false },
  ]);
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  // Target zones for each label
  const targets: Record<string, { x: number; y: number; label: string }> = {
    sensors: { x: 120, y: 80, label: 'Head' },
    processor: { x: 200, y: 200, label: 'Body' },
    actuators: { x: 200, y: 280, label: 'Legs' },
    power: { x: 280, y: 240, label: 'Body' },
  };

  const handleLabelClick = (labelId: string) => {
    setDraggedLabel(labelId);
  };

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggedLabel) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if close to a target (within 40px)
    const target = targets[draggedLabel];
    if (target) {
      const distance = Math.hypot(x - target.x, y - target.y);
      if (distance < 40) {
        setLabels((prev) =>
          prev.map((label) =>
            label.id === draggedLabel
              ? { ...label, placed: true, position: target }
              : label,
          ),
        );
        setFeedback((prev) => ({ ...prev, [draggedLabel]: true }));
      }
    }

    setDraggedLabel(null);
  };

  // Check completion
  useEffect(() => {
    if (labels.every((label) => label.placed)) {
      onComplete(true);
    }
  }, [labels, onComplete]);

  return (
    <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canvas */}
        <div className="flex items-center justify-center">
          <svg
            width="300"
            height="400"
            viewBox="0 0 300 400"
            className="border border-dark-600 rounded-lg bg-dark-900 cursor-crosshair"
            onClick={handleCanvasClick}
          >
            {/* Robot SVG */}
            {/* Head */}
            <circle
              cx="150"
              cy="80"
              r="30"
              fill="none"
              stroke={feedback['sensors'] ? '#10b981' : '#6b7280'}
              strokeWidth="2"
            />

            {/* Body */}
            <rect
              x="130"
              y="130"
              width="40"
              height="90"
              fill="none"
              stroke={
                feedback['processor'] || feedback['power'] ? '#10b981' : '#6b7280'
              }
              strokeWidth="2"
            />

            {/* Left Arm */}
            <rect
              x="90"
              y="150"
              width="40"
              height="15"
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
            />

            {/* Right Arm */}
            <rect
              x="170"
              y="150"
              width="40"
              height="15"
              fill="none"
              stroke={feedback['actuators'] ? '#10b981' : '#6b7280'}
              strokeWidth="2"
            />

            {/* Left Leg */}
            <rect
              x="120"
              y="240"
              width="15"
              height="50"
              fill="none"
              stroke={feedback['actuators'] ? '#10b981' : '#6b7280'}
              strokeWidth="2"
            />

            {/* Right Leg */}
            <rect
              x="165"
              y="240"
              width="15"
              height="50"
              fill="none"
              stroke={feedback['actuators'] ? '#10b981' : '#6b7280'}
              strokeWidth="2"
            />

            {/* Target zones (guides) */}
            <circle cx="150" cy="80" r="45" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
            <circle cx="150" cy="175" r="45" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
            <circle cx="127" cy="290" r="45" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />

            {/* Placed labels */}
            {labels
              .filter((label) => label.placed && label.position)
              .map((label) => (
                <text
                  key={label.id}
                  x={label.position!.x}
                  y={label.position!.y}
                  textAnchor="middle"
                  dy="0.3em"
                  fontSize="12"
                  fill="#10b981"
                  fontWeight="bold"
                >
                  {label.name}
                </text>
              ))}
          </svg>
        </div>

        {/* Label Palette */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">Tap a label, then tap on the robot:</h3>
          <div className="grid grid-cols-2 gap-3">
            {labels.map((label) => (
              <motion.button
                key={label.id}
                onClick={() => handleLabelClick(label.id)}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  label.placed
                    ? 'bg-success-500 text-white'
                    : draggedLabel === label.id
                      ? 'bg-primary-500 text-white scale-105 ring-2 ring-primary-400'
                      : 'bg-dark-700 text-dark-200 hover:bg-dark-600'
                } active:scale-95 touch-target`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label.placed && <span className="mr-2">✓</span>}
                {label.name}
              </motion.button>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-6 p-4 bg-dark-900 rounded-lg border border-dark-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-dark-300 text-sm">Progress:</span>
              <span className="text-primary-400 font-semibold">
                {labels.filter((l) => l.placed).length}/{labels.length}
              </span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(labels.filter((l) => l.placed).length / labels.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <p className="text-dark-400 text-sm mt-4">
            Drag each component label to the correct part of the robot.
          </p>
        </div>
      </div>
    </div>
  );
}
