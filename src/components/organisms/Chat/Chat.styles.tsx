import styled from "styled-components";

export const WrapperChat = styled.div`
  position: relative;
  padding: 10px 10px 5px;
  background-color: ${({ theme }) => theme.color.background};
  -webkit-box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
  box-shadow: -1px 1px 7px 1px rgba(0, 0, 0, 0.3);
`;
