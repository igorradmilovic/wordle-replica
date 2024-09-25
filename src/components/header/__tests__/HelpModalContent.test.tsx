import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/tests-utils";
import { HelpModalContent } from "../HelpModalContent";

describe("HelpModalContent.tsx", () => {
  it("should render the help content", () => {
    renderWithProviders(<HelpModalContent />, {});
    const instruction = "Each guess must be a valid 5-letter word.";
    expect(screen.getByText(instruction)).toBeDefined();
  });
});
