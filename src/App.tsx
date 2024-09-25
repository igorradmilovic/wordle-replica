import { useEffect } from "react";
import { LetterItem } from "./components/letter-item/LetterItem";
import { Header } from "./components/header/Header";
import { AppDispatch } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { resetGame } from "./store/features/wordle/wordleSlice";
import {
  getCurrentGuessIndexSelector,
  getFinalWordSelector,
  getGuessesSelector,
} from "./store/features/wordle/selectors";
import { useWordle } from "./hooks/useWordleHook";
import { Actions } from "./components/actions/Actions";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Modal } from "./components/modal/Modal";
import { ModalContent } from "./components/modal/ModalContent";

function App() {
  const dispatch: AppDispatch = useAppDispatch();

  const finalWord = useAppSelector(getFinalWordSelector);
  const guesses = useAppSelector(getGuessesSelector);
  const currentGuessIndex = useAppSelector(getCurrentGuessIndexSelector);

  const { isWon, showModal, handleCloseModal } = useWordle();

  useEffect(() => {
    dispatch(resetGame());
  }, []);

  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center py-4 mb-3">
        {guesses.map((guess, i) => (
          <LetterItem
            key={i}
            isItemGuessedAlready={i < currentGuessIndex}
            currentGuess={guess}
            finalWord={finalWord}
          />
        ))}
      </section>
      <section className="w-full grid place-items-center mb-3">
        <Actions />
      </section>
      <section className="w-full">
        <Keyboard />
      </section>
      <Modal title={`You ${isWon ? "Won" : "Lost"}!`} show={showModal} onClose={handleCloseModal}>
        {<ModalContent isWon={isWon} handleModalClose={handleCloseModal} />}
      </Modal>
    </>
  );
}

export default App;
