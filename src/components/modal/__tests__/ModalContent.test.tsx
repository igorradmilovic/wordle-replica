import { fireEvent, screen } from "@testing-library/react";
import { initialWordleState, renderWithProviders } from "../../../utils/tests-utils";
import { ModalContent } from "../ModalContent";
import { vi } from "vitest";
import { resetGame } from "../../../store/features/wordle/wordleSlice";

const mockDispatch = vi.fn();

vi.mock("../../../store/hooks", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

describe("ModalContent.tsx", () => {
  const mockHandleClose = vi.fn();
  const setup = (isWon: boolean) => {
    renderWithProviders(<ModalContent handleModalClose={mockHandleClose} isWon={isWon} />, {
      preloadedState: {
        wordle: {
          ...initialWordleState,
          word: "right",
        },
      },
    });
  };
  it("should render the content", () => {
    setup(false);
    const text = screen.getByText("The correct word was");
    expect(text).toBeDefined();
  });

  it("should render and click the play again button", () => {
    setup(false);
    const playAgainButton = screen.getByText("Play Again");
    expect(playAgainButton).toBeDefined();
    fireEvent.click(playAgainButton);
    expect(mockDispatch).toHaveBeenCalledWith(resetGame());
    expect(mockHandleClose).toHaveBeenCalledWith();
  });
});
