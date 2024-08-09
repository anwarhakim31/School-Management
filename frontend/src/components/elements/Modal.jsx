import { Children, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const BackdropOverlay = ({ onClose }) => {
  return (
    <div
      role="dialog"
      onClick={() => onClose()}
      className="fixed w-screen h-screen inset-0 z-[50]  bg-black/30"
    ></div>
  );
};

const ModalOverlay = ({ onClose, showModal, children }) => {
  return (
    <div
      role="dialog"
      onClick={() => onClose()}
      className={`${
        showModal
          ? "opacity-100 sm:scale-100"
          : "opacity-0 translate-y-28 sm:translate-y-0 sm:scale-90"
      } fixed w-full h-full top-0 left-0 z-[100] flex justify-center items-end sm:items-center transition-all  duration-300`}
    >
      {children}
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, [10]);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <BackdropOverlay onClose={onClose} />,
        document.getElementById("root-modal-scholarcy")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay showModal={showModal} onClose={onClose}>
          {children}
        </ModalOverlay>,
        document.getElementById("root-modal-scholarcy")
      )}
    </>
  );
};

export default Modal;
