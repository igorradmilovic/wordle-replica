import { fireEvent, screen } from "@testing-library/react";
import { initialWordleState, renderWithProviders } from "../../../utils/tests-utils";
import { Actions } from "../Actions";
import { vi } from "vitest";
import { handleClearCurrentGuess, resetGame } from "../../../store/features/wordle/wordleSlice";

const mockDispatch = vi.fn();

vi.mock("../../../store/hooks", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

describe("Actions.tsx", () => {
  renderWithProviders(<Actions />, {
    preloadedState: {
      wordle: {
        ...initialWordleState,
        word: "testy",
        currentGuessIndex: 5,
        guesses: ["wrong", "wrong", "wrong", "wrong", "wrong", ""],
      },
    },
  });

  it("should render the actions if game is ongoing", () => {
    const resetButton = screen.getByRole("button", { name: "Reset" });
    const newWordButton = screen.getByRole("button", { name: "New Word" });

    expect(resetButton).toBeDefined();
    fireEvent.click(resetButton);
    expect(mockDispatch).toHaveBeenCalledWith(handleClearCurrentGuess());

    expect(newWordButton).toBeDefined();
    fireEvent.click(newWordButton);
    expect(mockDispatch).toHaveBeenCalledWith(resetGame());
  });
});
