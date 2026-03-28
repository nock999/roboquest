import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Joint {
  id: string;
  type: 'revolute' | 'fixed';
  angle: number;
}

interface DOFInteractiveProps {
  params: Record<string, unknown>;
  onComplete: (success: boolean) => void;
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 400;

export function DOFInteractive({ onComplete }: DOFInteractiveProps) {
  const [joints, setJoints] = useState<Joint[]>([
    { id: 'J1', type: 'revolute', angle: 0 },
    { id: 'J2', type: 'fixed', angle: 0 },
    { id: 'J3', type: 'fixed', angle: 0 },
  ]);

  // Segment lengths
  const segmentLengths = [100, 80, 60];

  // Calculate DOF using Gruebler's formula
  // DOF = 3n - 2j - h where n=segments, j=joints, h=passive constraints
  // Simplified: DOF = sum of revolute joints DOF
  const dof = joints.filter((j) => j.type === 'revolute').length;

  // Calculate reachable workspace as circle union
  const calculateWorkspace = () => {
    const points: Array<{ x: number; y: number }> = [];

    // Base at origin
    const baseX = CANVAS_WIDTH / 2;
    const baseY = CANVAS_HEIGHT / 2;

    // For each combination of joint angles
    const steps = 16;
    for (let i1 = 0; i1 < steps; i1++) {
      for (let i2 = 0; i2 < (joints[1].type === 'revolute' ? steps : 1); i2++) {
        for (let i3 = 0; i3 < (joints[2].type === 'revolute' ? steps : 1); i3++) {
          const a1 = (i1 / steps) * Math.PI * 2;
          const a2 = (i2 / steps) * Math.PI * 2;
          const a3 = (i3 / steps) * Math.PI * 2;

          let x = baseX;
          let y = baseY;

          // First segment
          if (joints[0].type === 'revolute') {
            x += segmentLengths[0] * Math.cos(a1);
            y += segmentLengths[0] * Math.sin(a1);
          } else {
            x += segmentLengths[0];
          }

          // Second segment
          let angle = joints[0].type === 'revolute' ? a1 : 0;
          if (joints[1].type === 'revolute') {
            angle += a2;
            x += segmentLengths[1] * Math.cos(angle);
            y += segmentLengths[1] * Math.sin(angle);
          } else {
            x += segmentLengths[1] * Math.cos(angle);
            y += segmentLengths[1] * Math.sin(angle);
          }

          // Third segment
          if (joints[2].type === 'revolute') {
            angle += a3;
            x += segmentLengths[2] * Math.cos(angle);
            y += segmentLengths[2] * Math.sin(angle);
          } else {
            x += segmentLengths[2] * Math.cos(angle);
            y += segmentLengths[2] * Math.sin(angle);
          }

          points.push({ x, y });
        }
      }
    }

    return points;
  };

  const workspacePoints = calculateWorkspace();

  // Toggle joint type
  const toggleJoint = (jointId: string) => {
    setJoints((prev) =>
      prev.map((joint) =>
        joint.id === jointId
          ? {
              ...joint,
              type: joint.type === 'revolute' ? 'fixed' : 'revolute',
            }
          : joint,
      ),
    );
  };

  // Check completion
  useEffect(() => {
    if (dof === 3) {
      onComplete(true);
    }
  }, [dof, onComplete]);

  // Draw arm segments
  const drawArm = () => {
    const baseX = CANVAS_WIDTH / 2;
    const baseY = CANVAS_HEIGHT / 2;
    const segments = [];
    let x = baseX;
    let y = baseY;
    let angle = 0;

    for (let i = 0; i < joints.length; i++) {
      const nextX = x + segmentLengths[i] * Math.cos(angle);
      const nextY = y + segmentLengths[i] * Math.sin(angle);

      segments.push(
        <g key={`segment-${i}`}>
          {/* Segment line */}
          <line
            x1={x}
            y1={y}
            x2={nextX}
            y2={nextY}
            stroke={['#3b82f6', '#8b5cf6', '#ec4899'][i]}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Joint circle */}
          <circle
            cx={x}
            cy={y}
            r="8"
            fill={joints[i].type === 'revolute' ? '#10b981' : '#ef4444'}
            stroke="white"
            strokeWidth="2"
          />

          {/* Joint label */}
          <text
            x={x}
            y={y - 20}
            textAnchor="middle"
            fontSize="12"
            fill="white"
            fontWeight="bold"
            className="pointer-events-none"
          >
            {joints[i].id}
          </text>
        </g>,
      );

      // Update position and angle for next segment
      x = nextX;
      y = nextY;

      if (joints[i].type === 'revolute') {
        angle += Math.PI / 6; // 30 degree spread for visualization
      }
    }

    // End effector
    segments.push(
      <g key="end-effector">
        <circle cx={x} cy={y} r="6" fill="#fbbf24" stroke="white" strokeWidth="2" />
        <text
          x={x}
          y={y - 20}
          textAnchor="middle"
          fontSize="12"
          fill="#fbbf24"
          fontWeight="bold"
          className="pointer-events-none"
        >
          End
        </text>
      </g>,
    );

    return segments;
  };

