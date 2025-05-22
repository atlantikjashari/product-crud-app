import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../../components/molecules/ProductForm";
import userEvent from "@testing-library/user-event";

describe("ProductForm component", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = () =>
    render(<ProductForm open onClose={mockOnClose} onSave={mockOnSave} />);

  it("renders all form fields", () => {
    renderForm();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
  });

  it("calls onSave with correct data on valid submit", async () => {
    renderForm();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Pizza" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Italian dish" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: 12.5 },
    });

    await userEvent.click(screen.getByLabelText("Category"));
    await userEvent.click(screen.getByRole("option", { name: "Food" }));

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        name: "Pizza",
        description: "Italian dish",
        price: 12.5,
        category: "Food",
      });
    });
  });

  it("calls onClose when cancel is clicked", () => {
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
