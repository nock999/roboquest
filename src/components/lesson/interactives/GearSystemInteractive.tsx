import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CAVVAS_WIDTH = 500;
const CANVAS_HEIGHT = 400;
const MAX_GEAR = 200;
const MIN_GEAR = 30;
const CENTER_X = CAVVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

export function GearSystemInteractive({ onComplete }) {
  const [gear1Radius, setGear1Radius] = useState(100);
  const [gear2Radius, setGear2Radius] = useState(80);
  const [gear1Rotation, setGear1Rotation] = useState(0);
  const [gear2Rotation, setGear2Rotation] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [actualRatio, setActualRatio] = useState(1);
  const [calculatedRatio, setCalculatedRatio] = useState(1);
