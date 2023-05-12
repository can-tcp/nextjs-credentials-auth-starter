import React from "react";

interface PastesLayoutProps {
  children: React.ReactNode;
}

export default function PastesLayout({ children }: PastesLayoutProps) {
  return <>{children}</>;
}
