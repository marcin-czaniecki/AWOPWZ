import Button from "components/atoms/Button/Button";
import { useState } from "react";
import { PropsConfirmModal } from "types/types";
import Modal from "../Modal/Modal";
import { WrapperConfirmButtons } from "./ConfirmModal.styles";

const ConfirmModal = ({
  confirmAction,
  textButton,
  children,
  buttonVersion,
  maxHeight,
  maxWidth,
  invisibleYes,
  invisibleNo,
}: PropsConfirmModal) => {
  const [active, setActive] = useState(false);
  const openModal = () => {
    setActive(true);
  };
  const closeModal = () => {
    setActive(false);
  };
  return (
    <>
      <Button onClick={openModal} secondary={buttonVersion === "secondary"} tertiary={buttonVersion === "tertiary"}>
        {textButton}
      </Button>
      <Modal active={active} closeAction={closeModal} maxHeight={maxHeight || "100px"} maxWidth={maxWidth || "300px"}>
        <div>
          <div>{children}</div>
          <WrapperConfirmButtons>
            {!invisibleYes && (
              <Button
                onClick={() => {
                  confirmAction();
                  closeModal();
                }}
                secondary
              >
                Tak
              </Button>
            )}
            {!invisibleNo && (
              <Button onClick={closeModal} secondary>
                Nie
              </Button>
            )}
          </WrapperConfirmButtons>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
