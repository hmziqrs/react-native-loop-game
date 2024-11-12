import { BoxType } from "./types";

export const MAX_WIDTH = 800;
export const MAX_HEIGHT = 900;

export const TYPES = [
  {
    key: "null",
    value: [0, 0, 0, 0],
  },
  {
    key: "line",
    value: [1, 0, 1, 0],
  },
  {
    key: "1-point",
    value: [1, 0, 0, 0],
  },
  {
    key: "2-point",
    value: [1, 1, 0, 0],
  },
  {
    key: "3-point",
    value: [1, 1, 1, 0],
  },
  {
    key: "4-point",
    value: [1, 1, 1, 1],
  },
];

export const value2RotationMap: Record<BoxType, Record<string, number>> = {
  line: {
    "1010": 0,
    "0101": 1,
  },
  "1-point": {
    "1000": 0,
    "0100": 1,
    "0010": 2,
    "0001": 3,
  },
  "2-point": {
    "1100": 0,
    "0110": 1,
    "0011": 2,
    "1001": 3,
  },
  "3-point": {
    "1110": 0,
    "0111": 1,
    "1011": 2,
    "1101": 3,
  },
  "4-point": {
    "1111": 0,
  },
  null: {
    "0000": 0,
  },
};
