import styled from "styled-components";

const Button = styled.button`
  min-height: 30px;
  padding: 4px 15px;
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  min-width: 60px;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.background};
  border: solid 1px ${({ theme }) => theme.color.secondary};
  border-radius: 0px;
  :hover {
    color: ${({ theme }) => theme.color.secondary};
    background-color: snow;
  }
`;

export default Button;
