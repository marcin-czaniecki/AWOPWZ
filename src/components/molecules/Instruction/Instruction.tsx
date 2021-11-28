import { IInstructionProps } from "types/componentTypes";
import { WrapperInstruction, WrapperStepsInstruction, StepsInstruction } from "./Instruction.styles";

const Instruction = ({ introduction, title, steps }: IInstructionProps) => {
  return (
    <WrapperInstruction>
      <p>{introduction}</p>
      <WrapperStepsInstruction>
        <h3>{title}</h3>
        <StepsInstruction>
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </StepsInstruction>
      </WrapperStepsInstruction>
    </WrapperInstruction>
  );
};
export default Instruction;
