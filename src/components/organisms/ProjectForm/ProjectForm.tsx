import Form from "components/organisms/Form/Form";
import { ProjectService } from "data/ProjectService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { SubmitHandler } from "react-hook-form";
import { collectionReferenceTeams } from "utils/references";

type Inputs = {
  name: string;
  teamId: string;
};

const ProjectForm = ({ id, name }: { id?: string; name?: string }) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const [teamsQuerySnapshot] = useCollection(collectionReferenceTeams);

  const onSubmit: SubmitHandler<Inputs> = async ({ name, teamId }) => {
    const currentUserPermissions = dataUser?.teams.find((team) => team.id === teamId);
    try {
      const isPermission = !(
        currentUserPermissions?.isLeader ||
        dataUser?.isAdmin ||
        currentUserPermissions?.canServiceProjects
      );
      console.log(isPermission);

      if (isPermission) {
        setToast("Nie masz wystarczających uprawnień.");
        return;
      }

      if (id) {
        ProjectService.updateProjectName(name, id, teamId);
      } else {
        ProjectService.initNewProject(name, teamId);
      }
    } catch (error) {
      setToast("Coś poszło nie tak :c");
    }
  };

  return (
    <>
      <Form
        fields={[
          { name: "name", type: "text", label: "Nazwa projektu", defaultValue: name },
          {
            name: "teamId",
            type: "select",
            label: "Nazwa projektu",
            selectOptions: teamsQuerySnapshot?.docs.map((documentSnapshotTeam) => {
              const permissions = dataUser?.teams.find(
                (team) => team.id === documentSnapshotTeam.id
              );
              const isPermission = permissions?.isLeader || permissions?.canServiceProjects;
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
            }),
          },
        ]}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ProjectForm;
