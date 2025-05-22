import { createContext } from "react";

export type SnackbarType = "success" | "error" | "info" | "warning";

export interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});
