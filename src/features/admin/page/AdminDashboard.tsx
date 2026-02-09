import styled from "@emotion/styled";
import { useTheme } from "../../../hooks/useTheme";
import type { Theme } from "../../../types/theme";
import { mockClinicUsers } from "../../staffs/mockData";
import { mockDoctors } from "../../appointments/mockData";
import { mockRecords } from "../../records/mockData";
import {
  CalendarIcon,
  HospitalIcon,
  GroupsIcon,
  BoltIcon,
  ComputerIcon,
  TrendingUpIcon,
  VerifiedIcon,
  WarningIcon,
  AccessTimeIcon,
  PersonAddIcon,
  ReportIcon,
  AnnouncementIcon,
  EventAvailableIcon,
  MedicalInfoIcon,
  SpeedIcon,
  HealthSafetyIcon,
  CircleIcon,
  DownloadIcon,
  AddIcon,
} from "../../../icons";
import { Box, Chip, Button } from "@mui/material";

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
  max-width: 1600px;
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  font-size: 1.8rem;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const SubTitle = styled.p<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0.5rem 0 0 0.5rem;
  font-size: 1rem;
  max-width: 600px;
  line-height: 1.5;
`;

const DateBadge = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    transform: translateY(-1px);
  }

  svg {
    color: ${(props) => props.theme.colors.accent};
    font-size: 1rem;
  }
`;

// --- Stats Section ---

const StatGrid = styled.div`
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
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border-color: ${(props) => props.color}40;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${(props) => props.color};
    border-radius: 4px 0 0 4px;
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
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
  transition: all 0.3s;

  svg {
    font-size: 1.5rem;
  }
`;

const StatValue = styled.div<{ theme: Theme }>`
  font-size: 2.75rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 1;
  margin: 0.75rem 0;
  letter-spacing: -0.5px;
`;

const StatLabel = styled.div<{ theme: Theme }>`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const TrendBadge = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isPositive ? "rgba(56, 161, 105, 0.1)" : "rgba(229, 62, 62, 0.1)"};
  color: ${(props) => (props.isPositive ? "#38A169" : "#E53E3E")};

  svg {
    font-size: 0.9rem;
  }
`;

// --- Split Content Section ---

const ContentSplit = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
  }
`;

const CardTitle = styled.h3<{ theme: Theme }>`
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

// Activity List Styles
const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ActivityItem = styled.div<{ theme: Theme; type: string }>`
  display: flex;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => {
      switch (props.type) {
        case "success":
          return "#38A169";
        case "info":
          return "#3182CE";
        case "warning":
          return "#D69E2E";
        case "error":
          return "#E53E3E";
        default:
          return props.theme.colors.accent;
      }
    }};
    margin-top: 0.5rem;
  }
`;

const ActivityTime = styled.div<{ theme: Theme }>`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
  min-width: 60px;
  padding-top: 0.2rem;
  font-weight: 500;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.p<{ theme: Theme }>`
  margin: 0;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 1.5;
`;

const ActivityMeta = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

// Quick Action Styles
const ActionButton = styled.button<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    background-color: ${(props) => props.theme.colors.background};
    transform: translateX(8px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);

    .action-icon {
      transform: scale(1.1);
    }
  }
`;

