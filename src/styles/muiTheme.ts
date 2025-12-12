import { createTheme, type ThemeOptions } from "@mui/material/styles";
import type { Theme as CustomTheme } from "../types/theme";

// Convert our custom theme to MUI theme
export const createMuiTheme = (customTheme: CustomTheme) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: customTheme.colors.background === "#1A202C" ? "dark" : "light",
      primary: {
        main: customTheme.colors.accent,
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: customTheme.colors.secondary,
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
    },
    typography: {
      fontFamily: customTheme.typography.fontFamily.primary,
      fontSize: 14,
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            fontWeight: 600,
            padding: "8px 16px",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            border: `1px solid ${customTheme.colors.border}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: customTheme.colors.surface,
            color: customTheme.colors.text.primary,
            borderBottom: `1px solid ${customTheme.colors.border}`,
            boxShadow: "none",
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
    },
  };

  return createTheme(themeOptions);
};
