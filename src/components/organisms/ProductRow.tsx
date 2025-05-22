import { TableRow, TableCell, IconButton, Chip } from "@mui/material";
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
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => onEdit(product)} aria-label="edit">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton onClick={() => onDelete(product.id)} aria-label="delete">
          <Delete fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
