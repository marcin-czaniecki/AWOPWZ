import styled, { css } from "styled-components";

const Wip = styled.div<{ wip?: boolean }>`
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

export default Wip;
