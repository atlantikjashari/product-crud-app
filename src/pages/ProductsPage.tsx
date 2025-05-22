import { Box, Paper, Typography } from "@mui/material";
import Button from "../components/atoms/Button";
import ProductList from "../components/organisms/ProductList";
import ProductForm from "../components/molecules/ProductForm";
import FiltersBar from "../components/molecules/FiltersBar";
import { useProducts } from "../hooks/useProducts";
import { useState, useMemo } from "react";
import type { Product } from "../types/product";
import { useSnackbar } from "../hooks/useSnackbar";

const ProductsPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showSnackbar } = useSnackbar();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
      .sort((a, b) => {
        if (priceSort === "asc") return a.price - b.price;
        if (priceSort === "desc") return b.price - a.price;
        return 0;
      });
  }, [products, categoryFilter, priceSort]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fb, #e9eef5)",
        py: 6,
        px: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "24px",
            backgroundColor: "#ffffffcc",
            backdropFilter: "blur(6px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <FiltersBar
            categoryFilter={categoryFilter}
            priceSort={priceSort}
            onCategoryChange={setCategoryFilter}
            onPriceSortChange={setPriceSort}
          />

          <Button
            onClick={() => {
              setSelectedProduct(null);
              setFormOpen(true);
            }}
            sx={{ alignSelf: { xs: "stretch", sm: "flex-end" }, height: 40 }}
          >
            Add Product
          </Button>

          <Typography variant="h4" fontWeight={600}>
            Product Manager
          </Typography>

          <ProductList
            products={filteredProducts}
            onEdit={(p) => {
              setSelectedProduct(p);
              setFormOpen(true);
            }}
            onDelete={(id) => {
              deleteProduct(id);
              showSnackbar("Product deleted", "warning");
            }}
          />

          <Box textAlign="right">
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 && "s"} in inventory
            </Typography>
          </Box>
        </Paper>

        <ProductForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSave={(data) => {
            if (selectedProduct) {
              updateProduct({ ...data, id: selectedProduct.id });
              showSnackbar("Product updated", "info");
            } else {
              addProduct(data);
              showSnackbar("Product added", "success");
            }
            setFormOpen(false);
          }}
          initialData={selectedProduct}
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;
