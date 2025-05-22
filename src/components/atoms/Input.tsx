import { TextField, type TextFieldProps } from "@mui/material";
import type { FC } from "react";

const Input: FC<TextFieldProps> = ({
  fullWidth = true,
  size = "medium",
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      fullWidth={fullWidth}
      size={size}
      {...props}
    />
  );
};

export default Input;
