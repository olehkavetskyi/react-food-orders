import { useEffect, useRef } from "react";

export default function Madal({open, onClose, children}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      console.log("Please")
      dialog.current.close();
    }
  }, [open])

  return (
    <dialog 
      className="modal" 
      ref={dialog} 
      onClose={onClose}
    >
      {open && children}
    </dialog>
  );
}