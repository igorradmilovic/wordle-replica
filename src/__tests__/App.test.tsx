import { screen } from "@testing-library/react";
import App from "../App";
import { vi } from "vitest";
import { initialWordleState, renderWithProviders } from "../utils/tests-utils";

const mockDispatch = vi.fn();

vi.mock("../store/hooks", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

describe("Render App", () => {
  beforeAll(() => {});

  it("renders the main app", () => {
    renderWithProviders(<App />, {
      preloadedState: {
        wordle: initialWordleState,
      },
    });
    const wordleText = screen.getByText("Wordle");
    expect(wordleText).toBeDefined();
  });
});
