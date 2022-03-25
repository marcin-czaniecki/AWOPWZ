import StoreService from "fb/StoreService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useProject } from "hooks/useProject";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { IColumnFormProps } from "types/componentTypes";
import { ArrayName, generateId, wipToNumber } from "utils/utils";
import Form from "../Form/Form";

type Inputs = {
  name: string;
  wip: number;
};

const ProjectBoardColumnForm = ({
  column,
  lastOrder,
  length,
}: IColumnFormProps) => {
  const { doc } = useProject();
  const { setToast } = useToast();
  const { dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();
  const addColumn = ({ name, wip }: Inputs) => {
    if (
      (!lastOrder && typeof lastOrder !== "number") ||
      (!length && length !== 0)
    ) {
      throw new Error(
        "You must give the lastOrder and length attributes to the ColumnForm component"
      );
    }

    const data = {
      id: generateId(),
      name,
      order: length > 0 ? lastOrder + 1 : 0,
      wip: wipToNumber(wip),
    };
    StoreService.arrayPush(ArrayName.columns, data, doc);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ name, wip }) => {
    if (
      !(
        dataUser?.isAdmin ||
        currentUserPermissions?.isLeader ||
        currentUserPermissions?.canServiceColumns
      )
    ) {
      setToast("Nie posiadasz odpowiednich uprawnień.", "info");
      return null;
    }
    if (column) {
      const data = {
        ...column,
      };

      const isSameName = column.name === name;
      if (!isSameName) {
        data.name = name;
      }

      const isSameWip = column.wip === wipToNumber(wip);
      if (!isSameWip) {
        data.wip = wipToNumber(wip);
      }

      if (!isSameName || !isSameWip) {
        StoreService.updateArray(
          ArrayName.columns,
          [column],
          [{ ...column, ...data }],
          doc
        );
      }
    } else {
      addColumn({ name, wip });
    }
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
    <Form
      contentButton={column ? "Aktualizuj kolumne" : "Dodaj kolumne"}
      fields={[
        {
          name: "name",
          type: "text",
          label: "Nazwa kolumny",
          defaultValue: column?.name || "",
          options: { required: true, maxLength: 30 },
        },
        {
          name: "wip",
          type: "number",
          label: "Ustaw wip",
          defaultValue: column?.wip || 0,
        },
      ]}
      onSubmit={onSubmit}
      onError={onError}
    />
  );
};

export default ProjectBoardColumnForm;
