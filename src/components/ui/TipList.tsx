// src/components/ui/TipList.tsx
import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import type { IconName } from "../../icons";
import { getIconByName } from "../../icons";

const Item = styled.div<{ surface: string; border: string }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0.75rem;
  border-radius: 10px;
  background: ${(p) => p.surface};
  border: 1px solid ${(p) => p.border};
`;

type Tip = { id: string; text: string; iconName?: IconName };

type Props = { tips: Tip[] };

export const TipList: React.FC<Props> = ({ tips }) => {
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      {tips.map((t) => {
        const Icon = t.iconName ? getIconByName(t.iconName) : undefined;
        return (
          <Item
            key={t.id}
            surface="var(--color-background)"
            border="var(--color-border)"
          >
            <Box sx={{ color: "var(--color-accent)" }}>
              {Icon ? <Icon /> : null}
            </Box>
            <Typography
              sx={{ color: "var(--text-primary)", fontSize: "0.95rem" }}
            >
              {t.text}
            </Typography>
          </Item>
        );
      })}
    </Box>
  );
};

export default TipList;
