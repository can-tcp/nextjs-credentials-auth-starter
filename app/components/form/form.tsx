"use client";

// app/components/form/form.tsx
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export interface FormField {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

export type FormPayload = Record<string, string>;

interface FormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  fields: FormField[];
  onSubmit: (formData: FormPayload) => void;
  submitText?: string;
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitText,
  ...props
}) => {
  const [formData, setFormData] = useState<FormPayload>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      <Stack direction={"column"} gap={"1rem"}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            id={field.name}
            label={field.label}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
            type={field.type}
            name={field.name}
          />
        ))}
        <Button type="submit">{submitText || "Submit"}</Button>
      </Stack>
    </form>
  );
};

export default Form;
