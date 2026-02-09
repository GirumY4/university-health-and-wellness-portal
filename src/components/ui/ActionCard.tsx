// src/components/ui/ActionCard.tsx
import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { getIconByName } from "../../icons";
import type { IconName } from "../../icons";

const Card = styled.div<{ surface: string; border: string }>`
  background: ${(p) => p.surface};
  border: 1px solid ${(p) => p.border};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 180ms ease;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
  }
`;

const IconWrap = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: ${(p) => `${p.color}20`};
  color: ${(p) => p.color};
`;

type Props = {
  name: string;
  description: string;
  color?: string;
  iconName?: IconName;
  onClick?: () => void;
  cta?: { label: string; onClick?: () => void };
};

export const ActionCard: React.FC<Props> = ({
  name,
  description,
  color = "#2563EB",
  iconName,
  onClick,
  cta,
}) => {
  const Icon = iconName ? getIconByName(iconName) : undefined;
  return (
    <Card
      surface="var(--color-surface)"
      border="var(--color-border)"
      onClick={onClick}
    >
      <IconWrap color={color}>{Icon ? <Icon /> : null}</IconWrap>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            opacity: 0.9,
            color: "var(--color-accent)",
            fontSize: "0.9rem",
          }}
        >
          →
        </Box>
      </Box>

      <Typography
        sx={{ color: "var(--text-secondary)", fontSize: "0.95rem", flex: 1 }}
      >
        {description}
      </Typography>

      {cta ? (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              cta.onClick?.();
            }}
          >
            {cta.label}
          </Button>
        </Box>
      ) : null}
    </Card>
  );
};

export default ActionCard;
