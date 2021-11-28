import styled from "styled-components";
import Input from "components/atoms/Input/Input";
import { IFieldInputProps } from "types/componentTypes";

const WrapperFiledInput = styled.div`
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.s};
`;

const FieldInput = ({ name, label, type, register, options = { required: true }, ...props }: IFieldInputProps) => {
  return (
    <WrapperFiledInput>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <Input type={type} {...register(name, options)} {...props} />
    </WrapperFiledInput>
  );
};

export default FieldInput;
