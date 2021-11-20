import { auth } from "data/fb";
import { ReactElement } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import Navigation from "components/organisms/Navigation/Navigation";

const MainTemplateWrapper = styled.main`
  padding: 60px 10px;
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
