import Form from "components/organisms/Form/Form";
import StoreService from "data/StoreService";
import { useProject } from "hooks/useProject";
import { useToast } from "hooks/useToast";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ITask } from "types/types";
import { ArrayName, createTask } from "utils/utils";

type Inputs = {
  title: string;
  color: string;
  backgroundColor: string;
};

const TaskForm = ({ task }: { task?: ITask }) => {
  const { doc } = useProject();
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async ({ title, color, backgroundColor }) => {
    try {
      if (task) {
        StoreService.updateArray(ArrayName.tasks, [task], [{ ...task, title, color, backgroundColor }], doc);
      } else {
        StoreService.arrayPush(ArrayName.tasks,createTask(title, color, backgroundColor),doc)
      }
    } catch (error) {
      setToast("Nie udało się dodać zadania", "warning");
    }
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    if (errors?.title?.type === "maxLength") {
      setToast(`W treści zadania możesz użyć maksymalnie 100 znaków`, "warning");
    }
  };

  return (
    <Form
      fields={[
        {
          name: "title",
          type: "text",
          label: "Treść zadania",
          defaultValue: task?.title || "",
          options: { required: true, maxLength: 100 },
        },
        { name: "color", type: "color", label: "Wybierz kolor tekstu", defaultValue: task?.color || "#ffffff" },
        {
          name: "backgroundColor",
          type: "color",
          label: "Wybierz kolor tła",
          defaultValue: task?.backgroundColor || "#23b2ee",
          options: { required: true, maxLength: 100 },
        },
      ]}
      onSubmit={onSubmit}
      onError={onError}
    />
  );
};

export default TaskForm;
