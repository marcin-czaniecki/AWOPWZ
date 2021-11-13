import styled, { css } from "styled-components";

const Wrapper = styled.button<{ active?: boolean; backgroundColor?: string; color?: string }>`
  position: fixed;
  top: 5px;
  right: 10px;
  display: flex;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  border: none;
  z-index: 11;
  background-color: transparent;
  cursor: pointer;
  ::after {
    content: " ";
    position: fixed;
    top: -10px;
    right: -10px;
    height: 300px;
    width: 100px;
    background: ${({ theme, backgroundColor }) => (backgroundColor ? backgroundColor : theme.color.background)};
    transform: rotate(-70deg) translateX(130px) translateY(-60px);
    transition: 300ms;
    z-index: -1;
  }
  @media screen and (min-width: ${({ theme }) => theme.screen.tablet}) {
    ::after {
      background: ${({ theme, backgroundColor }) => (backgroundColor ? backgroundColor : theme.color.primary)};
    }
  }
`;

const Body = styled.span<{ active: boolean; backgroundColor?: string; color?: string }>`
  position: relative;
  display: block;
  height: 5px;
  min-width: 40px;
  background: ${({ theme, color }) => (color ? color : theme.color.primary)};
  ::after {
    content: " ";
    position: absolute;
    top: 10px;
    left: 0;
    height: 5px;
    width: 100%;
    background: ${({ theme, color }) => (color ? color : theme.color.primary)};
    transition: 300ms;
  }
  ::before {
    content: " ";
    position: absolute;
    top: -10px;
    left: 0;
    height: 5px;
    width: 100%;
    background: ${({ theme, color }) => (color ? color : theme.color.primary)};
    transition: 300ms;
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet}) {
    ::after {
      background: ${({ theme, color }) => (color ? color : theme.color.background)};
    }
    ::before {
      background: ${({ theme, color }) => (color ? color : theme.color.background)};
    }
  }

  ${({ active, color }) =>
    active
      ? css`
          position: fixed;
          background: transparent;
          ::after {
            top: 50%;
            transform: rotate(45deg);
          }
          ::before {
            top: 50%;
            transform: rotate(-45deg);
          }
        `
      : css`
          @media screen and (min-width: ${({ theme }) => theme.screen.tablet}) {
            background: ${({ theme }) => (color ? color : theme.color.background)};
          }
        `}
`;

const Hamburger = (props: any) => {
  return (
    <Wrapper {...props}>
      <Body {...props} active={props?.active} />
    </Wrapper>
  );
};

export default Hamburger;
