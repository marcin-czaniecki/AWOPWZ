import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import { auth } from "data/fb";
import { useError } from "hooks/useError";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { PropsColumnForm } from "types/types";
import { updateArray, arrayPushOneElement } from "utils/firebaseUtils";
import { enumName, generateId } from "utils/utils";

type Inputs = {
  name: string;
};

const ColumnForm = ({ doc, column, lastOrder, length }: PropsColumnForm) => {
  const { setError } = useError();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    if (!auth.currentUser) {
      setError("Musisz się zalogować!");
      return;
    }

    if (column) {
      updateArray(doc, enumName.COLUMNS, [column], [{ ...column, name }]);
    } else {
      const data = {
        id: generateId(),
        name,
        order: `${length > 0 ? Number(lastOrder) + 1 : 0}`,
      };
      arrayPushOneElement(doc, enumName.COLUMNS, data);
    }
    reset();
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    const { name } = errors;
    if (name) {
      const { type } = name;
      if (type === "maxLength") {
        setError(`W treści zadania możesz użyć maksymalnie 30 znaków`);
      }
      if (type === "required") {
        setError("Musisz wpisać nazwe kolumny");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FiledInput name="name" label="Nazwa kolumny">
        <Input type="text" defaultValue={column?.name || ""} {...register("name", { required: true, maxLength: 30 })} />
      </FiledInput>
      <Button type="submit">{column ? "Aktualizuj kolumne" : "Dodaj kolumne"}</Button>
    </form>
  );
};

export default ColumnForm;
