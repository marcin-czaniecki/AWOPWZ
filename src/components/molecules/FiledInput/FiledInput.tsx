import React from "react";
import styled from "styled-components";

const WrapperFiledInput = styled.div`
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.s};
`;

interface PropsFiledInput extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label: string;
  children: JSX.Element;
}

const FiledInput = ({ label, name, children }: PropsFiledInput) => {
  return (
    <WrapperFiledInput>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {children}
    </WrapperFiledInput>
  );
};

export default FiledInput;
