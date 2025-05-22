import { render, screen, fireEvent } from "@testing-library/react";
import ProductRow from "../../components/organisms/ProductRow";
import type { Product } from "../../types/product";

describe("ProductRow component", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    description: "This is a test",
    price: 9.99,
    category: "Food",
  };

  const onEdit = jest.fn();
  const onDelete = jest.fn();

  const renderRow = () =>
    render(
      <table>
        <tbody>
          <ProductRow
            product={mockProduct}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </tbody>
      </table>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product details correctly", () => {
    renderRow();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    renderRow();

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(mockProduct);
  });

  it("calls onDelete when delete button is clicked", () => {
    renderRow();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(mockProduct.id);
  });
});
