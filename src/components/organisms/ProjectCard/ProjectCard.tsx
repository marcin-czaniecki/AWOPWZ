import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import fb from "data/fb";
import { useError } from "hooks/useError";
import { Link } from "react-router-dom";
import { theme } from "theme/theme";
import { getDocumentReferenceProject } from "utils/firebaseUtils";
import FormProject from "../FormProject/FormProject";
import { WrapperProjectCard, WrapperContentProjectCard } from "./ProjectCard.styles";

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setError } = useError();

  const projectRemove = async () => {
    try {
      fb.deleteDoc(getDocumentReferenceProject(id));
    } catch (error) {
      setError("Z jakiegoś powodu nie udało się usunąć projektu");
    }
  };

  return (
    <WrapperProjectCard>
      <KebabMenu color={theme.color.primary}>
        <ConfirmModal confirmAction={projectRemove} textButton="Usuń" buttonVersion="secondary">
          <p>Czy na pewno chcesz usunąć projekt</p>
        </ConfirmModal>
        <ConfirmModal textButton="Edytuj" buttonVersion="secondary" maxHeight="120px" invisibleYes invisibleNo>
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
