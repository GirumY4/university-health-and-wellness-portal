import React from "react";
import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import type { Theme } from "../../types/theme";
import { useAuth } from "../../hooks/useAuth";
import Icon from "../common/Icon";
import { Box, Tooltip } from "@mui/material";

// --- Props Interface ---
interface SidebarProps {
  onClose?: () => void;
  isOpen: boolean;
}

// --- Styled Components ---

const SidebarContainer = styled.div<{ theme: Theme; isOpen: boolean }>`
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

const NavItem = styled(Link)<{
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

// Navigation data - UPDATED PATHS
const navItems = [
  { path: "/app/dashboard", name: "Dashboard", icon: "Dashboard" as const },
  {
    path: "/app/appointments",
    name: "Appointments",
    icon: "Appointments" as const,
  },
  { path: "/app/records", name: "Medical Records", icon: "Records" as const },
  { path: "/app/wellness", name: "Wellness Hub", icon: "Wellness" as const },
  {
    path: "/app/support",
    name: "Support & Help Desk",
    icon: "Support" as const,
  },
];

// --- Component ---

const Sidebar: React.FC<SidebarProps> = ({ onClose, isOpen }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get user role display name
  const getRoleDisplay = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "staff":
        return "Clinic Staff";
      case "student":
        return "Student";
      default:
        return "User";
    }
  };

  // Handle navigation with proper path
  const handleNavigate = (path: string) => {
    // If admin, navigate to admin routes
    if (user?.role === "admin" && path !== "dashboard") {
      navigate(`/admin${path === "/dashboard" ? "/dashboard" : path}`);
    } else {
      navigate(path);
    }
    if (onClose) onClose();
  };

  // Check if item is active
  const isActive = (path: string) => {
    const currentPath = location.pathname;

    // Exact match
    if (currentPath === path) return true;

    // For dashboard, also match root
    if (path === "/dashboard" && currentPath === "/") return true;

    // For nested routes, check if current path starts with item path
    if (currentPath.startsWith(path) && path !== "/") return true;

    return false;
  };

  return (
    <SidebarContainer theme={theme} isOpen={isOpen}>
      {/* Logo Section */}
      <LogoSection theme={theme} isOpen={isOpen}>
        {isOpen ? (
          <>
            <LogoTitle theme={theme} isOpen={isOpen}>
              BiT Clinic
            </LogoTitle>
            <LogoSubtitle theme={theme} isOpen={isOpen}>
              Health Management Portal
            </LogoSubtitle>
          </>
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Icon
              name="Dashboard"
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
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Tooltip
              key={item.path}
              title={!isOpen ? item.name : ""}
              placement="right"
              arrow
            >
              <NavItem
                to={item.path}
                theme={theme}
                isOpen={isOpen}
                active={active}
                onClick={() => handleNavigate(item.path)}
              >
                <Icon
                  name={item.icon}
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
            <strong>{user?.name || "User"}</strong>
            <span>{getRoleDisplay(user?.role)}</span>
          </UserDetails>
        )}
      </UserInfo>

      {/* Footer */}
      <SidebarFooter theme={theme} isOpen={isOpen}>
        © {new Date().getFullYear()} BiT
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
