import Card from "components/molecules/Card/Card";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import FormModal from "components/organisms/FormModal/FormModal";
import FormProject from "components/organisms/ProjectForm/ProjectForm";
import { ProjectService } from "firebase/ProjectService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { IProjectCardProps } from "types/componentTypes";
import { ConfirmModalButtonText } from "utils/utils";

const ProjectCard = ({ id, name, teamId }: IProjectCardProps) => {
  const { setToast } = useToast();
  const { currentUser, dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();

  if (!currentUserPermissions) {
    return <div>Nie posiadasz odpowiednich uprawnień</div>;
  }

  const { canServiceProjects, isLeader } = currentUserPermissions;
  const projectRemove = async () => {
    if (currentUser) {
      ProjectService.removeProject(currentUser.uid, name, id);
    } else {
      setToast("Musisz być zalogowany.");
    }
  };

  const pinProject = async () => {
    if (currentUser) {
      ProjectService.pinProject(currentUser.uid, name, id);
    } else {
      setToast("Musisz być zalogowany.");
    }
  };

  const isPermissions = canServiceProjects || isLeader || dataUser?.isAdmin;
  return (
    <Card
      to={`/projects/${id}`}
      kebabMenuChildren={
        <>
          {isPermissions && (
            <>
              <ConfirmModal
                textButton={ConfirmModalButtonText.delete}
                maxHeight="110px"
                confirmAction={projectRemove}
              >
                <p>Czy na pewno chcesz usunąć projekt</p>
              </ConfirmModal>
              <FormModal textButton={ConfirmModalButtonText.edit} maxHeight="160px">
                <FormProject id={id} name={name} currentTeamId={teamId} />
              </FormModal>
            </>
          )}
          <ConfirmModal
            textButton={ConfirmModalButtonText.pin}
            maxHeight="110px"
            confirmAction={pinProject}
          >
            <p>Czy na pewno chcesz przypiąć ten projekt?</p>
          </ConfirmModal>
        </>
      }
    >
      {name}
    </Card>
  );
};
export default ProjectCard;
