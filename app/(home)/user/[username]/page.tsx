"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "@/components/link/link";
import useUserPastes from "@/hooks/use-user-pastes";

interface ProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const session = useSession();

  const isLoading = session.status === "loading";

  const isPermitted = session.data?.user.username === params.username;

  const pastes = useUserPastes();

  if (!isLoading && !isPermitted) {
    return (
      <Container
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          You are not authorized to view this page
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Stack direction={"column"} gap={"1rem"} alignItems={"center"}>
        <Typography variant="subtitle2" color="text.secondary">
          {isLoading
            ? "Loading..."
            : session.data?.user.username
            ? `You are signed in as ${session.data?.user.username}`
            : "You are not signed in"}
        </Typography>

        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Your Pastes:
          </Typography>
          <List>
            {pastes.map((paste) => (
              <ListItem key={paste.id}>
                <ListItemText
                  primary={
                    <Link href={`/paste/${paste.slug}`} underline="none">
                      {paste.title}
                    </Link>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          {session.status === "unauthenticated" ? (
            <Stack direction={"row"} gap={"1rem"}>
              <Link href={"/signin"}>Sign In</Link>
              <Link href={"/signup"}>Sign Up</Link>
            </Stack>
          ) : (
            <Button
              onClick={() => signOut()}
              disabled={session.status === "loading"}
            >
              Sign Out
            </Button>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
