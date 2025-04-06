"use client";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useCloseOutsideClick from "../_lib/hooks/useCloseOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  padding: 3.2rem 4rem;
  overflow-y: auto;
  scrollbar-width: none;

  /* width: ${(props) => props.widthsize};
  height: ${(props) => props.sizetall}; */
  width: 40vw;
  height: auto;
  @media screen and (max-width: 976px) {
    width: 80vw;
  }
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  transform: translateX(0.8rem);
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: #1f2937;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    fill: #9ca3af;
    stroke: #9ca3af;
    color: #9ca3af;
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = () => setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open, setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { setOpenName } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => setOpenName(opens) });
}
function Window({ children, name, sizetall = "auto", widthsize = "auto" }) {
  const { close, openName } = useModalContext();
  const { ref } = useCloseOutsideClick(close);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref} sizetall={sizetall} widthsize={widthsize}>
        <div>
          <Button onClick={close}>
            <svg>
              <XMarkIcon className="h-4 w-4" />
            </svg>
          </Button>
          <div>
            <div style={{ textWrap: "wrap", marginRight: "200px" }}>
              {cloneElement(children, { onCloseModal: close })}
            </div>
          </div>
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
// Modal.Open = Open;
// Modal.Window = Window;

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === "undefined") return;
  return context;
}
export { Modal, Open, Window };
