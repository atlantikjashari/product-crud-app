import { v4 as uuidv4 } from "uuid";
import type { Product } from "../types/product";
import { useLocalStorage } from "./useLocalStorage";

export const useProducts = () => {
  const [products, setProducts] = useLocalStorage<Product[]>("products", []);

  const addProduct = (data: Omit<Product, "id">) => {
    const newProduct: Product = { ...data, id: uuidv4() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
