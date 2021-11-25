import styled from "styled-components";

export const HiddenChatButton = styled.button<{ visible: boolean }>`
  position: fixed;
  left: 0;
  bottom: 0;
  display: ${({ visible }) => (!visible ? "block" : "none")};
  width: 300px;
  height: 30px;
  border: none;
  color: snow;
  background-color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const WrapperProjectChat = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  padding: 10px 20px 0 0;
  flex-direction: column;
  width: 340px;
  z-index: 10;
  button:first-child {
    margin-left: auto;
  }
`;
