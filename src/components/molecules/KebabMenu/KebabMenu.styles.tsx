import styled from "styled-components";

export const ButtonKebabMenu = styled.button<{ color?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 36px;
  width: 10px;
  background-color: transparent;
  border: none;
  gap: 3px;
  cursor: pointer;
  span {
    display: block;
    height: 6px;
    width: 6px;
    background-color: ${({ theme, color }) => (color ? color : theme.color.background)};
    border-radius: 1000%;
  }
`;

export const WrapperKebabMenuContent = styled.div<{ top?: boolean }>`
  position: absolute;
  right: 0%;
  top: ${({ top }) => (top ? "-100%" : "100%")};
  display: flex;
  gap: 5px;
  background-color: ${({ theme }) => theme.color.background};
  z-index: 8;
  -webkit-box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
  box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
`;

export const WrapperKebabMenu = styled.div`
  position: relative;
  margin-left: auto;
`;
