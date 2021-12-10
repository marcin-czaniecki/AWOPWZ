import styled from "styled-components";
export const WrapperHoverIcon = styled.span<{ colorBackground?: string }>`
  position: relative;
  display: flex;
  height: 25px;
  width: 25px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.background};
  background-color: ${({ theme }) => theme.color.secondary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    div {
      display: block;
    }
  }
`;
export const WrapperHoverIconChildren = styled.div`
  position: absolute;
  display: none;
  top: 20px;
  right: 15px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.color.secondary};
  z-index: 10;
  border: 1px solid ${({ theme }) => theme.color.background};
`;
