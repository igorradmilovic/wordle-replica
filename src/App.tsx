import { useEffect } from "react";
import { Header } from "./components/header/Header";
import { AppDispatch } from "./store/store";
import { useAppDispatch } from "./store/hooks";
import { resetGame } from "./store/features/wordle/wordleSlice";
import { useWordle } from "./hooks/useWordleHook";
import { Actions } from "./components/actions/Actions";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Modal } from "./components/modal/Modal";
import { ModalContent } from "./components/modal/ModalContent";
import { Grid } from "./components/grid/Grid";

function App() {
  const dispatch: AppDispatch = useAppDispatch();

  const { isWon, showModal, handleCloseModal } = useWordle();

  useEffect(() => {
    dispatch(resetGame());
  }, []);

  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center py-4 mb-3">
        <Grid />
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
