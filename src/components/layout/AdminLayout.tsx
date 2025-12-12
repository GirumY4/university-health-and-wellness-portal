import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import type { Theme } from "../../types/theme";
import {
  DashboardIcon,
  StaffIcon,
  SettingsIcon,
  MenuIcon,
  PersonIcon,
  LogoutIcon,
  DarkModeIcon,
  LightModeIcon,
} from "../../utils/icons.ts";
import { Box, Tooltip } from "@mui/material";

// --- Constants ---
const MOBILE_BREAKPOINT = 768;
const FULL_WIDTH = "260px";
const COLLAPSED_WIDTH = "80px";

// --- Styled Components ---

const LayoutContainer = styled.div<{ bgColor: string }>`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => props.bgColor};
  overflow: hidden;
  position: relative;
`;

const SidebarContainer = styled.aside<{ isOpen: boolean; theme: Theme }>`
  height: 100vh;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow: hidden;
  border-right: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surface};
  position: fixed;
  top: 0;
  left: 0;

  /* Desktop Styles */
  @media (min-width: ${MOBILE_BREAKPOINT + 1}px) {
    width: ${(props) => (props.isOpen ? FULL_WIDTH : COLLAPSED_WIDTH)};
    box-shadow: ${(props) =>
      props.isOpen ? "4px 0 24px rgba(0,0,0,0.02)" : "none"};
  }

  /* Mobile Styles */
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: ${FULL_WIDTH};
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: ${(props) =>
      props.isOpen ? "4px 0 24px rgba(0,0,0,0.1)" : "none"};
  }
`;

const MobileOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;

  @media (min-width: ${MOBILE_BREAKPOINT + 1}px) {
    display: none;
  }
`;

const MainContent = styled.main<{ sidebarOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;

  /* Desktop margin */
  @media (min-width: ${MOBILE_BREAKPOINT + 1}px) {
    margin-left: ${(props) =>
      props.sidebarOpen ? FULL_WIDTH : COLLAPSED_WIDTH};
    width: ${(props) =>
      props.sidebarOpen
        ? `calc(100% - ${FULL_WIDTH})`
        : `calc(100% - ${COLLAPSED_WIDTH})`};
  }

  /* Full width on mobile */
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-left: 0;
    width: 100%;
  }
`;

const PageContainer = styled.div`
  padding: 2rem;
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 1rem;
  }
`;

// Sidebar Styles
const SidebarWrapper = styled.div<{ theme: Theme; isOpen: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.surface};
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isOpen ? "1.5rem 0" : "1.5rem 0")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
`;

const LogoSection = styled.div<{ theme: Theme; isOpen: boolean }>`
  padding: ${(props) =>
    props.isOpen ? "0 1.5rem 1.5rem 1.5rem" : "0 0.75rem 1.5rem 0.75rem"};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  transition: padding 0.3s;
  display: flex;
  flex-direction: ${(props) => (props.isOpen ? "column" : "column")};
  align-items: ${(props) => (props.isOpen ? "flex-start" : "center")};
`;

const LogoTitle = styled.h2<{ theme: Theme; isOpen: boolean }>`
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => (props.isOpen ? "1.4rem" : "1rem")};
  font-weight: 700;
  margin: 0;
  transition: all 0.3s;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  width: ${(props) => (props.isOpen ? "auto" : "0")};
  overflow: hidden;
  white-space: nowrap;
`;

const LogoSubtitle = styled.p<{ theme: Theme; isOpen: boolean }>`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.8rem;
  margin: ${(props) => (props.isOpen ? "0.25rem 0 0 0" : "0")};
  opacity: ${(props) => (props.isOpen ? 0.9 : 0)};
  transition: all 0.3s;
  width: ${(props) => (props.isOpen ? "auto" : "0")};
  overflow: hidden;
  white-space: nowrap;
`;

const NavList = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0;
`;

const NavItem = styled.div<{
  theme: Theme;
  active: boolean;
  isOpen: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isOpen ? "1rem" : "0")};
  padding: ${(props) => (props.isOpen ? "0.85rem 1.5rem" : "0.85rem 0.75rem")};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  border-radius: ${(props) => (props.isOpen ? "0 8px 8px 0" : "8px")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: ${(props) => (props.isOpen ? "0" : "0 0.5rem")};
  justify-content: ${(props) => (props.isOpen ? "flex-start" : "center")};
  cursor: pointer;

  color: ${(props) =>
    props.active ? "#fff" : props.theme.colors.text.primary};
  background-color: ${(props) =>
    props.active ? props.theme.colors.accent : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.active
        ? props.theme.colors.accent
        : `${props.theme.colors.background}80`};
    transform: translateX(${(props) => (props.isOpen ? "4px" : "0")});
  }

  .nav-text {
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    width: ${(props) => (props.isOpen ? "auto" : "0")};
    overflow: hidden;
    transition: opacity 0.3s;
  }
