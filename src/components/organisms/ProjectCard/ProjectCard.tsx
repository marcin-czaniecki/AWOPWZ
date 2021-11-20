import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import fb from "data/fb";
import { useToast } from "hooks/useToast";
import { Link } from "react-router-dom";
import { theme } from "theme/theme";
import { getDocumentReferenceProject } from "utils/references";
import FormProject from "../ProjectForm/ProjectForm";
import { WrapperProjectCard, WrapperContentProjectCard } from "./ProjectCard.styles";

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setToast } = useToast();

  const projectRemove = async () => {
    try {
      fb.deleteDoc(getDocumentReferenceProject(id));
    } catch (error) {
      setToast("Z jakiegoś powodu nie udało się usunąć projektu");
    }
  };

  return (
    <WrapperProjectCard>
      <KebabMenu color={theme.color.primary}>
        <ConfirmModal confirmAction={projectRemove} textButton="Usuń">
          <p>Czy na pewno chcesz usunąć projekt</p>
        </ConfirmModal>
        <ConfirmModal textButton="Edytuj" maxHeight="120px" invisibleYes invisibleNo>
          <FormProject id={id} />
        </ConfirmModal>
      </KebabMenu>
      <Link to={`${id}`} style={{ textDecoration: "none" }}>
        <WrapperContentProjectCard key={id}>{name}</WrapperContentProjectCard>
      </Link>
    </WrapperProjectCard>
  );
};
export default ProjectCard;
