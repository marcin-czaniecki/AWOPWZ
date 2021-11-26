import styled from "styled-components";

export const WrapperColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  @media screen and (min-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1220px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1520px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