`;

const SidebarFooter = styled.div<{ theme: Theme; isOpen: boolean }>`
  padding: 1rem ${(props) => (props.isOpen ? "1.5rem" : "0.75rem")} 0
    ${(props) => (props.isOpen ? "1.5rem" : "0.75rem")};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: ${(props) => (props.isOpen ? "center" : "center")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all 0.3s;
  white-space: nowrap;
  overflow: hidden;
`;

const UserInfo = styled.div<{ theme: Theme; isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isOpen ? "1rem" : "0")};
  padding: ${(props) => (props.isOpen ? "1rem 1.5rem" : "1rem 0.75rem")};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  margin-top: auto;
`;

const UserAvatar = styled.div<{ theme: Theme; isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "40px" : "36px")};
  height: ${(props) => (props.isOpen ? "40px" : "36px")};
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.accent}20;
  color: ${(props) => props.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.isOpen ? "1.2rem" : "1rem")};
  font-weight: 600;
  transition: all 0.3s;
`;

const UserDetails = styled.div<{ theme: Theme; isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  width: ${(props) => (props.isOpen ? "auto" : "0")};
  overflow: hidden;
  transition: opacity 0.3s;

  strong {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.primary};
    white-space: nowrap;
  }

  span {
    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.text.secondary};
    white-space: nowrap;
  }
`;

// Header Styles
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

// Navigation data
const adminNavItems = [
  { path: "/admin/dashboard", name: "Dashboard", icon: DashboardIcon },
  { path: "/admin/staff", name: "Staff Management", icon: StaffIcon },
  { path: "/admin/settings", name: "Clinic Settings", icon: SettingsIcon },
];

// --- Admin Sidebar Component ---
const AdminSidebar: React.FC<{ isOpen: boolean; onClose?: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "A";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle navigation
  const handleNavigate = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  // Check if item is active
  const isActive = (path: string) => {
    const currentPath = location.pathname;
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  return (
    <SidebarWrapper theme={theme} isOpen={isOpen}>
      {/* Logo Section */}
      <LogoSection theme={theme} isOpen={isOpen}>
        {isOpen ? (
          <>
            <LogoTitle theme={theme} isOpen={isOpen}>
              Admin Portal
            </LogoTitle>
            <LogoSubtitle theme={theme} isOpen={isOpen}>
              Clinic Management System
            </LogoSubtitle>
          </>
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <DashboardIcon
              sx={{
                color: theme.colors.accent,
                fontSize: "1.5rem",
              }}
            />
          </Box>
        )}
      </LogoSection>

      {/* Navigation */}
      <NavList>
        {adminNavItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Tooltip
              key={item.path}
              title={!isOpen ? item.name : ""}
              placement="right"
              arrow
            >
              <NavItem
                theme={theme}
                isOpen={isOpen}
                active={active}
                onClick={() => handleNavigate(item.path)}
              >
                <item.icon
                  sx={{
                    color: active ? "#fff" : theme.colors.text.primary,
                    fontSize: "1.25rem",
                    minWidth: "24px",
                  }}
                />
                <span className="nav-text">{item.name}</span>
              </NavItem>
            </Tooltip>
          );
        })}
      </NavList>

      {/* User Info */}
      <UserInfo theme={theme} isOpen={isOpen}>
        <UserAvatar theme={theme} isOpen={isOpen}>
          {getUserInitials()}
        </UserAvatar>
        {isOpen && (
          <UserDetails theme={theme} isOpen={isOpen}>
            <strong>{user?.name || "Admin"}</strong>
            <span>System Administrator</span>
          </UserDetails>
        )}
      </UserInfo>

      {/* Footer */}
      <SidebarFooter theme={theme} isOpen={isOpen}>
        © {new Date().getFullYear()} BiT Clinic
      </SidebarFooter>
    </SidebarWrapper>
  );
};

// --- Admin Header Component ---
const AdminHeader: React.FC<{ onMenuToggle: () => void }> = ({
  onMenuToggle,
}) => {
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
    if (!user?.name) return "A";
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
            <MenuIcon sx={{ fontSize: 24 }} />
          </MenuButton>
        </Tooltip>
        <WelcomeText theme={theme}>Clinic Admin Portal</WelcomeText>
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
            {isDarkMode ? (
              <LightModeIcon sx={{ fontSize: 20 }} />
            ) : (
              <DarkModeIcon sx={{ fontSize: 20 }} />
            )}
          </ThemeToggleButton>
        </Tooltip>

        {/* Desktop User Badge */}
        <UserBadge theme={theme}>
          <PersonIcon sx={{ fontSize: 18 }} />
          {user?.name || "Admin"}
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
            <LogoutIcon sx={{ fontSize: 18 }} />
            <span>Logout</span>
          </LogoutButton>
        </Tooltip>
      </HeaderRight>
    </HeaderContainer>
  );
};

// --- Main AdminLayout Component ---

const AdminLayout: React.FC = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      // Auto-close sidebar when switching to mobile
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      // Auto-open sidebar when switching to desktop
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarIfMobile = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <LayoutContainer bgColor={theme.colors.background}>
      {/* Mobile Backdrop */}
      {isMobile && (
        <MobileOverlay isOpen={isSidebarOpen} onClick={closeSidebarIfMobile} />
      )}

      {/* Sidebar */}
      <SidebarContainer isOpen={isSidebarOpen} theme={theme}>
        <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebarIfMobile} />
      </SidebarContainer>

      {/* Main Content */}
      <MainContent sidebarOpen={isSidebarOpen && !isMobile}>
        <AdminHeader onMenuToggle={toggleSidebar} />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;
