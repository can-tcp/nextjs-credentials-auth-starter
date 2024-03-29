"use client";

import useDispatchAlert from "@/hooks/use-dispatch-alert";
import Form, { FormField } from "@/components/form/form";
import Link from "@/components/link/link";
import { Container, Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import api from "@/(api)/client";

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
      const { ok } = await api.signUpUser({
        username: username,
        password: password,
      });

      if (!ok) {
        return dispatch({
          severity: "error",
          message: "Error signing up. Please try again.",
        });
      }

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
    <Stack width={"24rem"} gap={"1rem"}>
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
  );
}
