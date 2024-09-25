import { initialWordleState, renderWithProviders } from "../../../utils/tests-utils";
import { Grid } from "../Grid";

describe("Grid.tsx", () => {
  it("should render the grid", () => {
    const { container } = renderWithProviders(<Grid />, {
      preloadedState: {
        wordle: {
          ...initialWordleState,
          word: "right",
          guesses: ["wrong", "wrong", "wrong", "wrong", ""],
          currentGuessIndex: 5,
        },
      },
    });
    const firstRow = container.querySelector("letter-item-0");
    expect(firstRow).toBeDefined();
  });
});
