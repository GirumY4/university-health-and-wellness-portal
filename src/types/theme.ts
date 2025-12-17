// src/types/theme.ts
export type ThemeMode = "light" | "dark";

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      inverted: string;
    };
    border: string;
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
    };
    sizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
