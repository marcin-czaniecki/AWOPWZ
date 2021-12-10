import styled, { css } from "styled-components";

export const WrapperMessage = styled.div`
  display: flex;
  position: relative;
  padding: 5px 10px 10px;
  & > div:nth-child(2) {
    margin-top: auto;
    margin-bottom: 5px;
  }
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
`;

export const WrapperMessageBody = styled.div<{ isCurrentUser?: boolean }>`
  display: grid;
  grid-template-columns: ${({ isCurrentUser }) => (isCurrentUser ? "1fr 9fr" : "9fr 1fr")};
  gap: 10px;
  div {
    display: grid;
    gap: 15px;
  }
  & > div:nth-child(1) {
    ${({ isCurrentUser }) =>
      !isCurrentUser &&
      css`
        grid-column: 2 / 3;
        * {
        }
      `}
  }
  & > div:nth-child(2) {
    ${({ isCurrentUser }) =>
      !isCurrentUser &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: left;
        * {
          margin-left: 0;
          margin-right: auto;
        }
      `}
  }
`;
export const AuthorFiled = styled.div<{ autoMarginLeft?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-left: ${({ autoMarginLeft }) => autoMarginLeft && "auto"};
`;

export const WrapperMessageContent = styled.div<{ isCurrentUser?: boolean }>`
  background: ${({ theme, isCurrentUser }) =>
    isCurrentUser ? theme.color.primary : theme.color.text};
  margin-left: ${({ isCurrentUser }) => isCurrentUser && "100px"};
  color: snow;
  padding: 10px 15px;
  margin-left: auto;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.font.size.s};
`;
