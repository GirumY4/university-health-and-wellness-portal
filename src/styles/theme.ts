import type { Theme } from "../types/theme";

export const lightTheme: Theme = {
  colors: {
    primary: "#2D3748",
    secondary: "#4A5568",
    accent: "#3182CE",
    background: "#FFFFFF",
    surface: "#F7FAFC",
    text: {
      primary: "#1A202C",
      secondary: "#4A5568",
      inverted: "#FFFFFF",
    },
    border: "#E2E8F0",
  },
  typography: {
    fontFamily: {
      primary: "'Inter', sans-serif",
      secondary: "'Roboto', sans-serif",
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: "#E2E8F0",
    secondary: "#CBD5E0",
    accent: "#63B3ED",
    background: "#1A202C",
    surface: "#2D3748",
    text: {
      primary: "#F7FAFC",
      secondary: "#E2E8F0",
      inverted: "#1A202C",
    },
    border: "#4A5568",
  },
};
