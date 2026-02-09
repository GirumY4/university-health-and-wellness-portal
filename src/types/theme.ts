// src/types/theme.ts
export type ThemeMode = "light" | "dark";

export interface ColorText {
  primary: string;
  secondary: string;
  inverted: string;
  muted?: string;
}

export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface Neutrals {
  0: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface TypographySizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface FontFamily {
  primary: string;
  secondary: string;
  code?: string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl?: string;
}

export interface Radii {
  none: string;
  sm: string;
  md: string;
  lg: string;
  pill: string;
  round: string;
}

export interface Elevations {
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string; // primary brand color
    secondary: string;
    accent: string; // used for actionable UI elements
    background: string;
    surface: string;
    text: ColorText;
    border: string;
    semantic: SemanticColors;
    neutrals: Neutrals;
  };
  typography: {
    fontFamily: FontFamily;
    sizes: TypographySizes;
    baseFontSize: string; // root font-size (e.g. "16px")
    lineHeight: number;
  };
  spacing: SpacingScale;
  radii: Radii;
  elevations: Elevations;
  transitions: {
    short: string;
    base: string;
    long: string;
  };
  motion: {
    reduce: boolean;
  };
  zIndex?: {
    appBar?: number;
    drawer?: number;
    modal?: number;
    tooltip?: number;
  };
}
