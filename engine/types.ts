import Color from "color";


export type TileType = 'null' | '1-point' | '2-point' | '3-point' | '4-point' | 'line';

export interface Tile {
  type: TileType;
  values: [number, number, number, number];
}

export interface Theme {
  light: {
    primary: Color;
    accent: Color;
  };
  dark: {
    primary: Color;
    accent: Color;
  };
}


export interface LevelData {
  theme: Theme;
  data: Tile[][];
}