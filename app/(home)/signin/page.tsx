"use client";

import useDispatchAlert from "@/hooks/use-dispatch-alert";
import Form, { FormField } from "@/components/form/form";
import Link from "@/components/link/link";
import { Container, Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface SignInData {
  username: string;
  password: string;
}

const SignInFields: FormField[] = [
  {
    label: "Username",
    name: "username",
    type: "text",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useDispatchAlert();

  const handleSubmit = async ({ username, password }: SignInData) => {
    try {
      const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      const isSuccessful = res && res.ok;

      if (!isSuccessful) {
        console.error("Error signing up");
        dispatch({
          message: "Error signing in",
          severity: "error",
        });
        return;
      }

      console.log("User signed up successfully");
      dispatch({
        message: "Signed in successfully",
        severity: "success",
      });
      router.push("/");
      return;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      maxWidth={"xs"}
      sx={{
        height: "100%",
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        gap={"1rem"}
        sx={{
          height: "100%",
        }}
      >
        <Typography variant="h4">Sign In</Typography>
        <Form
          submitText="Sign In"
          fields={SignInFields}
          onSubmit={(event) =>
            handleSubmit({
              username: event.username,
              password: event.password,
            })
          }
        />
        <Link href={"/signup"}>Don&apos;t have an account?</Link>
      </Stack>
    </Container>
  );
}
