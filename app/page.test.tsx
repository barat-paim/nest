import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";  // Adjust this path if needed

test("renders input and button", () => {
  render(<Home />);

  // Test Input
  const input = screen.getByPlaceholderText("Type something...");
  expect(input).toBeInTheDocument();

  // Test Button
  const button = screen.getByText("Submit");
  expect(button).toBeInTheDocument();
  
  // Test button click with input value
  fireEvent.change(input, { target: { value: "Test Input" } });
  fireEvent.click(button);
  expect(window.alert).toHaveBeenCalledWith("You typed: Test Input");
});