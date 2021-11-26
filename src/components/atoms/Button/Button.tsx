import styled from "styled-components";

const Button = styled.button`
  min-height: 30px;
  min-width: 80px;
  padding: 4px 15px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
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
