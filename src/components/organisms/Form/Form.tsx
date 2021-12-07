import Button from "components/atoms/Button/Button";
import { useToast } from "hooks/useToast";
import { FieldValues, Path, useForm } from "react-hook-form";
import { IForm } from "types/componentTypes";
import { errorHandler } from "utils/utils";
import FieldInput from "components/molecules/FieldInput/FieldInput";
import Input from "components/atoms/Input/Input";

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
    <form
      onSubmit={handleSubmit<T>((data) => {
        onSubmit(data);
        if (clear === true) reset();
      }, onError || errorHandler(fields, setToast))}
    >
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <Input
              as={"select"}
              key={field.name + Form.name}
              {...field}
              {...register(field.name as Path<T>)}
            >
              {field?.selectOptions?.map(({ value, content }) => {
                if (!value) {
                  return null;
                }
                return (
                  <option key={value + content} value={value}>
                    {content || value}
                  </option>
                );
              })}
            </Input>
          );
        }
        return <FieldInput key={field.name + Form.name} {...field} register={register} />;
      })}
      <Button>{contentButton}</Button>
    </form>
  );
};

export default Form;
