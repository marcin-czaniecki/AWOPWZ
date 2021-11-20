import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb, { auth } from "data/fb";
import { DocumentReference, Timestamp, updateDoc } from "firebase/firestore";
import { useToast } from "hooks/useToast";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { IProject, ITask } from "types/types";
import { updateArray } from "utils/firebaseUtils";
import { enumName, generateId } from "utils/utils";

type Inputs = {
  title: string;
  color: string;
  backgroundColor: string;
};

const TaskForm = ({ doc, task }: { doc: DocumentReference<IProject>; task?: ITask }) => {
  const { setToast } = useToast();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ title, color, backgroundColor }) => {
    try {
      if (!auth.currentUser) {
        return;
      }

      if (task) {
        updateArray(doc, enumName.TASKS, [task], [{ ...task, title, color, backgroundColor }]);
      } else {
        const data = {
          id: generateId(),
          title,
          author: auth.currentUser.email || auth.currentUser.uid,
          color,
          backgroundColor,
          columnOrder: 0,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };
        await updateDoc(doc, {
          tasks: fb.arrayUnion(data),
        });
      }

      reset();
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
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FiledInput
        name="title"
        type="text"
        defaultValue={task?.title || ""}
        label="Treść zadania"
        register={register}
        options={{ required: true, maxLength: 100 }}
      />
      <FiledInput name="color" type="color" defaultValue={task?.color || "#ffffff"} label="Wbierz kolor tekstu" register={register} />
      <FiledInput
        name="backgroundColor"
        type="color"
        defaultValue={task?.backgroundColor || "#23b2ee"}
        label="Wybierz kolor tła"
        register={register}
      />
      <Button type="submit">{task ? "Aktualizuj zadanie" : "Dodaj zadanie"}</Button>
    </form>
  );
};

export default TaskForm;
