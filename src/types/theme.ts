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
      disabled: Interpolation<
        {
          theme?: Theme | undefined;
          as?: ElementType<any, keyof IntrinsicElements> | undefined;
        } & ClassAttributes<HTMLButtonElement> &
          ButtonHTMLAttributes<HTMLButtonElement> & { theme: Theme } & {
            theme: Theme;
          }
      >;
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
