// src/styles/muiTheme.ts
import {
  createTheme as createMui,
  responsiveFontSizes,
} from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import type { Theme as CustomTheme } from "../../types/theme";

export const createMuiTheme = (customTheme: CustomTheme) => {
  const paletteMode = customTheme.mode === "dark" ? "dark" : "light";

  const options: ThemeOptions = {
    palette: {
      mode: paletteMode,
      primary: {
        main: customTheme.colors.accent,
        contrastText: customTheme.colors.text.inverted,
      },
      secondary: {
        main: customTheme.colors.secondary,
        contrastText: customTheme.colors.text.inverted,
      },
      background: {
        default: customTheme.colors.background,
        paper: customTheme.colors.surface,
      },
      text: {
        primary: customTheme.colors.text.primary,
        secondary: customTheme.colors.text.secondary,
      },
      divider: customTheme.colors.border,
      info: { main: customTheme.colors.semantic.info },
      success: { main: customTheme.colors.semantic.success },
      warning: { main: customTheme.colors.semantic.warning },
      error: { main: customTheme.colors.semantic.error },
    },
    shape: {
      borderRadius: parseInt(customTheme.radii.md, 10) || 8,
    },
    typography: {
      fontFamily: customTheme.typography.fontFamily.primary,
      fontSize: 14,
      h1: { fontSize: "2.25rem", fontWeight: 700 },
      h2: { fontSize: "1.75rem", fontWeight: 700 },
      h3: { fontSize: "1.5rem", fontWeight: 600 },
      h4: { fontSize: "1.25rem", fontWeight: 600 },
      h5: { fontSize: "1rem", fontWeight: 600 },
      h6: { fontSize: "0.875rem", fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: customTheme.radii.md,
            padding: `8px 16px`,
          },
          containedPrimary: {
            boxShadow: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: customTheme.radii.lg,
            boxShadow: customTheme.elevations.level2,
            border: `1px solid ${customTheme.colors.border}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: customTheme.colors.surface,
            color: customTheme.colors.text.primary,
            boxShadow: "none",
            borderBottom: `1px solid ${customTheme.colors.border}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: customTheme.colors.surface,
            borderRight: `1px solid ${customTheme.colors.border}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: customTheme.radii.sm,
            },
          },
        },
      },
    },
  };

  // create theme and make responsive fonts
  const muiTheme = createMui(options);
  return responsiveFontSizes(muiTheme);
};
