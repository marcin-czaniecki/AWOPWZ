import Button from "components/atoms/Button/Button";
import FieldInput from "components/molecules/FieldInput/FieldInput";
import { auth } from "data/fb";
import StoreService from "data/StoreService";
import { useProject } from "hooks/useProject";
import { useToast } from "hooks/useToast";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { IColumnFormProps } from "types/componentTypes";
import { enumName, ArrayName, generateId, wipToNumber } from "utils/utils";

type Inputs = {
  name: string;
  wip: number;
};

const ColumnForm = ({ column, lastOrder, length }: IColumnFormProps) => {
  const { doc } = useProject();
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
    StoreService.arrayPush(ArrayName.COLUMNS, data, doc);
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
        StoreService.updateArray(enumName.COLUMNS, [column], [{ ...column, ...data }], doc);
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
      <FieldInput
        name="name"
        type="text"
        label="Nazwa kolumny"
        defaultValue={column?.name || ""}
        register={register}
        options={{ required: true, maxLength: 30 }}
      />
      <FieldInput name="wip" type="number" label="Ustaw wip" defaultValue={column?.wip || 0} register={register} />
      <Button type="submit">{column ? "Aktualizuj kolumne" : "Dodaj kolumne"}</Button>
    </form>
  );
};

export default ColumnForm;
