import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useTheme } from "../hooks/useTheme";
import { createMuiTheme } from "../styles/theme/muiTheme";

interface Props {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  const muiTheme = React.useMemo(() => createMuiTheme(theme), [theme]);

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};
