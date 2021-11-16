import { keyframes } from "styled-components";

export const Incoming = keyframes`
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
`;

export const cubRotate = keyframes`
    0%{
    transform:rotateX(-30deg) rotateY(0deg);
    }
    100%{
    transform:rotateX(-30deg) rotateY(360deg);
    }
`;
