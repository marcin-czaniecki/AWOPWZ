import styled from "styled-components";

export const WrapperDataFiled = styled.div<{ autoMarginLeft?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-left: ${({ autoMarginLeft }) => autoMarginLeft && "auto"};
`;
