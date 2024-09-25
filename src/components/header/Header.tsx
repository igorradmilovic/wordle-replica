import { useState } from "react";
import { MdHelpOutline } from "react-icons/md";
import { Modal } from "../modal/Modal";
import { HelpModalContent } from "./HelpModalContent";

export const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleHelpClick = () => {
    setShowModal(!showModal);
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <header className="w-full border-b-2 border-zinc-700 flex justify-between items-center px-8 py-1">
        <div className="text-2xl font-extrabold tracking-wider">Wordle</div>
        <div
          className="text-[1.5rem] cursor-pointer hover:scale-125 transition 500ms"
          onClick={handleHelpClick}
        >
          <MdHelpOutline />
        </div>
      </header>
      <Modal
        className="min-h-[90vh]"
        show={showModal}
        onClose={handleModalClose}
        title={"How To Play"}
      >
        <HelpModalContent />
      </Modal>
    </>
  );
};
