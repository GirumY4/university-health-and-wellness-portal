import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../../hooks/useTheme";
import type { Theme } from "../../types/theme";

// --- Constants ---
const MOBILE_BREAKPOINT = 768;
const FULL_WIDTH = "260px";
const COLLAPSED_WIDTH = "80px";

// --- Styled Components ---

const LayoutWrapper = styled.div<{ bgColor: string }>`
  display: flex;
  min-height: 100vh;
  width: 100%;
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

// --- Main Component ---

const Layout = () => {
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
    <LayoutWrapper bgColor={theme.colors.background}>
      {/* Mobile Backdrop */}
      {isMobile && (
        <MobileOverlay isOpen={isSidebarOpen} onClick={closeSidebarIfMobile} />
      )}

      {/* Sidebar */}
      <SidebarContainer isOpen={isSidebarOpen} theme={theme}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebarIfMobile} />
      </SidebarContainer>

      {/* Main Content */}
      <MainContent sidebarOpen={isSidebarOpen && !isMobile}>
        <Header onMenuToggle={toggleSidebar} />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout;