  return (
    <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canvas */}
        <div className="flex items-center justify-center">
          <svg
            width="500"
            height="400"
            viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
            className="border border-dark-600 rounded-lg bg-dark-900"
          >
            {/* Workspace area */}
            {workspacePoints.length > 0 && (
              <g opacity="0.2">
                {workspacePoints.map((point, idx) => (
                  <circle
                    key={`workspace-${idx}`}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#8b5cf6"
                  />
                ))}
              </g>
            )}

            {/* Workspace boundary (convex hull approximation) */}
            {workspacePoints.length > 0 && (
              <polyline
                points={workspacePoints
                  .map((p) => `${p.x},${p.y}`)
                  .join(' ')}
                fill="#8b5cf6"
                fillOpacity="0.1"
                stroke="#8b5cf6"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            )}

            {/* Base point */}
            <circle
              cx={CANVAS_WIDTH / 2}
              cy={CANVAS_HEIGHT / 2}
              r="5"
              fill="#f59e0b"
              stroke="white"
              strokeWidth="2"
            />

            {/* Arm */}
            {drawArm()}

            {/* Title */}
            <text
              x={CANVAS_WIDTH / 2}
              y="25"
              textAnchor="middle"
              fontSize="14"
              fill="#d1d5db"
              fontWeight="bold"
              className="pointer-events-none"
            >
              Degrees of Freedom: {dof}
            </text>
          </svg>
        </div>

        {/* Control Panel */}
        <div className="flex flex-col gap-4">
          {/* DOF Display */}
          <motion.div
            className={`p-4 rounded-lg border ${
              dof === 3
                ? 'bg-success-500/20 border-success-500'
                : dof < 3
                  ? 'bg-accent-500/20 border-accent-500'
                  : 'bg-red-500/20 border-red-500'
            }`}
            animate={{ scale: 1 }}
          >
            <p className="text-sm text-dark-300 mb-1">Total DOF:</p>
            <motion.p
              className={`text-4xl font-bold font-mono ${
                dof === 3
                  ? 'text-success-400'
                  : dof < 3
                    ? 'text-accent-400'
                    : 'text-red-400'
              }`}
              animate={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              key={dof}
            >
              {dof}
            </motion.p>
            {dof === 3 && (
              <p className="text-xs text-success-300 mt-2">✓ Target achieved!</p>
            )}
          </motion.div>

          {/* Joint toggles */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Joint Configuration:</h3>
            <div className="space-y-2">
              {joints.map((joint) => (
                <motion.button
                  key={joint.id}
                  onClick={() => toggleJoint(joint.id)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-between active:scale-95 touch-target ${
                    joint.type === 'revolute'
                      ? 'bg-success-500/20 border border-success-500 text-success-300'
                      : 'bg-red-500/20 border border-red-500 text-red-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{joint.id}:</span>
                  <span className="text-sm font-mono">
                    {joint.type === 'revolute' ? '⟳ Revolute' : '◼ Fixed'}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* DOF Calculation */}
          <div className="p-4 bg-dark-900 rounded-lg border border-dark-700">
            <h3 className="text-sm font-semibold text-white mb-2">How it works:</h3>
            <p className="text-xs text-dark-300 mb-3">
              Each revolute (rotating) joint adds 1 degree of freedom. Fixed joints constrain motion.
            </p>
            <div className="space-y-1 text-xs font-mono text-dark-400">
              <div>Revolute joints: {joints.filter((j) => j.type === 'revolute').length}</div>
              <div>Fixed joints: {joints.filter((j) => j.type === 'fixed').length}</div>
              <div className="border-t border-dark-600 mt-1 pt-1">
                Total DOF = {joints.filter((j) => j.type === 'revolute').length}
              </div>
            </div>
          </div>

          {/* Goal */}
          <div className="p-4 bg-dark-900 rounded-lg border border-dark-700">
            <h3 className="text-sm font-semibold text-white mb-2">Goal:</h3>
            <p className="text-dark-300 text-sm mb-3">
              Configure the robot arm to have exactly 3 degrees of freedom.
            </p>
            <div className="flex items-center gap-2">
              {dof === 3 ? (
                <>
                  <span className="text-success-400 text-lg">✓</span>
                  <span className="text-success-400 font-semibold text-sm">
                    Complete!
                  </span>
                </>
              ) : (
                <>
                  <span className="text-dark-500 text-sm">
                    {dof < 3 ? `Need ${3 - dof} more` : `Remove ${dof - 3}`} revolute
                    {dof === 2 ? ' joint' : ' joints'}
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-dark-400 text-sm">
            Toggle joints between revolute (moving) and fixed (locked).
          </p>
        </div>
      </div>
    </div>
  );
}
