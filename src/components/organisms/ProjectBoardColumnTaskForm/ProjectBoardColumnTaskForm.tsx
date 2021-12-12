import { DocumentReference, getDoc, Timestamp } from "@firebase/firestore";
import { printDate } from "@janossik/date";
import Form from "components/organisms/Form/Form";
import StoreService from "firebase/StoreService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useProject } from "hooks/useProject";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ITask, ITeam, IUser } from "types/types";
import { ArrayName, CollectionsName, createTask } from "utils/utils";

type Inputs = {
  title: string;
  color: string;
  backgroundColor: string;
  responsibleName: string;
  timeLimit: string;
};

const TaskForm = ({ task }: { task?: ITask }) => {
  const { doc, project } = useProject();
  const { dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();
  const [members, setMembers] = useState<IUser[]>([]);
  const docTeam = StoreService.doc(
    CollectionsName.teams,
    project.teamId || "unknown"
  ) as DocumentReference<ITeam>;
  const [team] = useDocumentData<ITeam>(docTeam);
  const { setToast } = useToast();

  useEffect(() => {
    (async () => {
      const arrUser: IUser[] = [];
      const members = team?.members || [];

      for await (const member of members) {
        const response = await getDoc(member);
        const user = response.data() as IUser;
        if (user) {
          arrUser.push(user);
        }
      }
      setMembers(arrUser);
    })();
  }, [team?.members]);

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    color,
    backgroundColor,
    responsibleName,
    timeLimit,
  }) => {
    if (
      !(
        dataUser?.isAdmin ||
        currentUserPermissions?.isLeader ||
        currentUserPermissions?.canServiceTasks
      )
    ) {
      setToast("Nie posiadasz odpowiednich uprawnień.", "info");
      return null;
    }
    try {
      if (task) {
        StoreService.updateArray(
          ArrayName.tasks,
          [task],
          [
            {
              ...task,
              title,
              color,
              backgroundColor,
              timeLimit: Timestamp.fromDate(new Date(timeLimit)),
              responsibleName,
            },
          ],
          doc
        );
      } else {
        StoreService.arrayPush(
          ArrayName.tasks,
          createTask(title, color, backgroundColor, new Date(timeLimit), responsibleName),
          doc
        );
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
    <>
      <Form
        contentButton={task ? "Aktualizuj zadanie" : "Dodaj zdanie"}
        fields={[
          {
            name: "title",
            type: "text",
            label: "Treść zadania",
            defaultValue: task?.title || "",
            options: { required: true, maxLength: 200 },
          },
          {
            name: "color",
            type: "color",
            label: "Wybierz kolor tekstu",
            defaultValue: task?.color || "#ffffff",
          },
          {
            name: "backgroundColor",
            type: "color",
            label: "Wybierz kolor tła",
            defaultValue: task?.backgroundColor || "#23b2ee",
            options: { required: true },
          },
          {
            name: "responsibleName",
            type: "select",
            label: "Wybierz kolor tła",
            selectOptions: members.map((user) => {
              return { value: user.firstName + " " + user.lastName };
            }),
            defaultValue: task?.responsibleName,
            options: { required: true },
          },
          {
            name: "timeLimit",
            type: "date",
            label: "Czas wykonania zadania",
            defaultValue: printDate("yyyyddmm", "en", task?.timeLimit?.toDate() || new Date())
              .split(".")
              .reverse()
              .join("-"),
          },
        ]}
        onSubmit={onSubmit}
        onError={onError}
      />
    </>
  );
};

export default TaskForm;
