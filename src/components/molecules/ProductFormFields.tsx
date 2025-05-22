import { Stack, MenuItem } from "@mui/material";
import { useField } from "formik";
import Input from "../atoms/Input";
import { CATEGORY_OPTIONS } from "../../constants/categories";

type FormikInputProps = {
  name: string;
  label: string;
  type?: string;
  select?: boolean;
  children?: React.ReactNode;
};

const FormikInput = ({
  name,
  label,
  type = "text",
  select = false,
  children,
}: FormikInputProps) => {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <Input
      {...field}
      label={label}
      type={type}
      select={select}
      error={isError}
      helperText={isError ? meta.error : ""}
    >
      {children}
    </Input>
  );
};

const ProductFormFields = () => (
  <Stack spacing={2}>
    <FormikInput name="name" label="Name" />
    <FormikInput name="description" label="Description" />
    <FormikInput name="price" label="Price" type="number" />
    <FormikInput name="category" label="Category" select>
      {CATEGORY_OPTIONS.map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat}
        </MenuItem>
      ))}
    </FormikInput>
  </Stack>
);

export default ProductFormFields;
