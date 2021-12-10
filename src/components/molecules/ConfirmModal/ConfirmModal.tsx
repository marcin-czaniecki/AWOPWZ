import Button from "components/atoms/Button/Button";
import Modal from "components/molecules/Modal/Modal";
import { useState } from "react";
import { IModalConfirmProps } from "types/componentTypes";
import { WrapperConfirmButtons } from "./ConfirmModal.styles";

const ConfirmModal = ({
  confirmAction,
  textButton,
  children,
  maxHeight,
  maxWidth,
  invisibleYes,
  invisibleNo,
}: IModalConfirmProps) => {
  const [active, setActive] = useState(false);

  const openModal = () => {
    setActive(true);
  };

  const closeModal = () => {
    setActive(false);
  };

  const onConfirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
    closeModal();
  };

  return (
    <>
      <Button type="button" onClick={openModal}>
        {textButton}
      </Button>
      <Modal
        active={active}
        closeAction={closeModal}
        maxHeight={maxHeight || "100px"}
        maxWidth={maxWidth || "300px"}
      >
        <div>
          <div>{children}</div>
          <WrapperConfirmButtons>
            {!invisibleYes && <Button onClick={onConfirmAction}>Tak</Button>}
            {!invisibleNo && <Button onClick={closeModal}>Nie</Button>}
          </WrapperConfirmButtons>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
