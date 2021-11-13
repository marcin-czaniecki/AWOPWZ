import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 5px 5px 5px 15px;
  margin: 5px 0 10px;
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 30px;
`;

export default Input;
