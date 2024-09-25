import React, { useMemo } from "react";
import { AppDispatch } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getFinalWordSelector } from "../../store/features/wordle/selectors";
import { resetGame } from "../../store/features/wordle/wordleSlice";
import { LetterItem } from "../letter-item/LetterItem";
import { Button } from "../shared/Button";

type Props = {
  handleModalClose(): void;
  isWon: boolean;
};

export const ModalContent = ({ isWon, handleModalClose }: Props) => {
  const dispatch: AppDispatch = useAppDispatch();
  const finalWord = useAppSelector(getFinalWordSelector);

  const handlePlayAgain = () => {
    dispatch(resetGame());
    handleModalClose();
  };

  const text = useMemo(() => {
    return isWon ? "You guessed the correct word" : "The correct word was";
  }, [isWon]);

  return (
    <div className="grid place-items-center text-center items-stretch h-full">
      <div className="mb-8">
        <div className="text-2xl mb-4">{text}</div>
        <LetterItem isItemGuessedAlready={isWon} finalWord={finalWord} currentGuess={finalWord} />
      </div>

      <Button className="bg-green-800 place-self-end" onClick={handlePlayAgain}>
        Play Again
      </Button>
    </div>
  );
};
