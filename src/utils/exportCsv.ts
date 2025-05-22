import type { Product } from "../types/product";

export const exportToCsv = (data: Product[], filename = "products.csv") => {
  const csvRows = [
    ["Name", "Description", "Price", "Category"],
    ...data.map(p => [p.name, p.description, p.price.toFixed(2), p.category])
  ];

  const csvContent = csvRows
    .map(row => row.map(value => `"${value}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
