import React from "react";
import styled from "styled-components";
import Input from "../../atoms/Input/Input";

const WrapperFiledInput = styled.div`
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.s};
`;

interface PropsFiledInput extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const FiledInput = ({ name, label, value, setValue, ...props }: PropsFiledInput) => {
  return (
    <WrapperFiledInput>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <Input
        name={name}
        value={value}
        onChange={({ currentTarget: { value } }) => {
          setValue(value);
        }}
        {...props}
      />
    </WrapperFiledInput>
  );
};

export default FiledInput;
