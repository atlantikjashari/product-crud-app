import { Box, Modal, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProductFormFields from "./ProductFormFields";
import Button from "../atoms/Button";
import type { Product } from "../../types/product";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Product, "id">) => void;
  initialData?: Product | null;
};

type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  category: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  price: Yup.number()
    .typeError("Price must be a number")
    .moreThan(0, "Price must be greater than 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
});

const ProductForm = ({ open, onClose, onSave, initialData }: Props) => {
  const isEditing = Boolean(initialData);

  const initialValues: ProductFormValues = initialData
    ? {
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category: initialData.category,
      }
    : {
        name: "",
        description: "",
        price: 0,
        category: "",
      };

  const handleSubmit = (values: ProductFormValues) => {
    onSave(values);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          width: "80%",
          maxWidth: 500,
          mx: "auto",
          mt: "10vh",
          borderRadius: 3,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          {isEditing ? "Edit Product" : "Add Product"}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <ProductFormFields />

            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button onClick={onClose} type="button" color="secondary">
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Save"}</Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProductForm;
