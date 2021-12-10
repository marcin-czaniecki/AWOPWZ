import Button from "components/atoms/Button/Button";
import SideBar from "components/atoms/SideBar/SideBar";
import { useState } from "react";
import { IAdditionBarProps } from "types/componentTypes";

const AdditionBar = ({ right, children }: IAdditionBarProps) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Button typeButton="add" right={"10px"} active={active} onClick={() => setActive(!active)} />
      <SideBar active={active} right={right}>
        {children}
      </SideBar>
    </>
  );
};

export default AdditionBar;
