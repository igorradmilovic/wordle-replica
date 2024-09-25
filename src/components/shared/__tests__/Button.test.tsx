import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

describe("Button.tsx", () => {
  it("should render the button", () => {
    render(<Button>Test</Button>);
    const btn = screen.getByText("Test");
    expect(btn).toBeDefined();
  });
});
