import styled from "styled-components";

export const WrapperProjectTask = styled.div<{ backgroundColor: string; color: string }>`
  position: relative;
  display: flex;
  min-height: 100px;
  max-height: 150px;
  padding: 3px 5px 0px 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  box-shadow: 2px 2px 3px 1px rgb(0 0 0 / 0.3);
`;

export const ButtonsProjectTask = styled.div`
  position: absolute;
  bottom: 5px;
  display: flex;
  margin-top: auto;
  gap: 5px;
`;
