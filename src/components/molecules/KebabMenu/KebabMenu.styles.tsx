import styled from "styled-components";

export const ButtonKebabMenu = styled.button<{ color?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 36px;
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
    background-color: ${({ theme, color }) => (color ? color : theme.color.background)};
    border-radius: 1000%;
  }
`;

export const WrapperKebabMenuContent = styled.div<{ top?: boolean }>`
  position: absolute;
  right: ${({ top }) => (top ? "50%" : "0%")};
  top: ${({ top }) => !top && "30px"};
  bottom: ${({ top }) => top && "30px"};
  display: grid;
  max-width: 200px;
  background-color: ${({ theme }) => theme.color.background};
  gap: 5px;
  z-index: 8;
  -webkit-box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
  box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
  button {
    width: 100%;
  }
`;

export const WrapperKebabMenu = styled.div`
  max-height: 36px;
  position: relative;
  margin-left: auto;
`;
