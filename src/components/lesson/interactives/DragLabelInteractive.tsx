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