import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Burger from "./Burger.tsx";

describe("Burger", () => {
  it("renders all ingredient controls", () => {
    render(<Burger />);
    expect(screen.getByText("Lettuce")).toBeInTheDocument();
    expect(screen.getByText("Tomato")).toBeInTheDocument();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Meat")).toBeInTheDocument();
  });

  it("shows $0.00 total on initial render", () => {
    render(<Burger />);
    expect(screen.getByText("Total: $0.00")).toBeInTheDocument();
  });

  it("adds lettuce and updates total to $0.50", () => {
    render(<Burger />);
    fireEvent.click(screen.getAllByText("Add")[0]); // Lettuce = $0.50
    expect(screen.getByText("Total: $0.50")).toBeInTheDocument();
  });

  it("increments count when ingredient is added", () => {
    render(<Burger />);
    const counts = screen.getAllByText("0");
    expect(counts.length).toBeGreaterThan(0);
    fireEvent.click(screen.getAllByText("Add")[0]);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("remove buttons are disabled when count is 0", () => {
    render(<Burger />);
    const removeButtons = screen.getAllByText("Remove");
    removeButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it("remove button is enabled after ingredient is added", () => {
    render(<Burger />);
    fireEvent.click(screen.getAllByText("Add")[0]);
    expect(screen.getAllByText("Remove")[0]).not.toBeDisabled();
  });

  it("removes ingredient and decrements total", () => {
    render(<Burger />);
    fireEvent.click(screen.getAllByText("Add")[0]); // +$0.50
    fireEvent.click(screen.getAllByText("Remove")[0]); // -$0.50
    expect(screen.getByText("Total: $0.00")).toBeInTheDocument();
  });

  it("shows order modal when Order Now is clicked", () => {
    render(<Burger />);
    fireEvent.click(screen.getByText("Order Now"));
    expect(screen.getByText("Your Order")).toBeInTheDocument();
  });

  it("shows empty message in modal with no ingredients", () => {
    render(<Burger />);
    fireEvent.click(screen.getByText("Order Now"));
    expect(screen.getByText("No ingredients added yet.")).toBeInTheDocument();
  });

  it("closes modal when Close is clicked", () => {
    render(<Burger />);
    fireEvent.click(screen.getByText("Order Now"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Your Order")).not.toBeInTheDocument();
  });

  it("shows ingredient summary in modal", () => {
    render(<Burger />);
    fireEvent.click(screen.getAllByText("Add")[3]); // Meat = $2.00
    fireEvent.click(screen.getByText("Order Now"));
    // The modal list item contains "Meat × 1 — $2.00"
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent("Meat");
    expect(screen.getByRole("listitem")).toHaveTextContent("$2.00");
  });
});
