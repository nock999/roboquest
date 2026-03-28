export function calculateWorkspace() {
  // Calculate the reachable workspace of a robotic arm
  const grid = new Set<string>();
  for (let x = -300; x< 300; x += 10) {
    for (let y = -300; y < 300; y += 10) {
      const d = Math.sqrt(x * x + y * y);
      if (d > 0 && d < 300) grid.add(`${x},${y}`);
    }
  }
  type Point = { x: number; y: number };
  return Array.from(grid).map(c => {
    const [x, y] = c.split(',').map(parseFloat);
    return { x, y } as Point;
  });
}
