import styled from "styled-components";

export const WrapperProjectColumnTasks = styled.div`
  display: flex;
  flex-direction: column;
  height: min(calc(100vh - 150px), 600px);
  padding-right: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  gap: 5px;
  overflow-y: auto;
`;

export const WrapperProjectColumnHeader = styled.div`
  display: flex;
  position: relative;
  padding: 5px 18px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.background};
  gap: 10px;
`;

export const WrapperArrowButtons = styled.div`
  display: flex;
  width: 100%;
  button:last-child {
    margin-left: auto;
  }
`;
