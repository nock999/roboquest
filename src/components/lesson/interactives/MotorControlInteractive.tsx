import { useState, useEffect } from 'react';

const MAX_POWER = 100;

interface Motor {
  id: string;
  name: string;
  power: number;
  direction: 'forward' | 'reverse';
  rPM: number;
}

export function MotorControlInteractive({ onComplete }) {
  const [motors, setMotors] = useState<Motor[]>([
    { id: 'm1', name: 'Left Motor', power: 0, direction: 'forward', rPM: 0 },
    { id: 'm2', name: 'Right Motor', power: 0, direction: 'forward', rPM: 0 },
  ]);

  const updateMotor = (motorId, power, direction) => {
    setMotors((prev) =>
      prev.map((m) =>
        m.id === motorId
          ? { ...m, power, direction, rPM: power * 150 }
          : m
      )
    );
  };

  const checkComplete = () => {
    if (motors.every((m) => m.power > 50 && m.direction === 'forward')) {
      onComplete(true);
    }
  };
}
