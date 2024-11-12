import { themes } from '@/engine/config/colors';
import { LevelData } from '../types';

const level: LevelData = {
  theme: themes.green,
  data: [
    [
      { type: '2-point', values: [1, 1, 0, 0] },
      { type: '2-point', values: [1, 1, 0, 0] },
      { type: '2-point', values: [1, 1, 0, 0] },
      { type: '2-point', values: [1, 1, 0, 0] },
    ],
    [
      { type: '2-point', values: [1, 1, 0, 0] },
      { type: '2-point', values: [1, 1, 0, 0] },
      { type: '2-point', values: [1, 1, 0, 0] },
      { type: '2-point', values: [1, 1, 0, 0] },
    ],
  ],
};

export default level;