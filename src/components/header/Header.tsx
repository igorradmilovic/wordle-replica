import React, { useState } from "react";
import { MdHelpOutline } from "react-icons/md";
import wordleLogo from "../../assets/wordle_img.png";
import { Modal } from "../modal/Modal";
import { LetterItem } from "../letter-item/LetterItem";
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
        <div>
          <img className="max-w-[120px] h-[70px] bg-fixed" src={wordleLogo} />
        </div>
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
