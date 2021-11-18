import styled, { css } from "styled-components";

export const WrapperProjectColumnTasks = styled.div`
  display: flex;
  flex-direction: column;
  height: min(calc(100vh - 150px), 600px);
  padding-right: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  gap: 5px;
  overflow-y: auto;
`;

export const Wip = styled.div<{ wip?: boolean }>`
  position: relative;
  ${({ wip }) =>
    wip &&
    css`
      border-bottom: solid 4px ${({ theme }) => theme.color.error};
      padding-bottom: 10px;
      margin-bottom: 30px;
      ::after {
        content: "Przekroczenie WIP";
        position: absolute;
        display: block;
        color: ${({ theme }) => theme.color.error};
        font-weight: ${({ theme }) => theme.font.weight.medium};
        bottom: -30px;
      }
    `}
`;
