import styled from "@emotion/styled";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { Theme } from "../types/theme";
import {
  CalendarIcon,
  DocumentIcon,
  WellnessIcon,
  SupportIcon,
  HospitalIcon,
  TimeIcon,
  TrendingUpIcon,
  HealthIcon,
  MedicationIcon,
  AssignmentIcon,
  NotificationIcon,
  CheckIcon,
  SchoolIcon,
  EmojiIcon,
  ArrowForwardIcon,
  AddIcon,
  MedicalIcon,
  PsychologyIcon,
  GroupIcon,
  PhoneIcon,
} from "../utils/icons";
import { Box, Chip, Button } from "@mui/material";

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

// Hero/Welcome Banner
const HeroBanner = styled.div<{ theme: Theme }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.accent} 0%,
    ${(props) => props.theme.colors.primary} 100%
  );
  color: white;
  padding: 2.5rem 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 1%,
      transparent 20%
    );
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 40%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.08) 1%,
      transparent 20%
    );
  }
`;

const WelcomeTitle = styled.h2`
  font-size: 2.4rem;
  margin: 0 0 0.75rem 0;
  font-weight: 800;
  line-height: 1.1;
  position: relative;
  z-index: 2;
  letter-spacing: -0.5px;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  max-width: 600px;
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const RoleBadge = styled.div<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

// Stats Grid
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div<{ theme: Theme; color: string }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-left: 4px solid ${(props) => props.color};
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.color}40;

    .stat-icon {
      transform: scale(1.1);
    }
  }
`;

const StatIconWrapper = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${(props) => `${props.color}15`};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s;

  svg {
    font-size: 1.5rem;
  }
`;

const StatValue = styled.span<{ theme: Theme }>`
  font-size: 2.75rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
  line-height: 1;
  letter-spacing: -0.5px;
`;

const StatLabel = styled.span<{ theme: Theme }>`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StatStatus = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

// Action Grid
const ActionTitle = styled.h3<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.colors.accent};
    transform: translateY(-6px);

    .action-icon {
      transform: scale(1.1) translateY(-5px);
    }

    .action-arrow {
      transform: translateX(5px);
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.accent} 0%,
      ${(props) => props.theme.colors.primary} 100%
    );
    border-radius: 4px 4px 0 0;
  }
`;

const ActionIconWrapper = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background-color: ${(props) => `${props.color}15`};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s;

  svg {
    font-size: 1.8rem;
  }
`;

const ActionName = styled.h4<{ theme: Theme }>`
  font-size: 1.35rem;
  margin: 0 0 0.75rem 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionDescription = styled.p<{ theme: Theme }>`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
  flex: 1;
`;

const ActionArrow = styled.div<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.accent};
  opacity: 0.7;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background};
`;

// Health Tips Section
const HealthTipsSection = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  margin-top: 1rem;
`;

const TipsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TipsTitle = styled.h4<{ theme: Theme }>`
  font-size: 1.25rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const TipItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};

  svg {
    color: ${(props) => props.theme.colors.accent};
    font-size: 1.2rem;
  }
`;

