import { useState } from "react";
import { useSnackbar } from "./useSnackbar";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const { showSnackbar } = useSnackbar();

  const getStoredValue = (): T => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getStoredValue);

  const updateValue = (newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      showSnackbar("Could not update data", "error");
    }
    setValue(newValue);
  };

  return [value, updateValue] as const;
};
