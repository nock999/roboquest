import { useState, useEffect } from 'react';

interface Sensor {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
}

export function SensorReadingInteractive({ onComplete }) {
  const [sensors, setSensors] = useState<Sensor[]>([
    { id: 's1', name: 'Ultrasonic Sensor', value: 100, unit: 'cm', min: 0, max: 400 },
    { id: 's2', name: 'GYRO Sensor', value: 45.0, unit: 'ð', min: 0, max: 360 },
  ]);
}
