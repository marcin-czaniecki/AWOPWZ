import styled from "styled-components";

const SideBar = styled.div<{ active?: boolean; right?: boolean; zIndex?: string }>`
  position: fixed;
  top: 0;
  right: ${({ right }) => right && 0};
  left: ${({ right }) => !right && 0};
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  padding: 0 10px;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.color.background};
  border-left: ${({ theme, right }) => right && `solid 5px ${theme.color.primary}`};
  border-right: ${({ theme, right }) => !right && `solid 5px ${theme.color.primary}`};
  transform: translateX(${({ active, right }) => (active ? "0%" : right ? "100%" : "-100%")});
  transition: 300ms;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : "9")};
  @media screen and (max-width: ${({ theme }) => theme.screen.tablet}) {
    width: 100%;
  }
`;

export default SideBar;
