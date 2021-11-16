import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb, { auth } from "data/fb";
import { DocumentReference, Timestamp, updateDoc } from "firebase/firestore";
import { useError } from "hooks/useError";
import { useForm, SubmitHandler } from "react-hook-form";
import { IProject, ITask } from "types/types";
import { updateArray } from "utils/firebaseUtils";
import { enumName, generateId } from "utils/utils";

type Inputs = {
  title: string;
  color: string;
  backgroundColor: string;
};

const TaskForm = ({ doc, task }: { doc: DocumentReference<IProject>; task?: ITask }) => {
  const { setError } = useError();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ title, color, backgroundColor }) => {
    (async () => {
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
        setError("Nie udało się dodać zadania");
      }
    })();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        if (errors?.title?.type === "maxLength") {
          setError(`W treści zadania możesz użyć maksymalnie 100 znaków`);
        }
      })}
    >
      <FiledInput name="title" label="Treść zadania">
        <Input
          type="text"
          defaultValue={task?.title || ""}
          {...register("title", { required: true, maxLength: 100 })}
        />
      </FiledInput>
      <FiledInput name="color" label="Wbierz kolor tekstu">
        <Input type="color" defaultValue={task?.color || "#ffffff"} {...register("color", { required: true })} />
      </FiledInput>
      <FiledInput name="backgroundColor" label="Wybierz kolor tła">
        <Input
          type="color"
          defaultValue={task?.backgroundColor || "#23b2ee"}
          {...register("backgroundColor", { required: true })}
        />
      </FiledInput>
      <Button type="submit">{task ? "Aktualizuj zadanie" : "Dodaj zadanie"}</Button>
    </form>
  );
};

export default TaskForm;
