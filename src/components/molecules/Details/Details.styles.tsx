import styled from "styled-components";
import { Incoming } from "utils/animations";

export const WrapperDetails = styled.details`
  margin-bottom: 20px;
  summary {
    cursor: pointer;
    user-select: none;
  }
  p {
    margin: 0;
  }
`;

export const WrapperDetailsElements = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const WrapperDetailsElement = styled.div`
  display: flex;
  min-height: 110px;
  width: 280px;
  padding: 10px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.text};
  gap: 10px;
  animation: ${Incoming} 500ms linear;
`;
