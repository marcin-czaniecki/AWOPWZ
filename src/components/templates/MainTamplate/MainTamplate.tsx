import { ReactElement } from "react";
import styled from "styled-components";
import Navigation from "components/organisms/Navigation/Navigation";
import { useUser } from "hooks/useUser";
import Toast from "components/organisms/Toast/Toast";
import { useToast } from "hooks/useToast";

const MainTemplateWrapper = styled.main`
  padding: 60px 10px;
`;

const MainTemplate = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const { currentUser } = useUser();
  const { message, type } = useToast();

  return (
    <>
      {currentUser && <Navigation />}
      <MainTemplateWrapper>{children}</MainTemplateWrapper>
      <Toast message={message} type={type} />
    </>
  );
};

export default MainTemplate;
