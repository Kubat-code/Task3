import React, { createContext, useState, useCallback } from "react";
import styled from "styled-components";

export const ModalContext = createContext({
  isOpen: false,
  modalContent: null,
  modalTitle: "",
  openModal: (title, content) => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = useCallback((title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle("");
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, modalContent, modalTitle, openModal, closeModal }}
    >
      {children}
      {isOpen && (
        <Overlay onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h2>{modalTitle}</h2>
            <Content>{modalContent}</Content>
            <CloseButton onClick={closeModal}>Закрыть</CloseButton>
          </ModalBox>
        </Overlay>
      )}
    </ModalContext.Provider>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;
`;

const Content = styled.div`
  margin-top: 15px;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
