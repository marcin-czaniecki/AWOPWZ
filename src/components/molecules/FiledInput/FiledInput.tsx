import styled from "styled-components";
import Input from "components/atoms/Input/Input";
import { IFiledInputProps } from "types/componentTypes";

const WrapperFiledInput = styled.div`
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.s};
`;

const FiledInput = ({ name, label, type, register, options = { required: true }, ...props }: IFiledInputProps) => {
  return (
    <WrapperFiledInput>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <Input type={type} {...register(name, options)} {...props} />
    </WrapperFiledInput>
  );
};

export default FiledInput;
