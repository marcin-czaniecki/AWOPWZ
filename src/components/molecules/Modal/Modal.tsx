import { createPortal } from "react-dom";
import Button from "components/atoms/Button/Button";
import { WrapperModal, BackgroundModal, HeaderModal, WrapperContentModal } from "./Modal.styles";
import useModal from "hooks/useModal";
import { IModalProps } from "types/componentTypes";

const RenderModal = ({ children, maxWidth, minWidth, maxHeight, closeAction }: IModalProps) => {
  const { modalNode, ref } = useModal(closeAction);

  return createPortal(
    <>
      <BackgroundModal ref={ref}>
        <WrapperModal maxWidth={maxWidth} minWidth={minWidth} maxHeight={maxHeight}>
          <HeaderModal>
            <Button typeButton="close" onClick={closeAction} />
          </HeaderModal>
          <WrapperContentModal>{children}</WrapperContentModal>
        </WrapperModal>
      </BackgroundModal>
    </>,
    modalNode
  );
};

const Modal = ({ active, children, maxWidth, minWidth, maxHeight, closeAction }: IModalProps) => (
  <>
    {active ? (
      <RenderModal maxWidth={maxWidth} minWidth={minWidth} maxHeight={maxHeight} closeAction={closeAction}>
        {children}
      </RenderModal>
    ) : null}
  </>
);

export default Modal;
