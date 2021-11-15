import styled, { css } from "styled-components";

const Button = styled.button<{ secondary?: boolean; tertiary?: boolean }>`
  padding: 4px 15px;
  color: ${({ theme }) => theme.color.primary};
  border: solid 1px ${({ theme }) => theme.color.primary};
  border-radius: 15px;
  cursor: pointer;
  transition: 300ms;
  :hover {
    background-color: ${({ theme }) => theme.color.primary};
    color: snow;
  }
  ${({ secondary }) =>
    secondary &&
    css`
      min-width: 60px;
      background-color: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.background};
      border-radius: 0px;
      :hover {
        background-color: snow;
        color: ${({ theme }) => theme.color.primary};
      }
    `}
`;

export default Button;
