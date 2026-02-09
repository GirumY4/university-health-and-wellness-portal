// src/styles/theme.ts
import type { Theme } from "../../types/theme";

/**
 * Helper note:
 * - Keep these tokens expressive but stable.
 * - Colors chosen for accessible contrast; tweak to match your brand.
 */

export const lightTheme: Theme = {
  mode: "light",
  colors: {
    primary: "#2D3748", // anchor / headings
    secondary: "#4A5568", // muted heading
    accent: "#2563EB", // actionable (slightly stronger blue)
    background: "#FFFFFF",
    surface: "#F7FAFC",
    text: {
      primary: "#0F1724",
      secondary: "#475569",
      inverted: "#FFFFFF",
      muted: "#64748B",
    },
    border: "#E6EEF8",
    semantic: {
      success: "#16A34A",
      warning: "#D97706",
      error: "#DC2626",
      info: "#0284C7",
    },
    neutrals: {
      0: "#ffffff",
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F1724",
    },
  },
  typography: {
    fontFamily: {
      primary:
        "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      secondary: "'Roboto', system-ui, sans-serif",
      code: "'Source Code Pro', Menlo, monospace",
    },
    sizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      md: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      xxl: "1.5rem", // 24px
    },
    baseFontSize: "16px",
    lineHeight: 1.45,
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  radii: {
    none: "0",
    sm: "6px",
    md: "8px",
    lg: "12px",
    pill: "9999px",
    round: "50%",
  },
  elevations: {
    level1: "0 1px 2px rgba(16, 24, 40, 0.04)",
    level2: "0 4px 12px rgba(16, 24, 40, 0.06)",
    level3: "0 8px 24px rgba(16, 24, 40, 0.08)",
    level4: "0 12px 40px rgba(16, 24, 40, 0.10)",
    level5: "0 24px 80px rgba(16, 24, 40, 0.12)",
  },
  transitions: {
    short: "150ms ease",
    base: "250ms cubic-bezier(.4,0,.2,1)",
    long: "500ms cubic-bezier(.4,0,.2,1)",
  },
  motion: {
    reduce: false,
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    tooltip: 1500,
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  mode: "dark",
  colors: {
    primary: "#E6EEF8",
    secondary: "#CBD5E1",
    accent: "#63B3ED",
    background: "#0B1220",
    surface: "#0F1724",
    text: {
      primary: "#E6EEF8",
      secondary: "#94A3B8",
      inverted: "#0B1220",
      muted: "#9CA3AF",
    },
    border: "#1F2937",
    semantic: {
      success: "#34D399",
      warning: "#FBBF24",
      error: "#F87171",
      info: "#60A5FA",
    },
    neutrals: {
      0: "#0B1220",
      50: "#071018",
      100: "#0B1220",
      200: "#111827",
      300: "#1E293B",
      400: "#2D3748",
      500: "#475569",
      600: "#64748B",
      700: "#94A3B8",
      800: "#CBD5E1",
      900: "#E6EEF8",
    },
  },
  // keep typography/spacing/radii/elevations the same as light but note baseFontSize remains
  motion: {
    reduce: false,
  },
};
