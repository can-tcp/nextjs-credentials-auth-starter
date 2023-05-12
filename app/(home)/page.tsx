"use client";

import { Container } from "@mui/material";
import useDispatchAlert from "@/hooks/use-dispatch-alert";

export default function LandingPage() {
  // const dispatch = useDispatchAlert();

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      hello world
    </Container>
  );
}
