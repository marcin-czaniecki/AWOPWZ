import Hamburger from "components/atoms/Hamburger/Hamburger";
import SideBar from "components/atoms/SideBar/SideBar";
import CustomLink from "components/molecules/CustomLink/CustomLink";
import { auth } from "fb/fb";
import { signOut } from "firebase/auth";
import useHandleModal from "hooks/useHandleModal";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { views } from "view/views";
import { WrapperNavigation, LogOutButton } from "./Navigation.styles";

const Navigation = () => {
  const { visible, ref, close, inverse } = useHandleModal();
  return (
    <>
      <SideBar ref={ref} active={visible} zIndex="12">
        <WrapperNavigation>
          {views.map(({ to, path, text }) => {
            if (!to || !text) {
              return <Fragment key={path}></Fragment>;
            }
            return (
              <CustomLink key={text + to} to={to} onClick={close}>
                {text}
              </CustomLink>
            );
          })}
          <Link to="/unauthorization">
            <LogOutButton onClick={() => signOut(auth)}>Wyloguj</LogOutButton>
          </Link>
        </WrapperNavigation>
      </SideBar>
      <Hamburger active={visible} onClick={() => inverse()} />
    </>
  );
};

export default Navigation;
