import { useCallback, useEffect, useState } from "react";
import { isGameLostSelector, isGameWonSelector } from "../store/features/wordle/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AppDispatch } from "../store/store";
import {
  handleBackspaceOnGuess,
  handleSetCurrentGuess,
  handleSubmitGuess,
} from "../store/features/wordle/wordleSlice";

export function useWordle() {
  const dispatch: AppDispatch = useAppDispatch();

  const isWon = useAppSelector(isGameWonSelector);
  const isLost = useAppSelector(isGameLostSelector);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUpEventListener);

    return () => {
      window.removeEventListener("keyup", handleKeyUpEventListener);
    };
  }, []);

  useEffect(() => {
    if (isWon || isLost) setShowModal(true);
  }, [isWon, isLost]);

  const handleKeyUpEventListener = useCallback(
    (e: KeyboardEvent) => {
      if (isWon || isLost) return;

      if (e.key === "Enter") {
        return dispatch(handleSubmitGuess());
      }

      if (e.key === "Backspace") {
        dispatch(handleBackspaceOnGuess());
        return;
      }

      dispatch(handleSetCurrentGuess(e.key));
    },
    [isWon, isLost, dispatch]
  );

  const handleCloseModal = () => setShowModal(false);

  return {
    isWon,
    isLost,
    showModal,
    handleCloseModal,
  };
}
