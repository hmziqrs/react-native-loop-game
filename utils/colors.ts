import Color from "color";

export const createColorVariants = (baseColor: string) => {
  const color = Color(baseColor);

  return {
    light: color.lighten(0.2).rgb().string(),
    DEFAULT: color.rgb().string(),
    dark: color.darken(0.2).rgb().string(),
    alpha: (value: number) => color.alpha(value).rgb().string(),
  };
};

export const getContrastColor = (backgroundColor: string) => {
  const color = Color(backgroundColor);
  return color.isLight() ? "#000000" : "#FFFFFF";
};
