import { useState } from "react";
import { IKebabMenuProps } from "types/componentTypes";
import { WrapperKebabMenu, ButtonKebabMenu, WrapperKebabMenuContent } from "./KebabMenu.styles";

const KebabMenu = ({ children, color, top }: IKebabMenuProps & { top?: boolean }) => {
  const [visible, setVisible] = useState(false);
  return (
    <WrapperKebabMenu>
      <ButtonKebabMenu
        color={color}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <span />
        <span />
        <span />
      </ButtonKebabMenu>
      {visible && (
        <WrapperKebabMenuContent top={top}>
          <>{children}</>
        </WrapperKebabMenuContent>
      )}
    </WrapperKebabMenu>
  );
};

export default KebabMenu;
