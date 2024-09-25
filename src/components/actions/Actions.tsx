import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isGameEndSelector } from "../../store/features/wordle/selectors";
import { AppDispatch } from "../../store/store";
import { handleClearCurrentGuess, resetGame } from "../../store/features/wordle/wordleSlice";
import { Button } from "../shared/Button";

export const Actions = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const isGameEnd = useAppSelector(isGameEndSelector);

  const handlePlayAgain = () => {
    dispatch(resetGame());
  };

  const handleClear = () => {
    dispatch(handleClearCurrentGuess());
  };

  return (
    <div className="flex gap-4">
      {isGameEnd ? (
        <Button className="bg-slate-700" onClick={handlePlayAgain}>
          Play Again
        </Button>
      ) : (
        <>
          <Button className="bg-slate-700 border-slate-500" onClick={handleClear}>
            Reset
          </Button>
          <Button className="bg-yellow-600" onClick={handlePlayAgain}>
            New Word
          </Button>
        </>
      )}
    </div>
  );
};
