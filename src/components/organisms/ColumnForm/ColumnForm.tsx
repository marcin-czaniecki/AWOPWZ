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
  wip: number;
};

const ColumnForm = ({ doc, column, lastOrder, length }: PropsColumnForm) => {
  const { setError } = useError();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const wipToNumber = (wip: number | string) => {
    const isNumberWip = typeof wip === "number";
    let convertWip = isNumberWip ? wip : Number(wip);
    if (convertWip) {
      return convertWip;
    }
    return 0;
  };
  const addColumn = ({ name, wip }: Inputs) => {
    if ((!lastOrder && typeof lastOrder !== "number") || (!length && length !== 0)) {
      throw new Error("You must give the lastOrder and length attributes to the ColumnForm component");
    }

    const data = {
      id: generateId(),
      name,
      order: length > 0 ? lastOrder + 1 : 0,
      wip: wipToNumber(wip),
    };
    arrayPushOneElement(doc, enumName.COLUMNS, data);
  };
  const onSubmit: SubmitHandler<Inputs> = async ({ name, wip }) => {
    if (!auth.currentUser) {
      setError("Musisz się zalogować!");
      return;
    }
    if (column) {
      const data = {
        ...column,
      };
      const unequalName = column.name !== name;
      if (unequalName) {
        data.name = name;
      }
      const unequalWip = column.wip !== wipToNumber(wip);
      if (unequalWip) {
        data.wip = wipToNumber(wip);
      }
      if (unequalName || unequalWip) {
        updateArray(doc, enumName.COLUMNS, [column], [{ ...column, ...data }]);
      }
    } else {
      addColumn({ name, wip });
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
      <FiledInput name="wip" label="Ustaw wip">
        <Input type="number" defaultValue={column?.wip || 0} {...register("wip")} />
      </FiledInput>
      <Button type="submit">{column ? "Aktualizuj kolumne" : "Dodaj kolumne"}</Button>
    </form>
  );
};

export default ColumnForm;
