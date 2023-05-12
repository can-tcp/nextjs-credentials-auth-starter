import { type AlertColor } from "@mui/material/Alert";

export interface AlertProps {
  severity: AlertColor;
  message: string;
}

export interface AlertContextProps {
  dispatch: (alert: AlertProps) => void;
}
