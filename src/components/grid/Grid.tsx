import { useAppSelector } from "../../store/hooks";
import {
  getCurrentGuessIndexSelector,
  getFinalWordSelector,
  getGuessesSelector,
} from "../../store/features/wordle/selectors";
import { LetterItem } from "../letter-item/LetterItem";

export const Grid = () => {
  const finalWord = useAppSelector(getFinalWordSelector);
  const guesses = useAppSelector(getGuessesSelector);
  const currentGuessIndex = useAppSelector(getCurrentGuessIndexSelector);
  return (
    <>
      {guesses.map((guess, i) => (
        <LetterItem
          key={i}
          isItemGuessedAlready={i < currentGuessIndex}
          currentGuess={guess}
          finalWord={finalWord}
        />
      ))}
    </>
  );
};
