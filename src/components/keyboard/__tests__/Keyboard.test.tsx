import { fireEvent, screen } from "@testing-library/react";
import { initialWordleState, renderWithProviders } from "../../../utils/tests-utils";
import { Keyboard } from "../Keyboard";
import { vi } from "vitest";
import {
  handleBackspaceOnGuess,
  handleSetCurrentGuess,
  handleSubmitGuess,
} from "../../../store/features/wordle/wordleSlice";

const mockDispatch = vi.fn();

vi.mock("../../../store/hooks", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

describe("Keyboard.tsx", () => {
  const setup = () => {
    renderWithProviders(<Keyboard />, {
      preloadedState: {
        wordle: {
          ...initialWordleState,
          guesses: ["there", "", "", "", "", ""],
          currentGuessIndex: 1,
        },
      },
    });
  };
  it("should render the keyboard T letter", () => {
    setup();
    const tLetter = screen.getByText("t");
    expect(tLetter).toBeDefined();
  });

  it("should dispatch update current guess on letter click", () => {
    setup();
    const tLetter = screen.getByText("t");
    fireEvent.click(tLetter);
    expect(mockDispatch).toHaveBeenCalledWith(handleSetCurrentGuess("t"));
  });

  it("should dispatch enter action on button click", () => {
    setup();
    const enterKey = screen.getByLabelText("enter-key");
    fireEvent.click(enterKey);
    expect(mockDispatch).toHaveBeenCalledWith(handleSubmitGuess());
  });

  it("should dispatch backspace action on button click", () => {
    setup();
    const enterKey = screen.getByLabelText("backspace-key");
    fireEvent.click(enterKey);
    expect(mockDispatch).toHaveBeenCalledWith(handleBackspaceOnGuess());
  });
});
