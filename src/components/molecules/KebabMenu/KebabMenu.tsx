import Button from "components/atoms/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import { IKebabMenuProps } from "types/componentTypes";
import { WrapperKebabMenu, WrapperKebabMenuContent } from "./KebabMenu.styles";

const KebabMenu = ({ children, color, top }: IKebabMenuProps) => {
  const [visible, setVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;
    if (!current || !visible) return;
    const closeAction = ({ target }: MouseEvent) => {
      if (!target) return;
      const element = target as HTMLElement;
      const main = document.querySelector("main");
      if (main?.contains(element) && !current.contains(element)) {
        setVisible(false);
      }
    };
    document.addEventListener("click", closeAction);
    return () => {
      document.removeEventListener("click", closeAction);
    };
  }, [visible]);

  return (
    <WrapperKebabMenu ref={ref}>
      <Button typeButton="kebab" colorKebab={color} onClick={() => setVisible(!visible)}>
        <span />
        <span />
        <span />
      </Button>
      {visible && (
        <WrapperKebabMenuContent top={top}>
          <>{children}</>
        </WrapperKebabMenuContent>
      )}
    </WrapperKebabMenu>
  );
};

export default KebabMenu;
