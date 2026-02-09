// src/components/ui/ContactCard.tsx
import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { getIconByName } from "../../icons";

const Card = styled.div<{ surface: string; border: string }>`
  background: ${(p) => p.surface};
  border: 1px solid ${(p) => p.border};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

type Props = { label: string; phone: string; onContact?: () => void };

export const ContactCard: React.FC<Props> = ({ label, phone, onContact }) => {
  const Phone = getIconByName("Phone");
  return (
    <Card surface="var(--color-surface)" border="var(--color-border)">
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Box sx={{ color: "var(--color-accent)", fontSize: "1.4rem" }}>
          <Phone />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}
          >
            Need immediate help?
          </Typography>
          <Typography sx={{ fontWeight: 700, color: "var(--text-primary)" }}>
            {label}: {phone}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={onContact}
        sx={{ backgroundColor: "var(--color-accent)", textTransform: "none" }}
      >
        Contact Support
      </Button>
    </Card>
  );
};

export default ContactCard;
