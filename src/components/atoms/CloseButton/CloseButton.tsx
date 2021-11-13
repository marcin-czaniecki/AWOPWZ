import styled from "styled-components";

const CloseButton = styled.button`
  position: relative;
  height: 30px;
  width: 30px;
  border: solid 5px ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.primary};
  border-radius: 100%;
  ::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 3px;
    width: 110%;
    background: ${({ theme }) => theme.color.background};
    transform: translate(-50%, -50%) rotate(45deg);
    transition: 300ms;
  }
  ::before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 3px;
    width: 110%;
    background: ${({ theme }) => theme.color.background};
    transform: translate(-50%, -50%) rotate(-45deg);
    transition: 300ms;
  }
  &:hover {
    transform: scale(1.1) rotate(90deg);
    transition: 300ms;
  }
`;

export default CloseButton;
