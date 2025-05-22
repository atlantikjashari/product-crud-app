import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { CATEGORY_OPTIONS } from "../../constants/categories";

type Props = {
  categoryFilter: string | null;
  priceSort: "asc" | "desc" | null;
  onCategoryChange: (value: string | null) => void;
  onPriceSortChange: (value: "asc" | "desc" | null) => void;
};

const FiltersBar = ({
  categoryFilter,
  priceSort,
  onCategoryChange,
  onPriceSortChange,
}: Props) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      gap={2}
      flexWrap="wrap"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        width={{ xs: "100%", sm: "auto" }}
      >
        <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            inputProps={{ "aria-label": "Category" }}
            value={categoryFilter ?? ""}
            onChange={(e) => onCategoryChange(e.target.value || null)}
          >
            <MenuItem value="">All</MenuItem>
            {CATEGORY_OPTIONS.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160, flex: 1 }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select
            label="Sort by Price"
            inputProps={{ "aria-label": "Sort by Price" }}
            value={priceSort ?? ""}
            onChange={(e) =>
              onPriceSortChange(e.target.value as "asc" | "desc" | null)
            }
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Lowest to Highest</MenuItem>
            <MenuItem value="desc">Highest to Lowest</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default FiltersBar;
