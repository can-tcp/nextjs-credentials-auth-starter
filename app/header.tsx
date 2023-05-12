"use client";

import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "@/components/link/link";
import NextLink from "next/link";

export default function Header() {
  const session = useSession();

  const username = session?.data?.user.username;
  const isUnauthenticated = session?.status === "unauthenticated";

  return (
    <Container
      sx={{
        position: "fixed",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          padding: "1rem",
        }}
      >
        <NextLink href={"/"}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Euro Pastes
          </Typography>
        </NextLink>
        {isUnauthenticated ? (
          <Typography variant="h6" component="div">
            <Link href="/signin">Login</Link>
          </Typography>
        ) : username ? (
          <Typography variant="h6" component="div">
            <Link href={`/user/${username}`}>Profile</Link>
          </Typography>
        ) : (
          <Typography variant="h6" component="div">
            <Link href={"/"}>Loading...</Link>
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
