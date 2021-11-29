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
