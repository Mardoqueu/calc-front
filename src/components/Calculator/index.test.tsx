// src/components/Calculator.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Calculator } from "./index";

describe("Calculator Component", () => {
  it("should display initial value 0", () => {
    render(<Calculator />);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("0");
  });

  it("should update the display when numbers are clicked", () => {
    render(<Calculator />);
    const button1 = screen.getByText("1");
    const button2 = screen.getByText("2");
    fireEvent.click(button1);
    fireEvent.click(button2);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("12");
  });

  it("should clear the display when CE button is clicked", () => {
    render(<Calculator />);
    const button1 = screen.getByText("1");
    const buttonCE = screen.getByText("CE");
    fireEvent.click(button1);
    fireEvent.click(buttonCE);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("0");
  });

  it("should calculate the square root", () => {
    render(<Calculator />);
    const button9 = screen.getByText("9");
    const buttonSqrt = screen.getByText("√");
    fireEvent.click(button9);
    fireEvent.click(buttonSqrt);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("3");
  });

  it("should evaluate the expression correctly", () => {
    render(<Calculator />);
    const button1 = screen.getByText("1");
    const buttonPlus = screen.getByText("+");
    const button2 = screen.getByText("2");
    const buttonEqual = screen.getByText("=");
    fireEvent.click(button1);
    fireEvent.click(buttonPlus);
    fireEvent.click(button2);
    fireEvent.click(buttonEqual);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("3");
  });
});
