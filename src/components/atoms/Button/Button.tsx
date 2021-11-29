import styled, { css } from "styled-components";

type TypeButton = "default" | "arrow" | "close" | "kebab" | "add";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  typeButton?: TypeButton;
  arrowRight?: boolean;
  size?: string;
  colorKebab?: string;
  active?: boolean;
  right?: string;
  bottom?: string;
  left?: string;
  top?: string;
}

const Button = styled.button<IButtonProps>`
  ${({ typeButton }) =>
    (!typeButton || typeButton === "default") &&
    css`
      min-height: 30px;
      min-width: 80px;
      padding: 4px 15px;
      font-weight: ${({ theme }) => theme.font.weight.medium};
      background-color: ${({ theme }) => theme.color.secondary};
      color: ${({ theme }) => theme.color.background};
      border: solid 1px ${({ theme }) => theme.color.secondary};
      border-radius: 0px;
      :hover {
        color: ${({ theme }) => theme.color.secondary};
        background-color: snow;
      }
    `}
  ${({ typeButton, arrowRight, size }) =>
    typeButton === "arrow" &&
    css`
      position: relative;
      min-height: ${size ? size : "35px"};
      max-height: ${size ? size : "35px"};
      min-width: ${size ? size : "35px"};
      max-width: ${size ? size : "35px"};
      background-color: ${({ theme }) => theme.color.primary};
      border: none;
      z-index: 8;
      transform: rotate(${arrowRight ? "180deg" : "0deg"});
      ::after {
        content: " ";
        position: absolute;
        width: 30%;
        height: 4px;
        background-color: snow;
        left: 32%;
        top: calc(50% - 1.5px);
        transform: translateY(70%) rotate(45deg);
      }
      ::before {
        content: " ";
        position: absolute;
        width: 30%;
        height: 4px;
        background-color: snow;
        left: 32%;
        top: calc(50% - 1.5px);
        transform: translateY(-70%) rotate(-45deg);
      }
      :hover {
        transform: rotate(${arrowRight ? "180deg" : "0deg"}) scale(1.1);
      }
    `}
  ${({ typeButton }) =>
    typeButton === "close" &&
    css`
      position: relative;
      height: 30px;
      width: 30px;
      margin-bottom: 10px;
      border: solid 2px ${({ theme }) => theme.color.background};
      background: ${({ theme }) => theme.color.primary};
      border-radius: 100%;
      ::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 3px;
        width: 70%;
        background: ${({ theme }) => theme.color.background};
        transform: translate(-50%, -50%) rotate(45deg);
        transition: 300ms;
      }
      ::before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 3px;
        width: 70%;
        background: ${({ theme }) => theme.color.background};
        transform: translate(-50%, -50%) rotate(-45deg);
        transition: 300ms;
      }
      &:hover {
        transform: scale(1.1) rotate(90deg);
        transition: 300ms;
      }
    `}
  ${({ typeButton, colorKebab }) =>
    typeButton === "kebab" &&
    css`
      position: relative;
      display: flex;
      flex-direction: column;
      max-height: 36px;
      width: 20px;
      background-color: transparent;
      border: none;
      gap: 3px;
      cursor: pointer;
      span {
        display: block;
        margin-left: auto;
        height: 6px;
        width: 6px;
        background-color: ${({ theme }) =>
          colorKebab ? colorKebab : theme.color.background};
        border-radius: 1000%;
      }
    `}
  ${({ typeButton, active, size, top, left, right, bottom }) =>
    typeButton === "add" &&
    css`
      position: fixed;
      top: ${top ? top : "unset"};
      left: ${left ? left : "unset"};
      right: ${right ? right : "30px"};
      bottom: ${bottom ? bottom : "20px"};
      height: ${size ? size : "60px"};
      width: ${size ? size : "60px"};
      border: solid 3px ${({ theme }) => theme.color.background};
      background: ${({ theme }) => theme.color.primary};
      border-radius: 100%;
      transform: rotate(${active ? "135deg" : "0deg"});
      transition: 300ms;
      z-index: 10;
      ::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 5px;
        width: 80%;
        background: ${({ theme }) => theme.color.background};
        transform: translate(-50%, -50%) rotate(0deg);
        transition: 300ms;
      }
      ::before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 5px;
        width: 80%;
        background: ${({ theme }) => theme.color.background};
        transform: translate(-50%, -50%) rotate(-90deg);
        transition: 300ms;
      }
      &:hover {
        transform: rotate(${active ? "135deg" : "0deg"}) scale(1.1);
      }
    `}
`;

export default Button;
