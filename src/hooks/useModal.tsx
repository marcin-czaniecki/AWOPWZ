import { useRef, useEffect } from "react";

const modalContainer = document.createElement("div");
document.body.prepend(modalContainer);

const useModal = (closeAction: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  const modalNode = document.createElement("div");

  useEffect(() => {
    const { current } = ref;
    if (!current) return;

    const closeModal = ({ target }: Event) => current === target && closeAction();

    current.addEventListener("click", closeModal);
    return () => {
      current.removeEventListener("click", closeModal);
    };
  }, [closeAction]);

  useEffect(() => {
    if (!modalContainer) return;

    modalContainer.appendChild(modalNode);
    return () => {
      modalContainer.removeChild(modalNode);
    };
  }, [modalNode]);

  return { ref, modalNode };
};

export default useModal;
