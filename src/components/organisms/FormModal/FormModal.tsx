import Button from "components/atoms/Button/Button";
import Modal from "components/molecules/Modal/Modal";
import useUpdateEffect from "hooks/useUpdateEffect";
import { useState, useRef } from "react";
import { IFormModalProps } from "types/componentTypes";

const FormModal = ({ textButton, children, maxHeight, maxWidth }: IFormModalProps) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    const current = ref.current;
    if (!current) return;

    const buttons = current.querySelectorAll("button");
    if (!buttons) return;

    const closeModalEvent = () => {
      setTimeout(() => {
        setActive(false);
      }, 0);
    };

    const lastButton = buttons[buttons?.length - 1];
    lastButton.addEventListener("mouseup", closeModalEvent);

    return () => {
      lastButton.removeEventListener("mouseup", closeModalEvent);
    };
  }, [active]);

  return (
    <>
      <Button type="button" onClick={() => setActive(true)}>
        {textButton}
      </Button>
      <Modal
        active={active}
        closeAction={() => setActive(false)}
        maxHeight={maxHeight || "100px"}
        maxWidth={maxWidth || "300px"}
      >
        <div ref={ref}>{children}</div>
      </Modal>
    </>
  );
};

export default FormModal;
