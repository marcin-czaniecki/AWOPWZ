import styled, { keyframes } from "styled-components";
import { TypeToast } from "types/types";

const animationTouts = keyframes`
    0%{
        transform:translateX(-50%) translateY(600px);
    }
    10%{
        transform:translateX(-50%) translateY(0px);
    }
    90%{
        transform:translateX(-50%) translateY(0px);
    }
    100%{
        transform:translateX(-50%) translateY(600px);
    }
`;

export const WrapperToast = styled.div<{ type?: TypeToast }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  display: flex;
  max-width: 300px;
  flex-direction: column;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  background-color: snow;
  color: ${({ theme, type }) => (type ? theme.color[type] : theme.color["default"])};
  box-shadow: 0 10px 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%) translateY(600px);
  animation: ${animationTouts} 4s linear;
  z-index: 15;
`;
