import styled from "styled-components";

const WrapperSideBar = styled.div<{ active?: boolean; right?: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ right }) => right && 0};
  left: ${({ right }) => !right && 0};
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.color.background};
  border-left: ${({ theme, right }) => right && `solid 5px ${theme.color.primary}`};
  border-right: ${({ theme, right }) => !right && `solid 5px ${theme.color.primary}`};
  transform: translateX(${({ active, right }) => (active ? "0%" : right ? "100%" : "-100%")});
  transition: 300ms;
  z-index: 9;
`;
export default WrapperSideBar;
