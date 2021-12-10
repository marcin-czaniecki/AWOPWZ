import Button from "components/atoms/Button/Button";
import { useToast } from "hooks/useToast";
import { FieldValues, useForm } from "react-hook-form";
import { IForm } from "types/componentTypes";
import { errorHandler } from "utils/utils";
import FieldInput from "components/molecules/FieldInput/FieldInput";
import Select from "components/molecules/Select/Select";
import { WrapperForm } from "./Form.styles";

const Form = <T extends FieldValues>({
  contentButton = "Wykonaj",
  clear = true,
  onSubmit = () => {},
  onError,
  fields = [],
}: IForm<T>) => {
  const { register, handleSubmit, reset } = useForm<T>();
  const { setToast } = useToast();

  return (
    <WrapperForm
      onSubmit={handleSubmit<T>((data) => {
        onSubmit(data);
        if (clear === true) reset();
      }, onError || errorHandler(fields, setToast))}
    >
      {fields.map((field) => {
        if (field.type === "select") {
          return <Select key={field.name + Form.name} field={field} register={register} />;
        }
        return <FieldInput key={field.name + Form.name} {...field} register={register} />;
      })}
      <Button type="submit">{contentButton}</Button>
    </WrapperForm>
  );
};

export default Form;
