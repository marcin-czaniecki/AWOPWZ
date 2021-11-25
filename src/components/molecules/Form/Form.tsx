import Button from "components/atoms/Button/Button";
import { useToast } from "hooks/useToast";
import { FieldValues, useForm } from "react-hook-form";
import { IForm } from "types/componentTypes";
import { errorHandler } from "utils/utils";
import FieldInput from "../FieldInput/FieldInput";

const Form = <T extends FieldValues>({ contentButton = "Wykonaj", clear = true, onSubmit = () => {}, onError, fields = [] }: IForm<T>) => {
  const { register, handleSubmit, reset } = useForm<T>();
  const { setToast } = useToast();
  return (
    <form
      onSubmit={handleSubmit<T>((data) => {
        onSubmit(data);
        if (clear === true) {
          reset();
        }
      }, onError || errorHandler(fields, setToast))}
    >
      {fields.map((field) => (
        <FieldInput key={field.name + Form.name} {...field} register={register} />
      ))}
      <Button>{contentButton}</Button>
    </form>
  );
};

export default Form;
