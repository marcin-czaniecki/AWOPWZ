import { ReactElement } from "react";
import styled from "styled-components";
import Navigation from "components/organisms/Navigation/Navigation";
import { useUser } from "hooks/useUser";

const MainTemplateWrapper = styled.main`
  padding: 60px 10px;
`;

const MainTemplate = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const { currentUser } = useUser();
  return (
    <>
      {currentUser && <Navigation />}
      <MainTemplateWrapper>{children}</MainTemplateWrapper>
    </>
  );
};

export default MainTemplate;
