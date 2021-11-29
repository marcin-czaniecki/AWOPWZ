import Button from "components/atoms/Button/Button";
import { ISwitchButtonsProps } from "types/componentTypes";
import { WrapperSwitchButtons } from "./SwitchButtons.styles";

const SwitchButtons = ({
  isVisibleLeftButton = true,
  isVisibleRightButton = true,
  actionLeftButton,
  actionRightButton,
}: ISwitchButtonsProps) => {
  return (
    <WrapperSwitchButtons>
      {isVisibleLeftButton && (
        <Button typeButton="arrow" onClick={actionLeftButton} />
      )}
      {isVisibleRightButton && (
        <Button typeButton="arrow" onClick={actionRightButton} arrowRight />
      )}
    </WrapperSwitchButtons>
  );
};
export default SwitchButtons;
