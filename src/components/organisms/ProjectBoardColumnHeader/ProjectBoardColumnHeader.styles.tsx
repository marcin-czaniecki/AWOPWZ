import styled from "styled-components";

export const WrapperProjectColumnHeader = styled.div`
  display: flex;
  position: relative;
  padding: 5px 18px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.background};
  gap: 10px;
`;