const ActionIcon = styled.div<{ color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: ${(props) => `${props.color}15`};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  svg {
    font-size: 1.4rem;
  }
`;

const ActionText = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div<{ theme: Theme }>`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

const ActionDescription = styled.div<{ theme: Theme }>`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.4;
`;

// System Status
const SystemStatus = styled.div<{ theme: Theme }>`
  margin-top: 2rem;
  padding: 1.25rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusLabel = styled.span<{ theme: Theme }>`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusValue = styled.span<{
  theme: Theme;
  status: string;
}>`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => {
    switch (props.status) {
      case "good":
        return "#38A169";
      case "warning":
        return "#D69E2E";
      case "error":
        return "#E53E3E";
      default:
        return props.theme.colors.text.primary;
    }
  }};
`;

// --- AdminDashboard Component ---

const AdminDashboard = () => {
  const { theme } = useTheme();

  // --- Real-time Data Calculation ---
  const totalStaff = mockClinicUsers.filter((u) => u.role === "staff").length;
  const activeDoctors = mockDoctors.length;
  const pendingTasks = mockRecords.filter(
    (r) => r.status === "Follow-up"
  ).length;
  const visitsToday = 14;
  const totalPatients = mockRecords.length;
  const activeAppointments = mockRecords.filter(
    (r) => String(r.status).toLowerCase() === "scheduled"
  ).length;

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Recent activity data
  const activities = [
    {
      time: "10:42 AM",
      text: "Dr. Sarah Smith completed a consultation record.",
      meta: "Record ID: REC-009 • General Medicine",
      type: "success",
    },
    {
      time: "09:15 AM",
      text: "New user Abebe Kebede registered via portal.",
      meta: "Student ID: BDU150221",
      type: "info",
    },
    {
      time: "08:30 AM",
      text: "System Admin updated clinic operating hours.",
      meta: "Configuration Change",
      type: "info",
    },
    {
      time: "Yesterday",
      text: "Dr. Alemayehu marked 3 appointments as 'No Show'.",
      meta: "Follow-up required",
      type: "warning",
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: "Add New Staff",
      description: "Create doctor/nurse account with permissions",
      icon: PersonAddIcon,
      color: "#3182CE",
      onClick: () => console.log("Add Staff"),
    },
    {
      title: "Generate Reports",
      description: "Download weekly stats and performance PDF",
      icon: ReportIcon,
      color: "#38A169",
      onClick: () => console.log("Generate Reports"),
    },
    {
      title: "Broadcast Alert",
      description: "Send notification to all students and staff",
      icon: AnnouncementIcon,
      color: "#D69E2E",
      onClick: () => console.log("Broadcast Alert"),
    },
  ];

  // System status
  const systemStatus = [
    {
      label: "Server Health",
      value: "Excellent",
      status: "good",
      icon: VerifiedIcon,
    },
    {
      label: "Database",
      value: "Connected",
      status: "good",
      icon: ComputerIcon,
    },
    { label: "API Response", value: "48ms", status: "good", icon: SpeedIcon },
    {
      label: "Backup Status",
      value: "Last: 2 hours ago",
      status: "good",
      icon: AccessTimeIcon,
    },
  ];

  return (
    <PageContainer>
      {/* Header */}
      <HeaderSection>
        <div>
          <PageTitle theme={theme}>
            <MedicalInfoIcon sx={{ fontSize: "2rem" }} name={undefined} />
            Admin Dashboard
          </PageTitle>
          <SubTitle theme={theme}>
            Real-time overview of clinic performance, system health, and daily
            operations. Monitor key metrics and manage resources efficiently.
          </SubTitle>
        </div>
        <DateBadge theme={theme}>
          <CalendarIcon name={undefined} />
          {todayDate}
        </DateBadge>
      </HeaderSection>

      {/* 1. Key Performance Indicators (KPIs) */}
      <StatGrid>
        {/* Card 1: Visits */}
        <StatCard theme={theme} color="#3182CE">
          <StatHeader>
            <StatIconWrapper color="#3182CE">
              <HospitalIcon name={undefined} />
            </StatIconWrapper>
            <TrendBadge isPositive={true}>
              <TrendingUpIcon name={undefined} />↗ 12%
            </TrendBadge>
          </StatHeader>
          <StatValue theme={theme}>{visitsToday}</StatValue>
          <StatLabel theme={theme}>Total Visits Today</StatLabel>
          <Box
            sx={{
              fontSize: "0.85rem",
              color: theme.colors.text.secondary,
              mt: 1,
            }}
          >
            <VerifiedIcon
              sx={{
                fontSize: "0.9rem",
                mr: 0.5,
                verticalAlign: "middle",
                color: "#38A169",
              }}
              name={undefined}
            />
            On track for daily target
          </Box>
        </StatCard>

        {/* Card 2: Staff */}
        <StatCard theme={theme} color="#38A169">
          <StatHeader>
            <StatIconWrapper color="#38A169">
              <GroupsIcon name={undefined} />
            </StatIconWrapper>
            <TrendBadge isPositive={true}>
              <VerifiedIcon name={undefined} />
              Stable
            </TrendBadge>
          </StatHeader>
          <StatValue theme={theme}>{totalStaff + activeDoctors}</StatValue>
          <StatLabel theme={theme}>Active Staff On-Duty</StatLabel>
          <Box
            sx={{
              fontSize: "0.85rem",
              color: theme.colors.text.secondary,
              mt: 1,
            }}
          >
            {activeDoctors} doctors, {totalStaff} support staff
          </Box>
        </StatCard>

        {/* Card 3: Pending Tasks */}
        <StatCard theme={theme} color="#D69E2E">
          <StatHeader>
            <StatIconWrapper color="#D69E2E">
              <BoltIcon name={undefined} />
            </StatIconWrapper>
            <TrendBadge isPositive={false}>
              <WarningIcon name={undefined} />2 Urgent
            </TrendBadge>
          </StatHeader>
          <StatValue theme={theme}>{pendingTasks}</StatValue>
          <StatLabel theme={theme}>Pending Follow-ups</StatLabel>
          <Box
            sx={{
              fontSize: "0.85rem",
              color: theme.colors.text.secondary,
              mt: 1,
            }}
          >
            <CircleIcon
              sx={{
                fontSize: "0.5rem",
                mr: 0.5,
                verticalAlign: "middle",
                color: "#E53E3E",
              }}
              name={undefined}
            />
            2 require immediate attention
          </Box>
        </StatCard>

        {/* Card 4: System Health */}
        <StatCard theme={theme} color="#805AD5">
          <StatHeader>
            <StatIconWrapper color="#805AD5">
              <ComputerIcon name={undefined} />
            </StatIconWrapper>
            <TrendBadge isPositive={true}>
              <VerifiedIcon name={undefined} />
              100%
            </TrendBadge>
          </StatHeader>
          <StatValue theme={theme}>Good</StatValue>
          <StatLabel theme={theme}>System Status</StatLabel>
          <Box
            sx={{
              fontSize: "0.85rem",
              color: theme.colors.text.secondary,
              mt: 1,
            }}
          >
            All systems operational
          </Box>
        </StatCard>
      </StatGrid>

      {/* 2. Additional Stats Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 1.5,
          mt: 1,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EventAvailableIcon
            sx={{ color: theme.colors.accent, fontSize: "1.2rem" }}
            name={undefined}
          />
          <Box>
            <Box
              sx={{ fontSize: "0.9rem", color: theme.colors.text.secondary }}
            >
              Appointments
            </Box>
            <Box
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: theme.colors.text.primary,
              }}
            >
              {activeAppointments}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <HealthSafetyIcon
            sx={{ color: theme.colors.accent, fontSize: "1.2rem" }}
            name={undefined}
          />
          <Box>
            <Box
              sx={{ fontSize: "0.9rem", color: theme.colors.text.secondary }}
            >
              Total Patients
            </Box>
            <Box
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: theme.colors.text.primary,
              }}
            >
              {totalPatients}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <DownloadIcon
            sx={{ color: theme.colors.accent, fontSize: "1.2rem" }}
            name={undefined}
          />
          <Box>
            <Box
              sx={{ fontSize: "0.9rem", color: theme.colors.text.secondary }}
            >
              Reports Generated
            </Box>
            <Box
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: theme.colors.text.primary,
              }}
            >
              24
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AddIcon
            sx={{ color: theme.colors.accent, fontSize: "1.2rem" }}
            name={undefined}
          />
          <Box>
            <Box
              sx={{ fontSize: "0.9rem", color: theme.colors.text.secondary }}
            >
              New This Week
            </Box>
            <Box
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: theme.colors.text.primary,
              }}
            >
              18
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 3. Split Content: Activity Feed & Quick Actions */}
      <ContentSplit>
        {/* Left: Recent Activity Feed */}
        <ContentCard theme={theme}>
          <CardTitle theme={theme}>
            Recent System Activity
            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadIcon name={undefined} />}
              sx={{
                fontSize: "0.85rem",
                textTransform: "none",
                borderColor: theme.colors.border,
                color: theme.colors.text.secondary,
              }}
            >
              Export Log
            </Button>
          </CardTitle>

          <ActivityList>
            {activities.map((activity, index) => (
              <ActivityItem key={index} theme={theme} type={activity.type}>
                <ActivityTime theme={theme}>{activity.time}</ActivityTime>
                <ActivityContent>
                  <ActivityText theme={theme}>{activity.text}</ActivityText>
                  <ActivityMeta theme={theme}>
                    <Chip
                      label={activity.meta}
                      size="small"
                      variant="outlined"
                      sx={{ height: 20, fontSize: "0.7rem" }}
                    />
                  </ActivityMeta>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </ContentCard>

        {/* Right: Quick Management Actions */}
        <ContentCard theme={theme}>
          <CardTitle theme={theme}>Quick Actions</CardTitle>

          {quickActions.map((action, index) => (
            <ActionButton key={index} theme={theme} onClick={action.onClick}>
              <ActionIcon color={action.color} className="action-icon">
                <action.icon name={undefined} />
              </ActionIcon>
              <ActionText>
                <ActionTitle theme={theme}>{action.title}</ActionTitle>
                <ActionDescription theme={theme}>
                  {action.description}
                </ActionDescription>
              </ActionText>
            </ActionButton>
          ))}

          {/* System Status */}
          <SystemStatus theme={theme}>
            <Box
              sx={{
                fontSize: "0.9rem",
                fontWeight: 600,
                mb: 1.5,
                color: theme.colors.text.primary,
              }}
            >
              System Status
            </Box>
            {systemStatus.map((status, index) => (
              <StatusItem key={index}>
                <StatusLabel theme={theme}>
                  <status.icon name={undefined} sx={{ fontSize: "1rem" }} />
                  {status.label}
                </StatusLabel>
                <StatusValue theme={theme} status={status.status}>
                  {status.value}
                </StatusValue>
              </StatusItem>
            ))}
          </SystemStatus>

          <Box
            sx={{
              mt: "auto",
              pt: 1.5,
              borderTop: `1px solid ${theme.colors.border}`,
              fontSize: "0.8rem",
              color: theme.colors.text.secondary,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <VerifiedIcon
              sx={{ fontSize: "0.9rem", color: "#38A169" }}
              name={undefined}
            />
            BiT Clinic v1.2.0 • All systems operational
          </Box>
        </ContentCard>
      </ContentSplit>
    </PageContainer>
  );
};

export default AdminDashboard;
