import AddButton from "components/atoms/AddButton/AddButton";
import WrapperSideBar from "components/atoms/WrapperSideBar/WrapperSideBar";
import { ReactChild, useState } from "react";

const SideBar = ({ right, children }: { right?: boolean; children: ReactChild }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <AddButton active={active} onClick={() => setActive(!active)} />
      <WrapperSideBar active={active} right={right}>
        {children}
      </WrapperSideBar>
    </>
  );
};

export default SideBar;
