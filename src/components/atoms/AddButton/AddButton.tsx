import styled from "styled-components";

const AddButton = styled.button<{ active?: boolean }>`
  position: fixed;
  right: 30px;
  bottom: 30px;
  height: 60px;
  width: 60px;
  border: solid 3px ${({ theme }) => theme.color.background};
  background: ${({ theme }) => theme.color.primary};
  border-radius: 100%;
  transform: rotate(${({ active }) => (active ? "135deg" : "0deg")});
  transition: 300ms;
  z-index: 10;
  ::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 5px;
    width: 80%;
    background: ${({ theme }) => theme.color.background};
    transform: translate(-50%, -50%) rotate(0deg);
    transition: 300ms;
  }
  ::before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 5px;
    width: 80%;
    background: ${({ theme }) => theme.color.background};
    transform: translate(-50%, -50%) rotate(-90deg);
    transition: 300ms;
  }
  &:hover {
    transform: rotate(${({ active }) => (active ? "135deg" : "0deg")}) scale(1.1);
  }
`;

export default AddButton;
