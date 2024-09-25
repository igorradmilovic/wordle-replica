import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/tests-utils";
import { Header } from "../Header";

describe("Header.tsx", () => {
  describe("render", () => {
    it("successfully rendered", () => {
      renderWithProviders(<Header />, {});
      const helpButton = screen.getByTestId("help-button");
      expect(helpButton).toBeDefined();
    });
  });

  describe("actions", () => {
    it("should show the help modal on click", () => {
      renderWithProviders(<Header />, {});
      const helpButton = screen.getByTestId("help-button");
      fireEvent.click(helpButton);
      const helpModal = screen.getByTestId("help-modal");
      expect(helpModal).toBeDefined();
    });
  });
});
