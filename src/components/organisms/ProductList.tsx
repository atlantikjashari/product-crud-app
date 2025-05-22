import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import type { Product } from "../../types/product";
import ProductRow from "./ProductRow";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductList = ({ products, onEdit, onDelete }: Props) => {
  if (products.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        mt={3}
      >
        No products added yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: "700px",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f6fa" }}>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                <strong>Name</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                <strong>Description</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                <strong>Price</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                <strong>Category</strong>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
