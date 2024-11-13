import { themes } from "@/engine/colors";
import { Level } from "../types";

const level: Level = {
  theme: themes.purple,
  data: [
    [
      { type: "null", values: [0, 0, 0, 0] },
      { type: "1-point", values: [1, 0, 0, 0] },
      { type: "null", values: [0, 0, 0, 0] },
      { type: "1-point", values: [1, 0, 0, 0] },
      { type: "null", values: [0, 0, 0, 0] },
    ],
    [
      { type: "1-point", values: [0, 1, 0, 0] },
      { type: "3-point", values: [1, 1, 1, 0] },
      { type: "1-point", values: [0, 1, 0, 0] },
      { type: "3-point", values: [1, 1, 1, 0] },
      { type: "1-point", values: [0, 1, 0, 0] },
    ],
    [
      { type: "null", values: [0, 0, 0, 0] },
      { type: "1-point", values: [0, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
      { type: "1-point", values: [0, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
    ],
    [
      { type: "1-point", values: [0, 0, 0, 1] },
      { type: "3-point", values: [0, 1, 1, 1] },
      { type: "1-point", values: [0, 0, 0, 1] },
      { type: "3-point", values: [0, 1, 1, 1] },
      { type: "1-point", values: [0, 0, 0, 1] },
    ],
    [
      { type: "null", values: [0, 0, 0, 0] },
      { type: "1-point", values: [0, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
      { type: "1-point", values: [0, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
    ],
  ],
};

export default level;
