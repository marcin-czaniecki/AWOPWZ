import { ReactElement } from "react";
import styled from "styled-components";
import Navigation from "components/organisms/Navigation/Navigation";
import { useUser } from "hooks/useUser";
import Toast from "components/organisms/Toast/Toast";
import { useToast } from "hooks/useToast";
import { useLocation } from "react-router-dom";
import { views } from "view/views";

const MainTemplateWrapper = styled.main`
  padding: 50px 10px 40px;
`;

const WrapperViewHeader = styled.div<{ isVisable: boolean }>`
  display: ${({ isVisable }) => (isVisable ? "flex" : "none")};
  text-transform: capitalize;
  font-size: ${({ theme }) => theme.font.size.l};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const ViewHeaderTitle = styled.p`
  margin: 0 0px 0px auto;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
`;

const ViewHeader = () => {
  const location = useLocation();
  const view = views.find((value) => value.path === location.pathname);
  return (
    <WrapperViewHeader isVisable={view ? true : false}>
      <ViewHeaderTitle>{view?.text}</ViewHeaderTitle>
    </WrapperViewHeader>
  );
};

const MainTemplate = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const { currentUser } = useUser();
  const { message, type } = useToast();

  return (
    <>
      {currentUser && (
        <>
          <Navigation />
          <ViewHeader />
        </>
      )}
      <MainTemplateWrapper>{children}</MainTemplateWrapper>
      <Toast message={message} type={type} />
    </>
  );
};

export default MainTemplate;
