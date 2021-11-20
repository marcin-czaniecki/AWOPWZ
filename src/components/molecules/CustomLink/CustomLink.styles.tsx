import { Link, PathMatch } from "react-router-dom";
import styled, { css } from "styled-components";

export const StyledLink = styled(Link)<{ active?: PathMatch<string> | null }>`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.font.size.l};
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.color.secondary};
    `}
`;
