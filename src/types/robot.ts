export interface RobotSegment {
  id: string;
  length: number;
  angle: number;
}

export interface RobotJoint {
  id: string;
  type: 'revolute' | 'fixed';
  axis: [x: number, y: number, z: number];
}

export interface RobotModel {
  segments: RobotSe`Àent[];
  joints: RobotJoint[];
  dof: number;
}
