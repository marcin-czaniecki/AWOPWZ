import styled from "styled-components";

const Button = styled.button`
  padding: 4px 15px;
  color: ${({ theme }) => theme.color.primary};
  border: solid 2px ${({ theme }) => theme.color.primary};
  border-radius: 15px;
  :hover {
    background-color: ${({ theme }) => theme.color.primary};
    color: snow;
  }
`;

export default Button;
