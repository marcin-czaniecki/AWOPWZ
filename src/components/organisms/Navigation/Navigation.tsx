import Hamburger from "components/atoms/Hamburger/Hamburger";
import WrapperSideBar from "components/atoms/WrapperSideBar/WrapperSideBar";
import CustomLink from "components/molecules/CustomLink/CustomLink";
import { auth } from "data/fb";
import { signOut } from "firebase/auth";
import useHandleModal from "hooks/useHandleModal";
import { views } from "view/views";
import { WrapperNavigation, LogOutButton } from "./Navigation.styles";

const Navigation = () => {
  const { visible, ref, close, inverse } = useHandleModal();
  return (
    <>
      <Hamburger
        active={visible}
        onClick={() => {
          inverse();
        }}
      />
      <WrapperSideBar ref={ref} active={visible}>
        <WrapperNavigation>
          {views.map(({ to, text }) => {
            if (!to || !text) {
              return <></>;
            }
            return (
              <CustomLink
                to={to}
                onClick={() => {
                  close();
                }}
              >
                {text}
              </CustomLink>
            );
          })}
          <LogOutButton
            onClick={() => {
              signOut(auth);
            }}
          >
            Log out
          </LogOutButton>
        </WrapperNavigation>
      </WrapperSideBar>
    </>
  );
};

export default Navigation;
