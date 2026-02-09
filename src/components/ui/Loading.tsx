// src/components/ui/Loading.tsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const LoadingFallback: React.FC<{ center?: boolean }> = ({
  center = true,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: center ? "center" : "flex-start",
        p: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingFallback;
