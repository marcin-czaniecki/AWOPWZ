import Card from "components/molecules/Card/Card";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import { ProjectService } from "data/ProjectService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import FormModal from "../FormModal/FormModal";
import FormProject from "../ProjectForm/ProjectForm";

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setToast } = useToast();
  const { currentUser, dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();
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
  console.log(currentUserPermissions);
  const isPermissions =
    currentUserPermissions?.canServiceProjects ||
    currentUserPermissions?.isLeader ||
    dataUser?.isAdmin;
  return (
    <Card
      to={`/projects/${id}`}
      kebabMenuChildren={
        <>
          {isPermissions && (
            <>
              <ConfirmModal textButton="Usuń" maxHeight="110px" confirmAction={projectRemove}>
                <p>Czy na pewno chcesz usunąć projekt</p>
              </ConfirmModal>
              <FormModal textButton="Edytuj" maxHeight="160px">
                <FormProject id={id} name={name} />
              </FormModal>
            </>
          )}
          <ConfirmModal textButton="Przypnij" maxHeight="110px" confirmAction={pinProject}>
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
