import { ReactChild } from "react";
import styled from "styled-components";

const WrapperMashTemplate = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: clamp(300px, 100%, 1300px);
  margin: 0 auto;
  justify-content: center;
  gap: 20px;
`;

const MashTemplate = ({ children }: { children: ReactChild | ReactChild[] }) => {
  return <WrapperMashTemplate>{children}</WrapperMashTemplate>;
};

export default MashTemplate;
