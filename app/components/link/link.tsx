"use client";

// app/components/link/link.tsx
import React from "react";
import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";

interface LinkProps {
  href: string;
  underline?: "none" | "hover" | "always";
  children: React.ReactNode;
}

export default function Link({
  href,
  children,
  underline = "hover",
}: LinkProps) {
  return (
    <MuiLink component={NextLink} href={href} underline={underline}>
      {children}
    </MuiLink>
  );
}
