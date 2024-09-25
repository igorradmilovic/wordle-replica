import { initialWordleState } from "../../../../utils/tests-utils";
import reducer, {
  handleSubmitGuess,
  resetGame,
  handleBackspaceOnGuess,
  handleSetCurrentGuess,
  handleClearCurrentGuess,
  initialState,
  WordleState,
} from "../wordleSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
});

test("should handle submitting a guess successfully", () => {
  const previousState: WordleState = {
    ...initialState,
    guesses: ["testy", "", "", "", "", ""],
    currentGuessIndex: 0,
  };

  expect(reducer(previousState, handleSubmitGuess())).toEqual({
    ...initialState,
    guesses: ["testy", "", "", "", "", ""],
    currentGuessIndex: 1,
  });
});

test("should handle submitting a guess unsuccessfully", () => {
  const previousState: WordleState = {
    ...initialState,
    guesses: ["test", "", "", "", "", ""],
    currentGuessIndex: 0,
  };

  expect(reducer(previousState, handleSubmitGuess())).toEqual({
    ...initialState,
    guesses: ["test", "", "", "", "", ""],
    currentGuessIndex: 0,
  });
});

test("should handle reset of the game", () => {
  const previousState: WordleState = {
    ...initialState,
    guesses: ["wrong", "wrong", "wrong", "wrong", "wrong", "wrong"],
    currentGuessIndex: 7,
  };

  expect(reducer(previousState, resetGame()).guesses).toEqual(initialState.guesses);
});

test("should handle backspace on guess", () => {
  const previousState: WordleState = {
    ...initialState,
    guesses: ["wrong", "", "", "", "", ""],
    currentGuessIndex: 0,
  };

  const expected = ["wron", "", "", "", "", ""];

  expect(reducer(previousState, handleBackspaceOnGuess()).guesses).toEqual(expected);
});

test("should handle updating current guess", () => {
  const previousState: WordleState = {
    ...initialState,
    guesses: ["wron", "", "", "", "", ""],
    currentGuessIndex: 0,
  };

  const expected = ["wrong", "", "", "", "", ""];

  expect(reducer(previousState, handleSetCurrentGuess("g")).guesses).toEqual(expected);
});

test("should handle clearing current guess", () => {
  const previousState: WordleState = {
    ...initialState,
    guesses: ["wrong", "", "", "", "", ""],
    currentGuessIndex: 0,
  };

  const expected = ["", "", "", "", "", ""];

  expect(reducer(previousState, handleClearCurrentGuess()).guesses).toEqual(expected);
});
