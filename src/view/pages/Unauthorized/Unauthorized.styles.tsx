import styled, { css } from "styled-components";

export const WrapperUnauthorized = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  width: 300px;
  min-height: 300px;
  flex-direction: column;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  transition: 300ms;
`;

export const ControlButtons = styled.div`
  display: flex;
`;

export const ControlButton = styled.button<{ active: boolean }>`
  display: flex;
  width: 100%;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  transition: 300ms;
  color: ${({ active, theme }) => (active ? theme.color.secondary : "black")};
  text-transform: capitalize;
  background: ${({ active, theme }) => (active ? theme.color.background : `rgba(0, 0, 0, 0.1)`)};
  ${({ active }) =>
    !active &&
    css`
      box-shadow: inset -10px -5px 20px -5px rgba(0, 0, 0, 0.2);
    `}
`;

export const WrapperForm = styled.div`
  width: 100%;
  min-height: 260px;
  padding: 10px 20px;
`;
