import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getAllAvailableWordsSelector = (root: RootState) => root.wordle.allAvailableWords;
export const getFinalWordSelector = (root: RootState) => root.wordle.word;
export const getGuessesSelector = (root: RootState) => root.wordle.guesses;
export const getCurrentGuessIndexSelector = (root: RootState) => root.wordle.currentGuessIndex;
export const getWarningSelector = (root: RootState) => root.wordle.warning;

export const getCurrentUserWordSelector = createSelector(
  getGuessesSelector,
  getCurrentGuessIndexSelector,
  (guesses, currentGuessIndex) => {
    return guesses[currentGuessIndex];
  }
);

export const isGameWonSelector = createSelector(
  getGuessesSelector,
  getFinalWordSelector,
  getCurrentGuessIndexSelector,
  (guesses, currentWord, currentGuessIndex) => {
    return guesses[currentGuessIndex - 1] === currentWord;
  }
);

export const isGameLostSelector = createSelector(
  getCurrentGuessIndexSelector,
  (currentGuessIndex) => {
    return currentGuessIndex === Number(import.meta.env.VITE_NUMBER_OF_TRIES);
  }
);

export const isGameEndSelector = createSelector(
  isGameWonSelector,
  isGameLostSelector,
  (isGameWon, isGameLost) => {
    return isGameWon || isGameLost;
  }
);

export const getAllGuessesSelector = createSelector(
  getGuessesSelector,
  getCurrentGuessIndexSelector,
  (guesses, currentGuessIndex) => {
    return guesses.slice(0, currentGuessIndex).join("").split("");
  }
);

export const getCorrectGuessesSelector = createSelector(
  getFinalWordSelector,
  getGuessesSelector,
  getCurrentGuessIndexSelector,
  (currentWord, guesses, guessIndex) => {
    const currentWordSplit = currentWord.split("");
    return currentWordSplit.filter((letter, i) => {
      return guesses
        .slice(0, guessIndex)
        .map((word) => word[i])
        .includes(letter);
    });
  }
);

export const getPartiallyCorrectGuessesSelector = createSelector(
  getFinalWordSelector,
  getAllGuessesSelector,
  (finalWord, allGuesses) => {
    const finalWordSplit = finalWord.split("");
    return finalWordSplit.filter((letter) => allGuesses.includes(letter));
  }
);
