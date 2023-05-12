import { useEffect, useState } from "react";
import { AlertContextProps, AlertProps } from "@/types/alert";
import AlertWithTransition from "./alert";

export const EMPTY_ALERT: AlertProps = {
  severity: "success",
  message: "",
};

export const SECOND = 1000;

export const SHOW_ALERT_DURATION = 5 * SECOND;

export default function useAlertSetup(): {
  component: React.ReactNode;
  dispatch: AlertContextProps["dispatch"];
} {
  const [alert, setAlert] = useState<AlertProps>(EMPTY_ALERT);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setOpen(false), SHOW_ALERT_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  function dispatch(alert: AlertProps) {
    setAlert(alert);
    setOpen(true);
  }

  return {
    component: <AlertWithTransition controller={[open, setOpen]} {...alert} />,
    dispatch,
  };
}
