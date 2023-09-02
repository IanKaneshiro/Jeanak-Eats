import React, { useState } from "react";

const DialogContext = React.createContext();

export function DialogProvider({ children }) {
  const [modalRef, setModalRef] = useState(null);

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setModalRef(null);
    }
  };

  const contextValue = {
    setModalRef,
    showModal,
    closeModal,
  };

  return (
    <>
      <DialogContext.Provider value={contextValue}>
        {children}
      </DialogContext.Provider>
    </>
  );
}
