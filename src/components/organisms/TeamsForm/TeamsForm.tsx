import TeamService from "fb/TeamService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "utils/utils";
import Form from "../Form/Form";

type Inputs = {
  name: string;
};

const TeamsForm = ({ id }: { id?: string }) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    if (!dataUser?.isAdmin) {
      setToast(ErrorMessage.mustBeAdmin);
    }
    if (!dataUser?.uid) {
      setToast(ErrorMessage.noValue);
      return;
    }
    try {
      if (id) {
        await TeamService.updateTeam({ name }, id);
      } else {
        await TeamService.createTeam(name, dataUser.uid);
      }
    } catch (error) {
      setToast(ErrorMessage.default);
    }
  };

  return (
    <>
      <Form
        fields={[{ name: "name", type: "text", label: "Nazwa zespołu" }]}
        onSubmit={onSubmit}
        contentButton={id ? "Zmień nazwę zespołu" : "Dodaj zespół"}
      />
    </>
  );
};

export default TeamsForm;
