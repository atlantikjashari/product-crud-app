import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../components/atoms/Button";

describe("Button component", () => {
  it("renders the correct text", () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn).toBeInTheDocument();
  });

  it("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const btn = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with correct variant and color", () => {
    render(
      <Button variant="outlined" color="secondary">
        Outline
      </Button>
    );
    const btn = screen.getByRole("button", { name: "Outline" });
    expect(btn).toHaveClass("MuiButton-outlined");
    expect(btn).toHaveClass("MuiButton-colorSecondary");
  });

  it("disables the button when disabled prop is passed", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button", { name: "Disabled" });
    expect(btn).toBeDisabled();
  });
});
