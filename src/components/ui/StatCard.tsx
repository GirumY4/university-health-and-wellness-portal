// src/components/ui/StatCard.tsx
import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { getIconByName } from "../../icons";
import type { IconName } from "../../icons";

const Card = styled.div<{ surface: string; border: string; leftColor: string }>`
  background: ${(p) => p.surface};
  border: 1px solid ${(p) => p.border};
  border-left: 4px solid ${(p) => p.leftColor};
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  transition: transform 180ms ease, box-shadow 180ms ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
  }
`;

const IconWrap = styled.div<{ leftColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${(p) => `${p.leftColor}22`};
  color: ${(p) => p.leftColor};
  display: grid;
  place-items: center;
  margin-bottom: 0.75rem;
`;

type Props = {
  value: string | number;
  label: string;
  status?: string;
  color?: string; // hex
  iconName?: IconName;
  onClick?: () => void;
};

export const StatCard: React.FC<Props> = ({
  value,
  label,
  status,
  color = "#2563EB",
  iconName,
  onClick,
}) => {
  const Icon = iconName ? getIconByName(iconName) : undefined;
  return (
    <Card
      surface="var(--color-surface)"
      border="var(--color-border)"
      leftColor={color}
      onClick={onClick}
    >
      <IconWrap leftColor={color} aria-hidden>
        {Icon ? <Icon /> : null}
      </IconWrap>

      <Typography
        sx={{
          fontSize: "1.8rem",
          fontWeight: 800,
          color: "var(--text-primary)",
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "var(--text-secondary)",
          fontWeight: 600,
          mt: 0.5,
        }}
      >
        {label}
      </Typography>

      {status ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />
          <Typography
            sx={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
          >
            {status}
          </Typography>
        </Box>
      ) : null}
    </Card>
  );
};

export default StatCard;
