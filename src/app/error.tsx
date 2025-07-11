"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { labels } from "@/utils/labels";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      <Typography variant="h4" fontWeight={800} gutterBottom>
        {labels.error}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {labels.errorDescription}
      </Typography>
      <Button variant="contained" color="primary" onClick={reset}>
        {labels.tryAgain}
      </Button>
    </Box>
  );
}
