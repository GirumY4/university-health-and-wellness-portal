// src/contexts/ThemeContext.tsx
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ThemeMode } from "../types/theme";
import type { Theme as CustomTheme } from "../types/theme";
import { lightTheme, darkTheme } from "../styles/theme/theme";

export interface ThemeContextType {
  theme: CustomTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Optional default mode override — helpful for SSR or tests
   */
  defaultMode?: ThemeMode;
}

const THEME_KEY = "theme-mode";

// Apply tokens as CSS variables on document.documentElement
const applyCssVars = (theme: CustomTheme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // top-level color vars
  root.style.setProperty("--color-primary", theme.colors.primary);
  root.style.setProperty("--color-secondary", theme.colors.secondary);
  root.style.setProperty("--color-accent", theme.colors.accent);
  root.style.setProperty("--color-background", theme.colors.background);
  root.style.setProperty("--color-surface", theme.colors.surface);
  root.style.setProperty("--color-border", theme.colors.border);

  // text
  root.style.setProperty("--text-primary", theme.colors.text.primary);
  root.style.setProperty("--text-secondary", theme.colors.text.secondary);
  root.style.setProperty("--text-inverted", theme.colors.text.inverted);
  root.style.setProperty(
    "--text-muted",
    theme.colors.text.muted || theme.colors.text.secondary
  );

  // semantic
  root.style.setProperty("--color-success", theme.colors.semantic.success);
  root.style.setProperty("--color-warning", theme.colors.semantic.warning);
  root.style.setProperty("--color-error", theme.colors.semantic.error);
  root.style.setProperty("--color-info", theme.colors.semantic.info);

  // neutrals (expose some commonly used)
  Object.entries(theme.colors.neutrals).forEach(([k, v]) => {
    root.style.setProperty(`--neutral-${k}`, v);
  });

  // spacing
  Object.entries(theme.spacing).forEach(([k, v]) => {
    root.style.setProperty(`--space-${k}`, v);
  });

  // radii
  Object.entries(theme.radii).forEach(([k, v]) => {
    root.style.setProperty(`--radius-${k}`, v);
  });

  // elevations (shadows)
  Object.entries(theme.elevations).forEach(([k, v]) => {
    root.style.setProperty(`--elevation-${k}`, v);
  });

  // typography
  root.style.setProperty(
    "--font-family-primary",
    theme.typography.fontFamily.primary
  );
  root.style.setProperty(
    "--font-family-secondary",
    theme.typography.fontFamily.secondary
  );
  root.style.setProperty("--base-font-size", theme.typography.baseFontSize);
  root.style.setProperty("--line-height", String(theme.typography.lineHeight));

  // transitions
  Object.entries(theme.transitions).forEach(([k, v]) => {
    root.style.setProperty(`--transition-${k}`, v);
  });

  // update meta theme-color for browsers
  const meta = document.querySelector(
    'meta[name="theme-color"]'
  ) as HTMLMetaElement | null;
  if (meta) {
    meta.content = theme.colors.background;
  } else {
    const m = document.createElement("meta");
    m.name = "theme-color";
    m.content = theme.colors.background;
    document.head.appendChild(m);
  }

  // set data-theme attribute for CSS selectors
  root.setAttribute("data-theme", theme.mode);
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode,
}) => {
  const getPreferredMode = useCallback((): ThemeMode => {
    // Try localStorage, then system preference, then default (dark)
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem(THEME_KEY) : null;
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // ignore localStorage errors (e.g. private mode)
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }

    return defaultMode || "dark";
  }, [defaultMode]);

  const [themeMode, setThemeMode] = useState<ThemeMode>(() =>
    getPreferredMode()
  );

  // chosen theme object
  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, themeMode);
    } catch {
      // ignore storage write errors
    }
    // apply CSS variables and attribute
    applyCssVars(theme);
  }, [themeMode, theme]);

  // listen for system changes (optional: only when user hasn't explicitly chosen)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (event: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem(THEME_KEY);
        if (!saved) {
          setThemeMode(event.matches ? "dark" : "light");
        }
      } catch {
        // ignore storage errors
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  const toggleTheme = () =>
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, toggleTheme, setThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
