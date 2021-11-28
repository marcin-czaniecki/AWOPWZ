import Form from "components/molecules/Form/Form";
import fb from "data/fb";
import StoreService from "data/StoreService";
import { updateDoc } from "firebase/firestore";
import { useProject } from "hooks/useProject";
import { useToast } from "hooks/useToast";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { ITask } from "types/types";
import { createTask, ArrayName } from "utils/utils";

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
        StoreService.updateArray(ArrayName.TASKS, [task], [{ ...task, title, color, backgroundColor }], doc);
      } else {
        await updateDoc(doc, {
          [ArrayName.TASKS]: fb.arrayUnion(createTask(title, color, backgroundColor)),
        });
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
