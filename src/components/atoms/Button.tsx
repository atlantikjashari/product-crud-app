import { Button as MuiButton, type ButtonProps } from "@mui/material";

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <MuiButton
    variant="contained"
    color="primary"
    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
    {...props}
  >
    {children}
  </MuiButton>
);

export default Button;
