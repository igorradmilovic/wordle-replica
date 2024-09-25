import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import words from "../../../words.json";
import validWords from "../../../valid-words.json";

export interface WordleState {
  allAvailableWords: string[];
  word: string;
  guesses: string[];
  currentGuessIndex: number;
  warning: string;
}

const getRandomWord = (): string => words[Math.round(Math.random() * words.length)];

export const initialState: WordleState = {
  allAvailableWords: words,
  word: getRandomWord(),
  guesses: Array.from({ length: import.meta.env.VITE_NUMBER_OF_TRIES }).map(() => ""),
  currentGuessIndex: 0,
  warning: "",
};

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    handleSubmitGuess: (state) => {
      state.warning = "";
      if (state.guesses[state.currentGuessIndex].length < 5) return;
      if (!validWords.includes(state.guesses[state.currentGuessIndex])) {
        state.warning = "Word is not valid";
        return;
      }
      state.currentGuessIndex += 1;
    },
    resetGame: (state) => {
      state.word = getRandomWord();
      state.warning = "";
      (state.guesses = initialState.guesses), (state.currentGuessIndex = 0);
    },
    handleBackspaceOnGuess: (state) => {
      const currentGuess = state.guesses[state.currentGuessIndex];
      state.guesses[state.currentGuessIndex] = currentGuess.slice(
        0,
        state.guesses[state.currentGuessIndex].length - 1
      );
    },
    handleSetCurrentGuess: (state, action: PayloadAction<string>) => {
      if (state.guesses[state.currentGuessIndex].length < 5 && action.payload.match(/^[A-Za-z]$/)) {
        state.guesses[state.currentGuessIndex] += action.payload.toLowerCase();
      }
    },
    handleClearCurrentGuess: (state) => {
      state.guesses[state.currentGuessIndex] = "";
    },
  },
});

export const {
  handleSubmitGuess,
  resetGame,
  handleBackspaceOnGuess,
  handleSetCurrentGuess,
  handleClearCurrentGuess,
} = wordleSlice.actions;

export default wordleSlice.reducer;
