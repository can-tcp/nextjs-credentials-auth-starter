"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "@/styles/mui/theme";
import React from "react";
import { AlertContext } from "./components/alert/alert";
import useAlertSetup from "./components/alert/use-alert-setup";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  const { component: alertView, dispatch } = useAlertSetup();

  const alertProviderProps = {
    dispatch,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AlertContext.Provider value={alertProviderProps}>
        <SessionProvider>
          {children}
          {alertView}
        </SessionProvider>
      </AlertContext.Provider>
    </ThemeProvider>
  );
}
