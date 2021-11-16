import styled from "styled-components";
import { cubRotate, Incoming } from "utils/animations";

export const Cube = styled.div<{ size?: string }>`
  position: relative;
  width: ${({ size }) => (size ? size : "300px")};
  height: ${({ size }) => (size ? size : "300px")};
  transform-style: preserve-3d;
  transform: rotateX(-30deg);
  animation: ${cubRotate} 4s linear infinite;
`;

export const Walls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

export const Ceiling = styled.div<{ size?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ size }) => (size ? size : "300px")};
  height: ${({ size }) => (size ? size : "300px")};
  background: ${({ theme }) => theme.color.secondary};
  transform: rotateX(90deg) translateZ(calc(${({ size }) => (size ? size : "300px")} / 2));
  &::before {
    content: " ";
  }
`;

export const Floor = styled.div<{ size?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ size }) => (size ? size : "300px")};
  height: ${({ size }) => (size ? size : "300px")};
  background: ${({ theme }) => theme.color.primary};
  transform: scaleZ(1.3) scaleX(1.3) rotateX(90deg) translateZ(calc(${({ size }) => (size ? size : "300px")} / -1.2));
  filter: blur(40px);
`;

export const Wall = styled.span<{ i: string; size?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(${({ theme }) => theme.color.secondary}, ${({ theme }) => theme.color.primary});
  transform: rotateY(calc(90deg * ${({ i }) => i})) translateZ(calc(${({ size }) => (size ? size : "300px")} / 2));
  ::after {
    content: "Loading";
    position: absolute;
    top: 50%;
    left: 50%;
    color: ${({ theme }) => theme.color.background};
    transform: translate(-50%, -50%);
  }
`;

export const WrapperLoading = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  animation: ${Incoming} 1s;
`;
