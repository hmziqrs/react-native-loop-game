import { themes } from '@/engine/config/colors';
import { LevelData } from '../types';

const level: LevelData = {
  theme: themes.green1,
  data: [
    [
      { type: '2-point', values: [1, 1, 0, 0] },
      { type: '3-point', values: [1, 1, 0, 1] },
      { type: '2-point', values: [1, 1, 0, 0] },
    ],
    [
      { type: '3-point', values: [1, 1, 0, 1] },
      { type: '4-point', values: [1, 1, 1, 1] },
      { type: '3-point', values: [0, 1, 1, 1] },
    ],
    [
      { type: '2-point', values: [0, 0, 1, 1] },
      { type: '3-point', values: [0, 1, 1, 1] },
      { type: '2-point', values: [1, 0, 0, 1] },
    ],
  ],
};

export default level;
