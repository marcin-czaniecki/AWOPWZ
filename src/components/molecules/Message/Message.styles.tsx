import styled from "styled-components";

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
  display: flex;
  flex-direction: ${({ isCurrentUser }) => !isCurrentUser && `row-reverse`};
  gap: 10px;
  div {
    display: grid;
    gap: 15px;
  }
  & > div:nth-child(1) {
    width: 40px;
    margin-left: ${({ isCurrentUser }) => !isCurrentUser && `40px`};
  }
  & > div:nth-child(2) {
  }
`;
export const AuthorFiled = styled.div<{ autoMarginLeft?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-left: ${({ autoMarginLeft }) => autoMarginLeft && "auto"};
`;

export const WrapperMessageContent = styled.div<{ isCurrentUser?: boolean }>`
  background: ${({ theme, isCurrentUser }) => (isCurrentUser ? theme.color.primary : theme.color.text)};
  margin-left: ${({ isCurrentUser }) => isCurrentUser && "100px"};
  color: snow;
  padding: 10px 15px;
  margin-left: auto;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.font.size.s};
`;

export const WrapperDataFiled = styled.div<{ autoMarginLeft?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-left: ${({ autoMarginLeft }) => autoMarginLeft && "auto"};
`;
