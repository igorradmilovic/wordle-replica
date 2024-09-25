import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/tests-utils";
import { LetterItem } from "../LetterItem";

describe("LetterItem.tsx", () => {
  it("should render a letter item with a partially correct guess", () => {
    renderWithProviders(
      <LetterItem isItemGuessedAlready={true} currentGuess="wrong" finalWord="right" />,
      {}
    );
    const rLetter = screen.getByText("r");
    expect(rLetter.classList.contains("bg-yellow-600")).toBeTruthy();
  });

  it("should render a letter item with a exact correct guess", () => {
    renderWithProviders(
      <LetterItem isItemGuessedAlready={true} currentGuess="right" finalWord="right" />,
      {}
    );
    const rLetter = screen.getByText("r");
    expect(rLetter.classList.contains("bg-green-500")).toBeTruthy();
  });
});
