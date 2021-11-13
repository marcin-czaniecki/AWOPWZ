import { createPortal } from "react-dom";
import CloseButton from "components/atoms/CloseButton/CloseButton";
import { Wrapper, Background, HeaderModal, WrapperContent } from "./Modal.styles";
import useModal from "hooks/useModal";
import { IModal } from "types/types";

const RenderModal = ({ children, maxWidth, minWidth, maxHeight, closeAction }: IModal) => {
  const { modalNode, ref } = useModal(closeAction);

  return createPortal(
    <>
      <Background ref={ref}>
        <Wrapper maxWidth={maxWidth} minWidth={minWidth} maxHeight={maxHeight}>
          <HeaderModal>
            <CloseButton onClick={closeAction} />
          </HeaderModal>
          <WrapperContent>{children}</WrapperContent>
        </Wrapper>
      </Background>
    </>,
    modalNode
  );
};

const Modal = ({ active, children, maxWidth, minWidth, maxHeight, closeAction }: IModal) => (
  <>
    {active ? (
      <RenderModal maxWidth={maxWidth} minWidth={minWidth} maxHeight={maxHeight} closeAction={closeAction}>
        {children}
      </RenderModal>
    ) : null}
  </>
);

export default Modal;
