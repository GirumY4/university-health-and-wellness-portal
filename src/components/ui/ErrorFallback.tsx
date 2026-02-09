// src/components/ui/ErrorFallback.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  message?: string;
  onRetry?: () => void;
  onContact?: () => void;
};

export const ErrorFallback: React.FC<Props> = ({
  message,
  onRetry,
  onContact,
}) => {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Something went wrong</Typography>
      <Typography color="textSecondary">
        {message ?? "Unable to load data."}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {onRetry ? (
          <Button variant="contained" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
        {onContact ? (
          <Button variant="outlined" onClick={onContact}>
            Contact Support
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default ErrorFallback;
