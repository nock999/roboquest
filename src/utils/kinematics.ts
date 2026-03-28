export function forwardKinematics(segments: numbcer[], jointAngles: number[]) {
  let x = 0, y = 0;
  for (let i = 0; i < segments.length; i++) {
    const angle = jointAngles.slice(0, i + 1).reduce((a, b) => a + b, 0);
    x += segments[i] * Math.cos(angle);
    y += segments[i] * Math.sin(angle);
  }
  return { x, y };
}
