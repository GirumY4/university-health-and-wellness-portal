// src/components/ui/HeroBanner.tsx
import React from "react";
import styled from "@emotion/styled";
import { Box, Chip, Typography } from "@mui/material";
import type { IconName } from "../../icons";
import { getIconByName } from "../../icons";

const Wrapper = styled.div<{ accent: string; primary: string }>`
  background: linear-gradient(
    135deg,
    ${(p) => p.accent} 0%,
    ${(p) => p.primary} 100%
  );
  color: white;
  padding: 2.25rem 2.5rem;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
`;

const RoleBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  margin-top: 1rem;
`;

type Reminder = { id: string; text: string; type?: string };

type Props = {
  title: string;
  subtitle?: string;
  roleLabel?: string;
  roleIconName?: IconName;
  reminders?: Reminder[];
};

export const HeroBanner: React.FC<Props> = ({
  title,
  subtitle,
  roleLabel,
  roleIconName,
  reminders = [],
}) => {
  const RoleIcon = roleIconName ? getIconByName(roleIconName) : undefined;
  return (
    <Wrapper accent="var(--color-accent)" primary="var(--color-primary)">
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography sx={{ opacity: 0.95 }}>{subtitle}</Typography>
      ) : null}

      {roleLabel ? (
        <RoleBadge>
          {RoleIcon ? <RoleIcon /> : null}
          <span>{roleLabel}</span>
        </RoleBadge>
      ) : null}

      <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {reminders.map((r) => (
          <Chip
            key={r.id}
            label={r.text}
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </Box>
    </Wrapper>
  );
};

export default HeroBanner;
