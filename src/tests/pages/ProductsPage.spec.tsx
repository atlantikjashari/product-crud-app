import { render, screen, within } from "@testing-library/react";
import ProductsPage from "../../pages/ProductsPage";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useProducts", () => ({
  useProducts: () => ({
    products: [
      {
        id: "1",
        name: "Cola",
        description: "Soda",
        price: 1.5,
        category: "Drinks",
      },
      {
        id: "2",
        name: "Burger",
        description: "Beef",
        price: 6.5,
        category: "Food",
      },
    ],
    addProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  }),
}));

jest.mock("../../hooks/useSnackbar", () => ({
  useSnackbar: () => ({
    showSnackbar: jest.fn(),
  }),
}));

describe("ProductsPage", () => {
  it("renders the product list and title", () => {
    render(<ProductsPage />);
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
    expect(screen.getByText("Cola")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
  });

  it("filters products by category", async () => {
    render(<ProductsPage />);
    const categorySelect = screen.getByRole("combobox", { name: /category/i });
    await userEvent.click(categorySelect);
    await userEvent.click(screen.getByRole("option", { name: "Drinks" }));

    expect(screen.getByText("Cola")).toBeInTheDocument();
    expect(screen.queryByText("Burger")).not.toBeInTheDocument();
  });

  it("sorts products by price descending", async () => {
    render(<ProductsPage />);
    const priceSelect = screen.getByRole("combobox", {
      name: /sort by price/i,
    });
    await userEvent.click(priceSelect);
    await userEvent.click(
      screen.getByRole("option", { name: /highest to lowest/i })
    );

    const rows = screen.getAllByRole("row");
    const firstProductCell = within(rows[1]).getByText(/Burger|Cola/);

    expect(firstProductCell.textContent).toBe("Burger");
  });

  it("displays correct count in footer", () => {
    render(<ProductsPage />);
    expect(screen.getByText(/2 products in inventory/i)).toBeInTheDocument();
  });
});
