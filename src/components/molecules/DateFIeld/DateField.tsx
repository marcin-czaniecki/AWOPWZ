import { printDate, addLeadingZero } from "@janossik/date";
import { IDateFieldProps } from "types/componentTypes";
import { WrapperDataFiled } from "./DateField.styles";

const DateField = ({
  previousText = "Wysłano:",
  dateAt,
  autoMarginLeft,
  showCalendar,
}: IDateFieldProps) => {
  const date = dateAt.toDate();
  const ddmmmyy = printDate("ddmmmyy", "pl", date);
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  return (
    <WrapperDataFiled autoMarginLeft={autoMarginLeft}>
      {showCalendar && `${previousText} ${ddmmmyy},`} {hours}:{minutes}
    </WrapperDataFiled>
  );
};

export default DateField;
