import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import { auth } from "data/fb";
import { useToast } from "hooks/useToast";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { IColumnFormProps } from "types/componentTypes";
import { updateArray, arrayPush } from "utils/firebaseUtils";
import { enumName, EnumNameOfProjectArrays, generateId, wipToNumber } from "utils/utils";

type Inputs = {
  name: string;
  wip: number;
};

const ColumnForm = ({ doc, column, lastOrder, length }: IColumnFormProps) => {
  const { setToast } = useToast();
  const { register, handleSubmit, reset } = useForm<Inputs>();

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
    arrayPush(doc, EnumNameOfProjectArrays.COLUMNS, data);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ name, wip }) => {
    if (!auth.currentUser) {
      setToast("Musisz się zalogować!");
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
        setToast(`W treści zadania możesz użyć maksymalnie 30 znaków`);
      }
      if (type === "required") {
        setToast("Musisz wpisać nazwe kolumny");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FiledInput
        name="name"
        type="text"
        label="Nazwa kolumny"
        defaultValue={column?.name || ""}
        register={register}
        options={{ required: true, maxLength: 30 }}
      />
      <FiledInput name="wip" type="number" label="Ustaw wip" defaultValue={column?.wip || 0} register={register} />
      <Button type="submit">{column ? "Aktualizuj kolumne" : "Dodaj kolumne"}</Button>
    </form>
  );
};

export default ColumnForm;
