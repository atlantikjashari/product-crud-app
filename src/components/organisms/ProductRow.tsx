import { TableRow, TableCell, IconButton, Chip, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { Product } from "../../types/product";

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductRow = ({ product, onEdit, onDelete }: Props) => {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>
        <Chip
          label={product.category}
          color={product.category === "Food" ? "primary" : "secondary"}
          size="small"
          variant="filled"
          sx={{
            bgcolor: product.category === "Food" ? "#e0f7fa" : "#f3e5f5",
            color: product.category === "Food" ? "#00796b" : "#6a1b9a",
            fontWeight: 500,
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <IconButton
            aria-label="edit"
            onClick={() => onEdit(product)}
            size="small"
            sx={{ touchAction: "manipulation" }}
          >
            <Edit fontSize="small" color="primary" />
          </IconButton>

          <IconButton
            aria-label="delete"
            onClick={() => onDelete(product.id)}
            size="small"
            sx={{ touchAction: "manipulation" }}
          >
            <Delete fontSize="small" color="error" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
