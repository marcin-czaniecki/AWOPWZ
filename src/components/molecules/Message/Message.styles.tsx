import styled from "styled-components";

export const WrapperMessage = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 5px 10px 10px;
  gap: 10px;
  ::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
`;

export const DataFiled = styled.div<{ isI?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-left: ${({ isI }) => isI && "auto"};
`;
export const ContentMessage = styled.div`
  padding: 0 10px;
  font-size: ${({ theme }) => theme.font.size.s};
`;

export const KebabButton = styled.div`
  position: relative;
  ::after {
  }
  ::before {
  }
`;
