"use client";

import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import useDispatchAlert from "@/hooks/use-dispatch-alert";
import { useState } from "react";
import { Paste } from "@prisma/client";
import api from "@/client/api";

export type PasteData = Pick<Paste, "title" | "content">;

const emptyPaste: PasteData = {
  title: "",
  content: "",
};

export default function LandingPage() {
  const dispatch = useDispatchAlert();

  const [showAdvanced, setShowAdvanced] = useState(false);

  const [paste, setPaste] = useState<PasteData>(emptyPaste);

  async function onClickCreate() {
    const response = await api.createPaste.action({
      title: paste?.title || null,
      content: paste?.content,
    });

    const { ok, result, error } = response;

    if (!ok || !result || error) {
      console.error("Error creating paste");
      dispatch({
        severity: "error",
        message: `Error creating paste (
          ${response.error || "unknown error"}
        )`,
      });
      return;
    }

    dispatch({
      severity: "success",
      message: `Paste ${
        result.title ? `'${result.title}'` : "without title"
      } successfully created (${result.slug})`,
    });
  }

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack
        direction={"column"}
        gap={"1rem"}
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Create New Paste
        </Typography>
        <TextField
          sx={{ display: showAdvanced ? "block" : "none" }}
          label="Title"
          value={paste?.title}
          onChange={(e) =>
            setPaste((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <TextField
          label="Content"
          multiline
          rows={8}
          value={paste?.content}
          onChange={(e) =>
            setPaste((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
          variant="outlined"
        />
        <Button onClick={onClickCreate}>Create</Button>

        <Button
          color="warning"
          variant="outlined"
          style={{ alignSelf: "flex-end" }}
          onClick={() => setShowAdvanced((prev) => !prev)}
        >
          {showAdvanced ? "Hide" : "Show"} Advanced
        </Button>
      </Stack>
    </Container>
  );
}
