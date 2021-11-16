import styled from "styled-components";
import { Incoming } from "utils/animations";

export const WrapperProjectTask = styled.div<{ backgroundColor: string; color: string }>`
  position: relative;
  display: flex;
  min-height: 100px;
  max-height: 150px;
  padding: 3px 5px 0px 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  box-shadow: 2px 2px 3px 1px rgb(0 0 0 / 0.3);
  animation: ${Incoming} 1s;
`;

export const ButtonsProjectTask = styled.div`
  position: absolute;
  left: 2.5%;
  bottom: 7px;
  width: 100%;
  display: flex;
  width: 95%;
  margin-top: auto;
  gap: 5px;
`;
