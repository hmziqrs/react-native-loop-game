import Color from "color";
import { Theme } from "../types";


export const themes: Record<string, Theme> = {
  pink: {
    light: {
      primary: Color.rgb(232, 208, 208),
      accent: Color.rgb(148, 86, 86),
    },
    dark: {
      primary: Color.rgb(51, 4, 4),
      accent: Color.rgb(247, 36, 36),
    },
  },
  green: {
    light: {
      primary: Color.rgb(213, 232, 208),
      accent: Color.rgb(98, 148, 86),
    },
    dark: {
      primary: Color.rgb(13, 51, 4),
      accent: Color.rgb(79, 247, 36),
    },
  },
  green1: {
    light: {
      primary: Color.rgb(223, 232, 208),
      accent: Color.rgb(125, 148, 86),
    },
    dark: {
      primary: Color.rgb(34, 51, 4),
      accent: Color.rgb(170, 247, 36),
    },
  },
  pink1: {
    light: {
      primary: Color.rgb(232, 208, 222),
      accent: Color.rgb(148, 86, 123),
    },
    dark: {
      primary: Color.rgb(51, 4, 32),
      accent: Color.rgb(247, 36, 163),
    },
  },
  green2: {
    light: {
      primary: Color.rgb(227, 232, 208),
      accent: Color.rgb(136, 148, 86),
    },
    dark: {
      primary: Color.rgb(42, 51, 4),
      accent: Color.rgb(205, 247, 36),
    },
  },
  blue: {
    light: {
      primary: Color.rgb(208, 232, 232),
      accent: Color.rgb(86, 148, 148),
    },
    dark: {
      primary: Color.rgb(4, 51, 51),
      accent: Color.rgb(36, 247, 247),
    },
  },
  green3: {
    light: {
      primary: Color.rgb(220, 232, 208),
      accent: Color.rgb(117, 148, 86),
    },
    dark: {
      primary: Color.rgb(28, 51, 4),
      accent: Color.rgb(142, 247, 36),
    },
  },
  lightBrown: {
    light: {
      primary: Color.rgb(232, 222, 208),
      accent: Color.rgb(148, 123, 86),
    },
    dark: {
      primary: Color.rgb(51, 32, 4),
      accent: Color.rgb(247, 163, 36),
    },
  },
  seaGreen: {
    light: {
      primary: Color.rgb(208, 232, 218),
      accent: Color.rgb(86, 148, 111),
    },
    dark: {
      primary: Color.rgb(4, 51, 23),
      accent: Color.rgb(36, 247, 121),
    },
  },
  purple: {
    light: {
      primary: Color.rgb(213, 208, 232),
      accent: Color.rgb(98, 86, 148),
    },
    dark: {
      primary: Color.rgb(13, 4, 51),
      accent: Color.rgb(79, 37, 247),
    },
  },
  blue1: {
    light: {
      primary: Color.rgb(208, 232, 230),
      accent: Color.rgb(86, 148, 142),
    },
    dark: {
      primary: Color.rgb(4, 51, 47),
      accent: Color.rgb(36, 247, 226),
    },
  },
};
