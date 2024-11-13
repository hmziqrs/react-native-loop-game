import { themes } from "@/engine/colors";
import { Level } from "../types";

const level: Level = {
  theme: themes.blue,
  data: [
    [
      { type: "line", values: [0, 1, 0, 0] }, // (0,0) - Right connection
      { type: "line", values: [0, 1, 0, 1] }, // (0,1) - Left & Right connections
      { type: "line", values: [0, 1, 0, 1] }, // (0,2) - Left & Right connections
      { type: "line", values: [0, 1, 0, 1] }, // (0,3) - Left & Right connections
      { type: "2-point", values: [0, 0, 1, 1] }, // (0,4) - Left & Down connections
    ],
    // Row 1
    [
      { type: "2-point", values: [0, 0, 1, 0] }, // (1,0) - Down connection
      { type: "null", values: [0, 0, 0, 0] }, // (1,1) - Null tile
      { type: "null", values: [0, 0, 0, 0] }, // (1,2) - Null tile
      { type: "null", values: [0, 0, 0, 0] }, // (1,3) - Null tile
      { type: "2-point", values: [1, 0, 1, 0] }, // (1,4) - Up & Down connections
    ],
    // Row 2
    [
      { type: "line", values: [1, 0, 1, 0] }, // (2,0) - Up & Down connections
      { type: "line", values: [0, 1, 0, 0] }, // (2,1) - Right connection
      { type: "4-point", values: [1, 1, 1, 1] }, // (2,2) - All connections
      { type: "line", values: [0, 0, 0, 1] }, // (2,3) - Left connection
      { type: "line", values: [1, 0, 1, 0] }, // (2,4) - Up & Down connections
    ],
    // Row 3
    [
      { type: "2-point", values: [1, 0, 0, 0] }, // (3,0) - Up connection
      { type: "null", values: [0, 0, 0, 0] }, // (3,1) - Null tile
      { type: "null", values: [0, 0, 0, 0] }, // (3,2) - Null tile
      { type: "null", values: [0, 0, 0, 0] }, // (3,3) - Null tile
      { type: "2-point", values: [1, 1, 0, 0] }, // (3,4) - Up & Right connections
    ],
    // Row 4
    [
      { type: "2-point", values: [1, 0, 0, 0] }, // (4,0) - Up connection
      { type: "line", values: [0, 1, 0, 0] }, // (4,1) - Right connection
      { type: "line", values: [0, 1, 0, 1] }, // (4,2) - Left & Right connections
      { type: "line", values: [0, 0, 0, 1] }, // (4,3) - Left connection
      { type: "2-point", values: [0, 0, 0, 1] }, // (4,4) - Left connection
    ],
  ],
};

export default level;
