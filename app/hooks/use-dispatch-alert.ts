import { AlertContext } from "@/components/alert/alert";
import { type AlertProps } from "@/types/alert";
import React from "react";

export default function useDispatchAlert() {
  const { dispatch } = React.useContext(AlertContext);

  return (alert: AlertProps) => {
    dispatch(alert);
  };
}
