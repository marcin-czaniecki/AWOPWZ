import useHandleModal from "hooks/useHandleModal";
import { WrapperKebabMenu, ButtonKebabMenu, WrapperKebabMenuContent } from "./KebabMenu.styles";

const KebabMenu = ({ children, color }: { color?: string; children?: JSX.Element | JSX.Element[] }) => {
  const { visible, inverse } = useHandleModal();
  return (
    <WrapperKebabMenu>
      <ButtonKebabMenu
        color={color}
        onClick={() => {
          inverse();
        }}
      >
        <span />
        <span />
        <span />
      </ButtonKebabMenu>
      {visible && <WrapperKebabMenuContent>{children}</WrapperKebabMenuContent>}
    </WrapperKebabMenu>
  );
};

export default KebabMenu;
