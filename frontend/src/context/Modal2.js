import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal2.css";


const ModalContext2 = React.createContext();

export function ModalProvider2({ children }) {
  const modalRef2 = useRef();
  const [modalContent2, setModalContent2] = useState(null);
  const [onModalClose2, setOnModalClose2] = useState(null);

  const closeModal2 = () => {
    setModalContent2(null);
    if (typeof onModalClose2 === "function") {
      setOnModalClose2(null);
      onModalClose2();
    }
  };

  const contextValue2 = {
    modalRef2,
    modalContent2,
    setModalContent2,
    setOnModalClose2,
    closeModal2,
  };

  return (
    <>
      <ModalContext2.Provider value={contextValue2}>
        {children}
      </ModalContext2.Provider>
      <div ref={modalRef2} />
    </>
  );
}

export function Modal2() {
  const { modalRef2, modalContent2, closeModal2 } = useContext(ModalContext2);
  const targetRef = useRef()
  console.log(modalRef2)
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef2 || !modalRef2.current || !modalContent2) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal2">
      <div id="modal-background2" />
      <div id="modal-content2">{modalContent2}</div>
    </div>,
    modalRef2.current
  );
}

export const useModal2 = () => useContext(ModalContext2);
