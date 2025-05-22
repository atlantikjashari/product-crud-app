import { Box, Paper, Typography } from "@mui/material";
import Button from "../components/atoms/Button";
import ProductList from "../components/organisms/ProductList";
import ProductForm from "../components/molecules/ProductForm";
import FiltersBar from "../components/molecules/FiltersBar";
import { useProducts } from "../hooks/useProducts";
import { useState, useMemo } from "react";
import type { Product } from "../types/product";
import { useSnackbar } from "../hooks/useSnackbar";
import { Pagination } from "@mui/material";
import { exportToCsv } from "../utils/exportCsv";

const ProductsPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showSnackbar } = useSnackbar();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const ITEMS_PER_PAGE = 3;

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          (!categoryFilter || p.category === categoryFilter) &&
          (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (priceSort === "asc") return a.price - b.price;
        if (priceSort === "desc") return b.price - a.price;
        return 0;
      });
  }, [products, categoryFilter, priceSort, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #f8f9fb, #e9eef5)",
        backdropFilter: "blur(2px)",
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
            p: { xs: 2, sm: 3 },
            gap: { xs: 2, sm: 4 },
            borderRadius: "24px",
            background: "linear-gradient(145deg, #ffffff, #f0f0f3)",
            backdropFilter: "blur(6px)",
            boxShadow: "10px 10px 30px #d3d3d3, -10px -10px 30px #ffffff",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "100%",
            minHeight: 500,
            overflow: "hidden",
            boxSizing: "border-box",
            animation: "fadeIn 0.5s ease",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <FiltersBar
            categoryFilter={categoryFilter}
            priceSort={priceSort}
            onCategoryChange={setCategoryFilter}
            onPriceSortChange={setPriceSort}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setFormOpen(true);
            }}
            sx={{
              alignSelf: { xs: "stretch", sm: "flex-end" },
              height: 40,
              transition: "all 0.3s ease",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            Add Product
          </Button>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Product Manager
          </Typography>
          <ProductList
            products={paginatedProducts}
            onEdit={(p) => {
              setSelectedProduct(p);
              setFormOpen(true);
            }}
            onDelete={(id) => {
              deleteProduct(id);
              showSnackbar("Product deleted", "warning");
            }}
          />
          <Pagination
            count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            sx={{ mt: 2 }}
            color="primary"
            shape="rounded"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mt: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 && "s"} in inventory
            </Typography>
            <Button
              onClick={() => exportToCsv(filteredProducts)}
              variant="outlined"
              color="secondary"
              sx={{
                background: "linear-gradient(90deg, #4f46e5, #6366f1)",
                color: "white",
                px: 3,
                height: 36,
                fontSize: "0.75rem",
                boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
                "&:hover": {
                  background: "linear-gradient(90deg, #4338ca, #4f46e5)",
                },
              }}
            >
              Export CSV
            </Button>
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
