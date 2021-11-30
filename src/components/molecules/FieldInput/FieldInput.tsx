import Input from "components/atoms/Input/Input";
import { IFieldInputProps } from "types/componentTypes";
import { WrapperFiledInput, StyledLabel } from "./FieldInput.styles";


const FieldInput = ({ name, label, type, register, options , ...props }: IFieldInputProps) => {
  return (
    <WrapperFiledInput>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <Input type={type} {...register(name, options || { required: true })} {...props} />
    </WrapperFiledInput>
  );
};

export default FieldInput;
