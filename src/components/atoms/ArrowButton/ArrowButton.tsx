import styled from "styled-components";

const ArrowButton = styled.div<{ right?: boolean; size?: string }>`
  position: relative;
  height: ${({ size }) => (size ? size : "25px")};
  width: ${({ size }) => (size ? size : "25px")};
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  z-index: 8;
  transform: rotate(${({ right }) => (right ? "180deg" : "0deg")});
  ::after {
    content: " ";
    position: absolute;
    width: 30%;
    height: 3px;
    background-color: snow;
    left: 32%;
    top: calc(50% - 1.5px);
    transform: translateY(70%) rotate(45deg);
  }
  ::before {
    content: " ";
    position: absolute;
    width: 30%;
    height: 3px;
    background-color: snow;
    left: 32%;
    top: calc(50% - 1.5px);
    transform: translateY(-70%) rotate(-45deg);
  }
  :hover {
    transform: rotate(${({ right }) => (right ? "180deg" : "0deg")}) scale(1.1);
  }
`;

export default ArrowButton;
