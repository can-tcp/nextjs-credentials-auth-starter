"use client";

import { StatefulComponent } from "@/types/standard";
import { Alert, Grow } from "@mui/material";
import React from "react";
import { AlertProps, AlertContextProps } from "@/types/alert";

export const AlertContext = React.createContext({} as AlertContextProps);

type AlertViewProps = StatefulComponent<boolean> & AlertProps;

export default function AlertWithTransition({
  severity,
  message,
  controller,
}: AlertViewProps) {
  const [open, setOpen] = controller;

  return (
    <Grow in={open}>
      <Alert
        severity={severity}
        onClose={() => setOpen(false)}
        variant="outlined"
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 9999,
        }}
      >
        {message}
      </Alert>
    </Grow>
  );
}
