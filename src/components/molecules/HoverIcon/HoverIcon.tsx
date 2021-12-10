import { IHoverIconProps } from "types/componentTypes";
import { WrapperHoverIcon, WrapperHoverIconChildren } from "./HoverIcon.styles";

const HoverIcon = ({ letter, children }: IHoverIconProps) => {
  return (
    <WrapperHoverIcon>
      {letter} {children && <WrapperHoverIconChildren>{children}</WrapperHoverIconChildren>}
    </WrapperHoverIcon>
  );
};

export default HoverIcon;
