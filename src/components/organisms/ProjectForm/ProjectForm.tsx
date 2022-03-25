import Form from "components/organisms/Form/Form";
import { ProjectService } from "fb/ProjectService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { SubmitHandler } from "react-hook-form";
import { collectionReferenceTeams } from "utils/references";

type Inputs = {
  name: string;
  teamId: string;
};

const ProjectForm = ({
  id,
  currentTeamId,
  name,
}: {
  id?: string;
  currentTeamId?: string;
  name?: string;
}) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const [teamsQuerySnapshot] = useCollection(collectionReferenceTeams);

  const onSubmit: SubmitHandler<Inputs> = async ({ name, teamId }) => {
    if (!teamId) {
      setToast("Musisz wybrać jakiś zespół.", "warning");
    }
    const currentUserPermissions = dataUser?.permissions.find(
      (team) => team.id === teamId
    );
    const isPermission =
      currentUserPermissions?.isLeader ||
      dataUser?.isAdmin ||
      currentUserPermissions?.canServiceProjects;
    try {
      if (isPermission) {
        if (id) {
          ProjectService.updateProject(name, id, teamId || currentTeamId);
        } else {
          await ProjectService.initNewProject(name, teamId);
        }
      } else {
        setToast("Nie masz wystarczających uprawnień.");
      }
    } catch (error) {
      setToast("Coś poszło nie tak :c");
    }
  };

  return (
    <>
      <Form
        contentButton="Dodaj projekt"
        fields={[
          {
            name: "name",
            type: "text",
            label: "Nazwa projektu",
            defaultValue: name,
          },
          {
            name: "teamId",
            type: "select",
            label: "Wybierz zespół",
            selectOptions: teamsQuerySnapshot?.docs.map(
              (documentSnapshotTeam) => {
                const permissions = dataUser?.permissions.find(
                  (team) => team.id === documentSnapshotTeam.id
                );
                const isPermission =
                  permissions?.isLeader || permissions?.canServiceProjects;
                if (!isPermission && !dataUser?.isAdmin) {
                  return {
                    value: null,
                    content: null,
                  };
                }
                return {
                  value: documentSnapshotTeam.id,
                  content: documentSnapshotTeam.data().name,
                };
              }
            ),
          },
        ]}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ProjectForm;
