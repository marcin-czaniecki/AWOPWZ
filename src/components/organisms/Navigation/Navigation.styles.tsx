import styled from "styled-components";

export const WrapperNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
  margin-top: 10%;
`;

export const LogOutButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: calc(50% - 100px);
  width: 200px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    transition: 300ms;
  }
`;
