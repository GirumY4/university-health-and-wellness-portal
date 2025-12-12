import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "../../hooks/useTheme";
import type { Theme } from "../../types/theme";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import { Box, Tooltip } from "@mui/material";

// --- Props Interface ---
interface HeaderProps {
  onMenuToggle: () => void;
}

// --- Styled Components ---

const HeaderContainer = styled.header<{ theme: Theme }>`
  height: 70px;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 500;
  backdrop-filter: blur(8px);
  background-color: ${(props) => `${props.theme.colors.surface}CC`};
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WelcomeText = styled.h1<{ theme: Theme }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MenuButton = styled.button<{ theme: Theme }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text.primary};
    transform: scale(1.05);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const UserBadge = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
  gap: 0.5rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: 768px) {
    display: none;
  }
`;

const ThemeToggleButton = styled.button<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accent};
    transform: scale(1.05);
  }
`;

const LogoutButton = styled.button<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.secondary};
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #e53e3e;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(229, 62, 62, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const MobileUserBadge = styled.div<{ theme: Theme }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

// --- Component ---

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { theme, toggleTheme, themeMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isDarkMode = themeMode === "dark";

  // Get user initials for mobile display
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <HeaderContainer theme={theme}>
      <HeaderLeft>
        <Tooltip title={isDarkMode ? "Open menu" : "Open menu"} arrow>
          <MenuButton theme={theme} onClick={onMenuToggle}>
            <Icon name="Menu" sx={{ fontSize: 24 }} />
          </MenuButton>
        </Tooltip>
        <WelcomeText theme={theme}>
          {user?.role === "admin"
            ? "Clinic Admin Portal"
            : "BiT Health Dashboard"}
        </WelcomeText>
      </HeaderLeft>

      <HeaderRight>
        {/* Theme Toggle */}
        <Tooltip
          title={`Switch to ${isDarkMode ? "Light Mode" : "Dark Mode"}`}
          arrow
        >
          <ThemeToggleButton
            theme={theme}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? "Light Mode" : "Dark Mode"}`}
          >
            <Icon
              name={isDarkMode ? "LightMode" : "DarkMode"}
              sx={{ fontSize: 20 }}
            />
          </ThemeToggleButton>
        </Tooltip>

        {/* Desktop User Badge */}
        <UserBadge theme={theme}>
          <Icon name="Person" sx={{ fontSize: 18 }} />
          {user?.name}
        </UserBadge>

        {/* Mobile User Badge */}
        <MobileUserBadge theme={theme}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: theme.colors.accent + "20",
              color: theme.colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            {getUserInitials()}
          </Box>
        </MobileUserBadge>

        {/* Logout Button */}
        <Tooltip title="Logout" arrow>
          <LogoutButton theme={theme} onClick={handleLogout}>
            <Icon name="Logout" sx={{ fontSize: 18 }} />
            <span>Logout</span>
          </LogoutButton>
        </Tooltip>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
