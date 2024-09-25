import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllGuessesSelector,
  getCorrectGuessesSelector,
  getPartiallyCorrectGuessesSelector,
} from "../../store/features/wordle/selectors";
import clsx from "clsx";
import { AppDispatch } from "../../store/store";
import {
  handleBackspaceOnGuess,
  handleSetCurrentGuess,
  handleSubmitGuess,
} from "../../store/features/wordle/wordleSlice";
import { keyboardLettersArray } from "./letters";
import { SpecialKeyboardCharatersEnum } from "./keyboardEnums";
import { MdBackspace, MdKeyboardReturn } from "react-icons/md";

export const Keyboard = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const allGuessedLetters = useAppSelector(getAllGuessesSelector);
  const correctlyGuessedLetters = useAppSelector(getCorrectGuessesSelector);
  const partiallyGuessedLetters = useAppSelector(getPartiallyCorrectGuessesSelector);

  const handleClick = (letter: string | SpecialKeyboardCharatersEnum) => {
    if (letter === SpecialKeyboardCharatersEnum.ENTER) {
      dispatch(handleSubmitGuess());
      return;
    }
    if (letter === SpecialKeyboardCharatersEnum.BACKSPACE) {
      dispatch(handleBackspaceOnGuess());
      return;
    }

    dispatch(handleSetCurrentGuess(letter));
  };

  return (
    <>
      {keyboardLettersArray.map((keyboardRow, i) => (
        <div key={i} className="flex justify-center">
          {keyboardRow.letters.map((letter) => {
            const exact = correctlyGuessedLetters.includes(letter);
            const partial = !exact && partiallyGuessedLetters.includes(letter);
            const wrong = !exact && !partial && allGuessedLetters.includes(letter);

            return (
              <div
                key={letter}
                className={clsx(
                  "rounded-md m-[4px] flex h-[42px] w-[32px] sm:h-[50px] sm:w-[45px] lg:h-[60px] lg:w-[45px] items-center justify-center uppercase text-[1rem] sm:text-[1.5rem] font-extrabold cursor-pointer hover:brightness-90 transition-all ease-in delay-250",
                  {
                    "bg-zinc-500": !exact && !partial && !wrong,
                    "bg-zinc-700": wrong,
                    "bg-green-500": exact,
                    "bg-yellow-600": partial && !exact,
                    "px-4 box-border":
                      letter === SpecialKeyboardCharatersEnum.ENTER ||
                      letter === SpecialKeyboardCharatersEnum.BACKSPACE,
                  }
                )}
                onClick={() => handleClick(letter)}
              >
                {letter === SpecialKeyboardCharatersEnum.ENTER ? (
                  <div>
                    <MdKeyboardReturn />
                  </div>
                ) : letter === SpecialKeyboardCharatersEnum.BACKSPACE ? (
                  <div>
                    <MdBackspace />
                  </div>
                ) : (
                  letter
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
