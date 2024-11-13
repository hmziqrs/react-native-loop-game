import { themes } from "@/engine/colors";
import { Level } from "../types";

const level: Level = {
  theme: themes.lightBrown,
  data: [
    [
      { type: "3-point", values: [1, 1, 1, 0] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "3-point", values: [0, 1, 1, 1] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "3-point", values: [1, 1, 1, 0] },
    ],
    [
      { type: "line", values: [1, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
      { type: "line", values: [1, 0, 1, 0] },
    ],
    [
      { type: "3-point", values: [1, 1, 1, 0] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "4-point", values: [1, 1, 1, 1] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "3-point", values: [0, 1, 1, 1] },
    ],
    [
      { type: "line", values: [1, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "null", values: [0, 0, 0, 0] },
      { type: "line", values: [1, 0, 1, 0] },
    ],
    [
      { type: "3-point", values: [1, 1, 1, 0] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "3-point", values: [1, 1, 1, 0] },
      { type: "line", values: [1, 0, 1, 0] },
      { type: "3-point", values: [0, 1, 1, 1] },
    ],
  ],
};

export default level;
