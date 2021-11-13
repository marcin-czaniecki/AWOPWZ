import Hamburger from "components/atoms/Hamburger/Hamburger";
import { auth } from "data/fb";
import { signOut } from "firebase/auth";
import useHandleModal from "hooks/useHandleModal";
import { ReactElement, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, PathMatch, useMatch, useResolvedPath } from "react-router-dom";
import styled, { css } from "styled-components";
import type { LinkProps } from "react-router-dom";
import WrapperSideBar from "components/atoms/WrapperSideBar/WrapperSideBar";

const WrapperNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
  margin-top: 10%;
`;
const LogOutButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: calc(50% - 100px);
  width: 200px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    transition: 300ms;
  }
`;

const StyledLink = styled(Link)<{ active?: PathMatch<string> | null }>`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.font.size.l};
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.color.secondary};
    `}
`;

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <StyledLink to={to} active={match} {...props}>
      {children}
    </StyledLink>
  );
};

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
          <CustomLink
            to="/"
            onClick={() => {
              close();
            }}
          >
            dashboard
          </CustomLink>
          <CustomLink
            to="/users"
            onClick={() => {
              close();
            }}
          >
            użytkownicy
          </CustomLink>
          <CustomLink
            to="/projects"
            onClick={() => {
              close();
            }}
          >
            projekty
          </CustomLink>
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

const MainTemplateWrapper = styled.main`
  padding: 50px 10px;
`;

const MainTemplate = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [user] = useAuthState(auth);
  return (
    <>
      {user && <Navigation />}
      <MainTemplateWrapper>{children}</MainTemplateWrapper>
    </>
  );
};

export default MainTemplate;
