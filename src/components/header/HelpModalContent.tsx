import { LetterItem } from "../letter-item/LetterItem";

export const HelpModalContent = () => {
  return (
    <div className="py-4 px-2">
      <div className="text-2xl">
        Guess the Wordle in {import.meta.env.VITE_NUMBER_OF_TRIES} tries.
      </div>
      <br />
      <ul>
        <li>Each guess must be a valid 5-letter word.</li>
        <li>The color of the tiles will change to show how close your guess was to the word.</li>
      </ul>
      <br />
      <div className="font-bold mb-2">Examples</div>
      <LetterItem isItemGuessedAlready={true} finalWord="walls" currentGuess="wordy" />
      <label>W is in the word and in the correct spot.</label>

      <LetterItem isItemGuessedAlready={true} finalWord="poise" currentGuess="light" />
      <label>I is in the word but in the wrong spot.</label>

      <LetterItem isItemGuessedAlready={true} finalWord="think" currentGuess="rouge" />
      <label>U is not in the word in any spot.</label>
      <br />
    </div>
  );
};
