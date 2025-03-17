import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();
  }, []);

  return createPortal(
    <dialog className={classes.modal} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
