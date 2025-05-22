import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContent";

export const useSnackbar = () => useContext(SnackbarContext);
