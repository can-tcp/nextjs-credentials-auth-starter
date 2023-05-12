"use client";

import useDispatchAlert from "@/hooks/use-dispatch-alert";
import Form, { FormField } from "@/components/form/form";
import Link from "@/components/link/link";
import { Container, Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import api from "@/client/api";

interface SignUpData {
  username: string;
  password: string;
}

const SignUpFields: FormField[] = [
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
  {
    label: "Confirm Password",
    name: "confirm_password",
    type: "password",
    required: true,
  },
];

export default function SignUpForm() {
  const dispatch = useDispatchAlert();
  const router = useRouter();

  const handleSubmit = async ({ username, password }: SignUpData) => {
    try {
      const { ok } = await api.signUpUser.action({
        username: username,
        password: password,
      });

      if (!ok) {
        console.error("Error signing up");
        return dispatch({
          severity: "error",
          message: "Error signing up",
        });
      }

      console.log("User signed up successfully");
      dispatch({
        severity: "success",
        message: "User signed up successfully",
      });

      await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      return router.push("/");
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
        <Typography variant="h4">Sign Up</Typography>
        <Form
          submitText="Sign Up"
          fields={SignUpFields}
          onSubmit={(event) => {
            if (event.password !== event.confirm_password) {
              alert("Passwords do not match");
              return;
            }

            handleSubmit({
              username: event.username,
              password: event.password,
            });
          }}
        />
        <Link href={"/signin"}>Already have an account?</Link>
      </Stack>
    </Container>
  );
}
