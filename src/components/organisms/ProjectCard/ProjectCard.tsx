import Card from "components/molecules/Card/Card";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import { ProjectService } from "data/ProjectService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import FormModal from "../FormModal/FormModal";
import FormProject from "../ProjectForm/ProjectForm";

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setToast } = useToast();
  const { currentUser } = useUser();

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

  return (
    <Card
      to={`/projects/${id}`}
      kebabMenuChildren={
        <>
          <ConfirmModal textButton="Usuń" maxHeight="110px" confirmAction={projectRemove}>
            <p>Czy na pewno chcesz usunąć projekt</p>
          </ConfirmModal>
          <FormModal textButton="Edytuj" maxHeight="120px">
            <FormProject id={id} />
          </FormModal>
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
