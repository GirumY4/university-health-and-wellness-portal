// src/pages/Dashboard.page.tsx
import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "../../../hooks/useTheme";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDashboard } from "../hooks/useDashboard";
import {
  HeroBanner,
  StatCard,
  ActionCard,
  TipList,
  ContactCard,
  LoadingFallback,
  ErrorFallback,
} from "../../../components/ui";
import type { IconName } from "src/icons";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

// grid helper styles (small)
const Grid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
`;

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useDashboard();

  if (loading) return <LoadingFallback />;
  if (error || !data) {
    return (
      <ErrorFallback
        message={error ?? "No dashboard data"}
        onRetry={refresh}
        onContact={() => navigate("/app/support")}
      />
    );
  }

  const hero = data.hero;
  const stats = data.stats;
  const actions = data.actions;
  const tips = data.tips;
  const contact = data.contact;

  return (
    <PageContainer>
      <HeroBanner
        title={`Hello, ${user?.name?.split?.(" ")[0] ?? "User"}!`}
        subtitle={
          user?.role === "admin"
            ? "Welcome to the BiT Clinic Management Portal."
            : hero.subtitle
        }
        roleLabel={user?.role ?? "Student User"}
        roleIconName={
          user?.role === "admin"
            ? ("Medical" as IconName)
            : ("School" as IconName)
        }
        reminders={hero.reminders}
      />

      <Grid>
        {stats.map((s) => (
          <StatCard
            key={s.id}
            value={s.value}
            label={s.label}
            status={s.status}
            color={s.color}
            iconName={s.iconName as IconName}
            onClick={() => s.link && navigate(s.link)}
          />
        ))}
      </Grid>

      <div>
        <h3
          css={{
            margin: "0 0 1rem 0",
          }}
        >
          Quick Access
        </h3>
        <div
          css={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {actions.map((a) => (
            <ActionCard
              key={a.id}
              name={a.name}
              description={a.description}
              color={a.color}
              iconName={a.iconName as IconName}
              onClick={() => navigate(a.path)}
              cta={{ label: "Access Now", onClick: () => navigate(a.path) }}
            />
          ))}
        </div>
      </div>

      <Box>
        <h4
          css={{
            margin: "0 0 1rem 0",
          }}
        >
          Daily Health Tips
        </h4>
        <TipList
          tips={tips.map((t) => ({
            id: t.id,
            text: t.text,
            iconName: t.iconName as IconName,
          }))}
        />
      </Box>

      <ContactCard
        label={contact.label}
        phone={contact.phone}
        onContact={() => navigate("/app/support")}
      />
    </PageContainer>
  );
};

export default DashboardPage;
