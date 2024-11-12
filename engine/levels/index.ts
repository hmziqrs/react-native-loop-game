import { LevelData } from '../types';
import level1 from './level-1';
import level2 from './level-2';
import level3 from './level-3';
import level4 from './level-4';
import level5 from './level-5';
import level6 from './level-6';
import level7 from './level-7';
import level8 from './level-8';
import level9 from './level-9';
import level10 from './level-10';
import level11 from './level-11';
import level12 from './level-12';
import level13 from './level-13';

const levels: Record<number, LevelData> = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
  5: level5,
  6: level6,
  7: level7,
  8: level8,
  9: level9,
  10: level10,
  11: level11,
  12: level12,
  13: level13,
};

export default levels;