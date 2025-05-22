import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../../components/organisms/ProductList";
import type { Product } from "../../types/product";

describe("ProductList component", () => {
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Coca Cola",
      description: "Soda",
      price: 1.5,
      category: "Drinks",
    },
    {
      id: "2",
      name: "Burger",
      description: "Beef burger",
      price: 5.99,
      category: "Food",
    },
  ];

  const onEdit = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a table with product rows", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("Coca Cola")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(sampleProducts[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(sampleProducts[1].id);
  });
});
