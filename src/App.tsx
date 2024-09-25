import { useEffect } from "react";
import { Header } from "./components/header/Header";
import { AppDispatch } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { resetGame } from "./store/features/wordle/wordleSlice";
import { useWordle } from "./hooks/useWordleHook";
import { Actions } from "./components/actions/Actions";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Modal } from "./components/modal/Modal";
import { ModalContent } from "./components/modal/ModalContent";
import { Grid } from "./components/grid/Grid";
import { getWarningSelector } from "./store/features/wordle/selectors";

function App() {
  const dispatch: AppDispatch = useAppDispatch();
  const warning = useAppSelector(getWarningSelector);
  const { isWon, showModal, handleCloseModal } = useWordle();

  useEffect(() => {
    dispatch(resetGame());
  }, []);

  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center pt-4 mb-1">
        <Grid />
      </section>
      <section className="flex justify-center mb-1">
        <div className="text-md uppercase font-bold">{warning}</div>
      </section>
      <section className="w-full grid place-items-center mb-2">
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