const TipText = styled.span<{ theme: Theme }>`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

// --- Main Component ---

const Dashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- Mock Data Calculations ---
  const nextAppointment = true; // Mock: Assuming there's an appointment today
  const pendingResultsCount = 3; // Mock data
  const newPostCount = 5; // Mock data
  const activePrescriptions = 14; // Mock data

  // --- Helper Functions ---
  const getRoleTitle = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return "Clinic Administrator";
      case "staff":
        return "University Staff";
      case "student":
      default:
        return "Student User";
    }
  };

  const getWelcomeMessage = (role: string | undefined) => {
    const baseMessage =
      "Your central hub for campus health management. Track appointments, access records, and stay healthy with our wellness resources.";
    if (role === "admin") {
      return "Welcome to the BiT Clinic Management Portal. View system statistics and manage staff schedules.";
    }
    if (role === "staff") {
      return "Access clinic management tools, view student health reports, and coordinate appointments.";
    }
    return baseMessage;
  };

  const getRoleIcon = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return <MedicalIcon name={undefined} />;
      case "staff":
        return <GroupIcon name={undefined} />;
      case "student":
      default:
        return <SchoolIcon name={undefined} />;
    }
  };

  // Dashboard statistics data
  const dashboardStats = [
    {
      value: pendingResultsCount,
      label: "Pending Lab Results",
      color: "#38A169",
      icon: <AssignmentIcon name={undefined} />,
      status: "Available within 24h",
      onClick: () => navigate("/app/records"),
    },
    {
      value: nextAppointment ? "Today" : "None",
      label: "Next Appointment",
      color: "#4299E1",
      icon: nextAppointment ? (
        <CalendarIcon name={undefined} />
      ) : (
        <TimeIcon name={undefined} />
      ),
      status: nextAppointment
        ? "2:30 PM with Dr. Smith"
        : "No upcoming appointments",
      onClick: () => navigate("/app/appointments"),
    },
    {
      value: newPostCount,
      label: "New Wellness Posts",
      color: "#ED8936",
      icon: <TrendingUpIcon name={undefined} />,
      status: "Updated this week",
      onClick: () => navigate("/app/wellness"),
    },
    {
      value: activePrescriptions,
      label: "Active Prescriptions",
      color: "#9F7AEA",
      icon: <MedicationIcon name={undefined} />,
      status: "3 require renewal",
      onClick: () => navigate("/app/records"),
    },
  ];

  // Dashboard actions
  const dashboardActions = [
    {
      name: "Book Appointment",
      description:
        "Schedule your visit with a campus doctor or specialist. Choose from available time slots.",
      icon: <CalendarIcon name={undefined} />,
      color: "#4299E1",
      path: "/app/appointments",
    },
    {
      name: "View My Records",
      description:
        "Access your clinical history, prescriptions, lab results, and immunization records.",
      icon: <DocumentIcon name={undefined} />,
      color: "#38A169",
      path: "/app/records",
    },
    {
      name: "Wellness & Tips",
      description:
        "Read campus health guides, fitness tips, mental health resources, and wellness articles.",
      icon: <WellnessIcon name={undefined} />,
      color: "#ED8936",
      path: "/app/wellness",
    },
    {
      name: "Contact Support",
      description:
        "Get quick help, report issues, or contact IT support and clinic staff directly.",
      icon: <SupportIcon name={undefined} />,
      color: "#9F7AEA",
      path: "/app/support",
    },
  ];

  // Health tips
  const healthTips = [
    {
      text: "Stay hydrated - drink 8 glasses daily",
      icon: <HealthIcon name={undefined} />,
    },
    {
      text: "Get 7-8 hours of sleep each night",
      icon: <EmojiIcon name={undefined} />,
    },
    {
      text: "Take regular study breaks every 45 mins",
      icon: <TimeIcon name={undefined} />,
    },
    {
      text: "Practice mindfulness for stress relief",
      icon: <PsychologyIcon name={undefined} />,
    },
  ];

  // Upcoming reminders (mock)
  const reminders = [
    { text: "Annual physical checkup due next month", type: "reminder" },
    { text: "Flu vaccine available at clinic", type: "alert" },
    { text: "Medication refill required by Friday", type: "urgent" },
  ];

  return (
    <PageContainer>
      {/* 1. Personalized Hero Banner */}
      <HeroBanner theme={theme}>
        <WelcomeTitle>
          Hello, {user?.name.split(" ")[0] || "User"}! 👋
        </WelcomeTitle>
        <WelcomeSubtitle>{getWelcomeMessage(user?.role)}</WelcomeSubtitle>

        <RoleBadge theme={theme}>
          {getRoleIcon(user?.role)}
          <span>Role: {getRoleTitle(user?.role)}</span>
        </RoleBadge>

        {/* Quick Stats in Hero */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
            flexWrap: "wrap",
            position: "relative",
            zIndex: 2,
          }}
        >
          {reminders.map((reminder, index) => (
            <Chip
              key={index}
              label={reminder.text}
              size="small"
              icon={
                <NotificationIcon sx={{ fontSize: "1rem" }} name={undefined} />
              }
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
          ))}
        </Box>
      </HeroBanner>

      {/* 2. Key Statistics Overview */}
      <StatsGrid>
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={index}
            theme={theme}
            color={stat.color}
            onClick={stat.onClick}
          >
            <StatIconWrapper color={stat.color} className="stat-icon">
              {stat.icon}
            </StatIconWrapper>
            <StatValue theme={theme}>{stat.value}</StatValue>
            <StatLabel theme={theme}>{stat.label}</StatLabel>
            <StatStatus theme={theme}>
              <CheckIcon
                sx={{ fontSize: "1rem", color: stat.color }}
                name={undefined}
              />
              {stat.status}
            </StatStatus>
          </StatCard>
        ))}
      </StatsGrid>

      {/* 3. Quick Actions */}
      <div>
        <ActionTitle theme={theme}>
          <HospitalIcon name={undefined} />
          Quick Access
        </ActionTitle>
        <ActionsGrid>
          {dashboardActions.map((action) => (
            <ActionCard
              key={action.name}
              theme={theme}
              onClick={() => navigate(action.path)}
            >
              <ActionIconWrapper color={action.color} className="action-icon">
                {action.icon}
              </ActionIconWrapper>

              <ActionName theme={theme}>
                {action.name}
                <ActionArrow theme={theme} className="action-arrow">
                  <ArrowForwardIcon name={undefined} />
                </ActionArrow>
              </ActionName>

              <ActionDescription theme={theme}>
                {action.description}
              </ActionDescription>

              <Button
                variant="outlined"
                size="small"
                endIcon={<ArrowForwardIcon name={undefined} />}
                sx={{
                  alignSelf: "flex-start",
                  mt: "auto",
                  borderColor: theme.colors.border,
                  color: theme.colors.text.secondary,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: action.color,
                    color: action.color,
                  },
                }}
              >
                Access Now
              </Button>
            </ActionCard>
          ))}
        </ActionsGrid>
      </div>

      {/* 4. Health Tips Section */}
      <HealthTipsSection theme={theme}>
        <TipsHeader>
          <TipsTitle theme={theme}>
            <HealthIcon name={undefined} />
            Daily Health Tips
          </TipsTitle>
          <Button
            size="small"
            startIcon={<AddIcon name={undefined} />}
            sx={{
              textTransform: "none",
              fontSize: "0.85rem",
              color: theme.colors.accent,
            }}
            onClick={() => navigate("/app/wellness")}
          >
            View All Tips
          </Button>
        </TipsHeader>

        <TipsGrid>
          {healthTips.map((tip, index) => (
            <TipItem key={index} theme={theme}>
              {tip.icon}
              <TipText theme={theme}>{tip.text}</TipText>
            </TipItem>
          ))}
        </TipsGrid>
      </HealthTipsSection>

      {/* 5. Emergency/Quick Contact */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon
            sx={{ color: theme.colors.accent, fontSize: "1.5rem" }}
            name={undefined}
          />
          <Box>
            <Box
              sx={{ fontSize: "0.9rem", color: theme.colors.text.secondary }}
            >
              Need immediate help?
            </Box>
            <Box
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: theme.colors.text.primary,
              }}
            >
              Campus Clinic: +251-911-234-567
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<SupportIcon name={undefined} />}
          sx={{
            backgroundColor: theme.colors.accent,
            "&:hover": {
              backgroundColor: theme.colors.primary,
            },
            textTransform: "none",
          }}
          onClick={() => navigate("/app/support")}
        >
          Contact Support
        </Button>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
