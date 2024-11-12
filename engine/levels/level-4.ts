import { themes } from '@/engine/config/colors';
import { LevelData } from '../types';

const level: LevelData = {
  theme: themes.pink1,
  data: [
    [
      { type: '1-point', values: [1, 0, 0, 0] },
      { type: '1-point', values: [1, 0, 0, 0] },
    ],
    [
      { type: 'line', values: [1, 0, 1, 0] },
      { type: 'line', values: [0, 1, 0, 1] },
    ],
    [
      { type: '1-point', values: [1, 0, 0, 0] },
      { type: '1-point', values: [1, 0, 0, 0] },
    ],
  ],
};

export default level;