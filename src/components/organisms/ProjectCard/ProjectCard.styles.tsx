import styled from "styled-components";
import { Incoming } from "utils/animations";

export const WrapperProjectCard = styled.div`
  animation: ${Incoming} 1s;
`;

export const WrapperContentProjectCard = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  padding-bottom: 30px;
  color: snow;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.primary};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12),
    0 8px 8px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.12);
  :hover {
    transform: scale(1.1);
    transition: 300ms;
  }
`;
